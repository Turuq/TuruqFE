"use client";

import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  PackageCheckIcon,
  PackageMinusIcon,
  ScanBarcodeIcon,
  TruckIcon,
} from "lucide-react";
import { AnalyticsProgress } from "@/components/custom/analytics-progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useEffect, useState } from "react";
import { AdminProductType, PackingOrderType } from "@/types/response";
import { socket } from "@/lib/socket.io";

export default function OrderPacking({ data }: { data: any }) {
  const [packedProducts, setPackedProducts] = useState<string[]>([]);
  const [productsToPack, setProductsToPack] = useState(0);
  const [packingProgress, setPackingProgress] = useState(0);
  const [productToScan, setProductToScan] = useState<string>("");
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState<{
    color: string;
    message: string;
    title: string;
  }>();

  useEffect(() => {
    if (data) {
      let orderItems = 0;
      data.order.products.forEach((product: AdminProductType) => {
        orderItems += product.quantity;
      });
      setProductsToPack(orderItems);
    }
  }, [data]);

  useEffect(() => {
    if (productsToPack > 0) {
      setPackingProgress((packedProducts.length / productsToPack) * 100);
    }
  }, [packedProducts]);

  async function handleScanCode(UID: string) {
    setProductToScan(UID);
    socket.connect();
    socket.emit("packingByBarcode", UID);
  }

  useEffect(() => {
    socket.on("connect", () => {
      setScanning(true);
      setMessage({
        color: "bg-amber-500 text-black",
        message: "Connecting To Barcode Scanner... please hold on a moment",
        title: "Connecting To Barcode Scanner",
      });
    });
    socket.on("port-open", (port) => {
      if (port === "ok") {
        setMessage({
          color: "bg-secondary_accent text-black",
          message:
            "Barcode Scanner Successfully Connected, You Can Start Scanning",
          title: "Connected To Barcode Scanner",
        });
      }
    });
    socket.on("barcode", (message) => {
      if (message.code === message.uid) {
        setPackedProducts((oldValue) => [...oldValue, message.uid]);
        setMessage(undefined);
      } else {
        setMessage({
          color: "bg-red-500 text-white",
          message: "Barcode Does Not Match Selected Product",
          title: "Invalid Barcode",
        });
      }
      setScanning(false);
      // setMessage({
      //   color: "bg-secondary_accent text-black",
      //   message: "Barcode Was Scanned Successfully",
      //   title: "Barcode Scanned Successfully",
      // });
    });
    socket.on("port-error", (err) => {
      if (err) {
        setMessage({
          color: "bg-red-500 text-white",
          message: err,
          title: "Something Went Wrong! Please Try Again",
        });
        setScanning(false);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("barcode");
      socket.off("port-error");
      socket.off("port-open");
    };
  }, []);
  return (
    <div className={"flex flex-col gap-5"}>
      {message && (
        <Alert className={message?.color}>
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>{message?.title}</AlertTitle>
          <AlertDescription>{message?.message}</AlertDescription>
        </Alert>
      )}

      <div className={"flex items-center justify-between gap-5"}>
        <p className={"text-sm "}>
          Check the products as you pack them{" | "}
          <span className={"text-sm  font-bold"}>
            Packed{" "}
            <span className={"text-black/50"}>
              {packedProducts.length} of {productsToPack}
            </span>{" "}
            items
          </span>
        </p>
        <Button
          variant={"default"}
          disabled={productsToPack === packedProducts.length}
          className={"rounded-xl"}
          onClick={() =>
            setPackedProducts(
              data.order?.mapped
                ? data.order.products.map((p: PackingOrderType) => p.UID)
                : data.order.products.map((p: PackingOrderType) => p.id),
            )
          }
        >
          Mark Order as Packed
        </Button>
      </div>
      <div className={"flex items-center gap-5"}>
        <h1 className={"flex items-center text-sm text-black/50"}>
          <TruckIcon className={"size-4 mr-2"} />
          Ready for Delivery
        </h1>
        <AnalyticsProgress
          value={packingProgress}
          className="w-[60%] h-2"
          indicatorColor={"bg-secondary_accent"}
        />
        <p className={"text-black font-bold text-base"}>{packingProgress}%</p>
      </div>
      {/*  bg-emerald-600/20 */}
      <div className={"flex flex-col gap-5"}>
        {data.order.products?.map((product: PackingOrderType) => (
          <div
            key={product?.UID ?? product?.id}
            className={`grid grid-cols-4 ${
              packedProducts.find((p) => p === product.id || p === product.UID)
                ? "bg-emerald-600/20"
                : "dark-glass"
            } ${productToScan === product.UID || (productToScan === product.id && scanning && "animate-pulse")} rounded-2xl p-5 items-center gap-5`}
          >
            <div className={"col-span-1 flex flex-col gap-2"}>
              <h1 className={"font-bold text-sm text-black/50"}>
                {data.order?.mapped === true ? "UID" : "ID"}
              </h1>
              <h1 className={"text-base"}>
                {data.order?.mapped === true ? product?.UID : product?.id}
              </h1>
            </div>
            <div className={"col-span-2 flex flex-col gap-2"}>
              <h1 className={"font-bold text-sm text-black/50"}>
                Item Description
              </h1>
              <h1 className={"text-base"}>
                {data.order?.mapped === true
                  ? product?.itemDescription
                  : product?.name}
              </h1>
            </div>
            <div className={"flex items-center justify-end"}>
              {!packedProducts.find(
                (p) => p === product.id || p === product.UID,
              ) ? (
                <Button
                  variant={"default"}
                  className={"rounded-xl mr-5 group h-10"}
                  onClick={() => {
                    setPackedProducts((oldValue) => [
                      ...oldValue,
                      product.id ?? product.UID,
                    ]);
                  }}
                >
                  <PackageCheckIcon className={"size-4 group-hover:mr-2"} />
                  <span className={"hidden group-hover:block"}>
                    Mark as Packed
                  </span>
                </Button>
              ) : (
                <Button
                  variant={"outline"}
                  className={"rounded-xl"}
                  onClick={() =>
                    setPackedProducts((oldValue) =>
                      oldValue.filter(
                        (p) => p !== product.id && p !== product.UID,
                      ),
                    )
                  }
                >
                  <PackageMinusIcon className={"size-4 mr-2"} />
                  Unpack Item
                </Button>
              )}
              {!packedProducts.find(
                (p) => p === product.id || p === product.UID,
              ) && (
                <Button
                  variant={"outline"}
                  className={
                    "rounded-xl group h-10 disabled:cursor-not-allowed"
                  }
                  disabled={scanning || !data.order?.mapped}
                  onClick={handleScanCode.bind(null, product.UID ?? product.id)}
                >
                  <ScanBarcodeIcon className={"size-4 group-hover:mr-2"} />
                  <span className={"hidden group-hover:block"}>
                    Scan to Pack
                  </span>
                </Button>
              )}
            </div>
            {data.order?.mapped === false ? (
              <div className={"col-span-2 flex flex-col gap-2"}>
                <h1 className={"font-bold text-sm text-black/50"}>Variant</h1>
                <h1 className={"text-base"}>{product?.variant}</h1>
              </div>
            ) : (
              <>
                <div className={"flex flex-col gap-2"}>
                  <h1 className={"font-bold text-sm text-black/50"}>Size</h1>
                  <h1 className={"text-base"}>{product?.size}</h1>
                </div>
                <div className={"flex flex-col gap-2"}>
                  <h1 className={"font-bold text-sm text-black/50"}>Color</h1>
                  <h1 className={"text-base"}>{product?.color}</h1>
                </div>
              </>
            )}
            <div className={"flex flex-col gap-2"}>
              <h1 className={"font-bold text-sm text-black/50"}>Quantity</h1>
              <h1 className={"text-base font-bold"}>{product?.quantity}</h1>
            </div>
            <div className={"flex flex-col gap-2"}>
              <h1 className={"font-bold text-sm text-black/50"}>Packed</h1>
              <h1
                className={`text-base font-bold ${
                  packedProducts.find(
                    (p) => p === product.id || p === product.UID,
                  )
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {packedProducts.find(
                  (p) => p === product.id || p === product.UID,
                )
                  ? product.quantity
                  : 0}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
