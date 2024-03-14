"use client";

import { BarcodeIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { BarcodeScanner } from "@/app/(warehouse)/components/scanner/BarcodeScanner";
import { ProductDetailsType } from "@/types/response";
import {
  getProductByIdAction,
  updateProductQuantityAction,
} from "@/lib/actions";

export default function Page() {
  const barcodeContainer = useRef<HTMLDivElement>(null);
  const [scannedCode, setScannedCode] = useState<string>();
  const [quantity, setQuantity] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<ProductDetailsType>();

  useEffect(() => {
    if (scannedCode) {
      getProductByIdAction({ productId: scannedCode })
        .then((data) => {
          if (data.data) {
            setScannedProduct(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [scannedCode]);

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(e.target.value));
  }

  useEffect(() => {
    if (barcodeContainer.current) {
      barcodeContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [scannedCode]);

  async function handleQuantityUpdate() {
    setUpdating(true);
    if (scannedProduct) {
      const data = await updateProductQuantityAction({
        UID: scannedProduct.UID,
        quantity,
      });
      if (data) {
        setScannedProduct({ ...scannedProduct, quantity: quantity });
        setUpdating(false);
      }
    }
  }

  return (
    <div className={"flex flex-col gap-5"}>
      <h1
        className={
          "text-2xl lg:text-4xl text-secondary_accent/50 uppercase font-bold"
        }
      >
        restock item
      </h1>
      <div
        className={
          "glass rounded-2xl flex flex-col p-5 items-center justify-center gap-5"
        }
      >
        <BarcodeScanner
          setScannedCode={setScannedCode}
          scannedCode={scannedCode ?? ""}
          variant={"update"}
        />
        {scannedCode && (
          <div
            ref={barcodeContainer}
            className={"flex flex-col gap-5 items-center justify-center p-5"}
          >
            <div className={"flex items-center gap-1 bg-white p-5 rounded-xl"}>
              <BarcodeIcon className={"size-5"} />
              <h3 className={"text-black text-sm font-bold"}>
                {"Scanned Barcode: "}
                <span className={"text-black text-sm font-normal"}>
                  {scannedCode}
                </span>
              </h3>
            </div>
            {scannedProduct && (
              <div
                className={"grid grid-cols-6 gap-10 bg-white p-5 rounded-xl"}
              >
                <div className={"col-span-3 flex flex-col gap-1"}>
                  <h2 className={"text-base text-black font-bold"}>
                    Product ID
                  </h2>
                  <h3 className={"text-sm text-black"}>
                    {scannedProduct?.UID}
                  </h3>
                </div>
                <div className={"col-span-3 flex flex-col gap-1"}>
                  <h2 className={"text-base text-black font-bold"}>
                    Product Name
                  </h2>
                  <h3 className={"text-sm text-black"}>
                    {scannedProduct?.itemDescription}
                  </h3>
                </div>
                <div className={"col-span-2 flex flex-col gap-1"}>
                  <h2 className={"text-base text-black font-bold"}>Size</h2>
                  <h3 className={"text-sm text-black"}>
                    {scannedProduct?.size}
                  </h3>
                </div>
                <div className={"col-span-2 flex flex-col gap-1"}>
                  <h2 className={"text-base text-black font-bold"}>Color</h2>
                  <h3 className={"text-sm text-black"}>
                    {scannedProduct?.color}
                  </h3>
                </div>
                <div className={"col-span-2 flex flex-col gap-1"}>
                  <h2 className={"text-base text-black font-bold"}>Quantity</h2>
                  <h3 className={"text-sm text-black"}>
                    {scannedProduct.quantity}
                  </h3>
                </div>
              </div>
            )}
            {scannedProduct && (
              <div
                className={"flex items-center gap-1 bg-white p-5 rounded-xl"}
              >
                <h3 className={"text-black text-sm font-bold"}>
                  {"Quantity: "}
                </h3>
                <Input
                  placeholder={"Enter Quantity"}
                  onChange={handleQuantityChange}
                  type={"number"}
                  className={
                    "w-60 bg-white ring-secondary_accent/20 rounded-lg border-0 text-black placeholder:text-black/50"
                  }
                />
              </div>
            )}
            <div className={"flex items-center justify-end"}>
              <Button
                className={
                  "bg-secondary_accent text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
                }
                onClick={handleQuantityUpdate}
                disabled={updating || quantity === 0 || !scannedProduct}
              >
                {updating ? (
                  <div className={"flex items-center gap-1"}>
                    <span>Updating</span>
                    <MoreHorizontalIcon className="text-white size-5 animate-pulse ml-2" />
                  </div>
                ) : (
                  "Update Quantity"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
