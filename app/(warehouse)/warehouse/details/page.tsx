"use client";

import { BarcodeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getProductByIdAction } from "@/lib/actions";
import { ProductDetailsType } from "@/types/response";
import { BarcodeScanner } from "@/app/(warehouse)/components/scanner/BarcodeScanner";

export default function Page() {
  const barcodeContainer = useRef<HTMLDivElement>(null);
  const [scannedCode, setScannedCode] = useState<string>();

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

  useEffect(() => {
    if (barcodeContainer.current) {
      barcodeContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [scannedCode]);

  return (
    <div className={"flex flex-col gap-5"}>
      <h1
        className={
          "text-2xl lg:text-4xl text-secondary_accent/50 uppercase font-bold"
        }
      >
        check item details
      </h1>
      <div
        className={
          "glass rounded-2xl flex flex-col p-5 items-center justify-center gap-5"
        }
      >
        <BarcodeScanner setScannedCode={setScannedCode} variant={"details"} />
        {scannedCode && (
          <div
            ref={barcodeContainer}
            className={"flex items-center gap-1 bg-white p-5 rounded-xl"}
          >
            <BarcodeIcon className={"size-5"} />
            <h3 className={"text-black text-sm font-bold"}>
              {"Scanned Barcode: "}
              <span className={"text-black text-sm font-normal"}>
                {scannedCode}
              </span>
            </h3>
          </div>
        )}
        {scannedCode && scannedProduct && (
          <div className={"grid grid-cols-6 gap-10 bg-white p-5 rounded-xl"}>
            <div className={"col-span-3 flex flex-col gap-1"}>
              <h2 className={"text-base text-black font-bold"}>Product ID</h2>
              <h3 className={"text-sm text-black"}>{scannedProduct?.UID}</h3>
            </div>
            <div className={"col-span-3 flex flex-col gap-1"}>
              <h2 className={"text-base text-black font-bold"}>Product Name</h2>
              <h3 className={"text-sm text-black"}>
                {scannedProduct?.itemDescription}
              </h3>
            </div>
            <div className={"col-span-2 flex flex-col gap-1"}>
              <h2 className={"text-base text-black font-bold"}>Size</h2>
              <h3 className={"text-sm text-black"}>{scannedProduct?.size}</h3>
            </div>
            <div className={"col-span-2 flex flex-col gap-1"}>
              <h2 className={"text-base text-black font-bold"}>Color</h2>
              <h3 className={"text-sm text-black"}>{scannedProduct?.color}</h3>
            </div>
            <div className={"col-span-2 flex flex-col gap-1"}>
              <h2 className={"text-base text-black font-bold"}>Price</h2>
              <h3 className={"text-sm text-black"}>{0} EGP</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
