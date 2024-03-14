"use client";

import { BarcodeIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket.io";

interface BarcodeScannerProps {
  setScannedCode: (code: string) => void;
  scannedCode: string;
  variant: "details" | "update";
}

export function BarcodeScanner({
  setScannedCode,
  scannedCode,
  variant,
}: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState<{
    color: string;
    message: string;
    title: string;
  }>();
  const [showManualCode, setShowManualCode] = useState(false);

  async function handleScanCode() {
    setScannedCode("");
    setMessage(undefined);
    socket.connect();
    socket.emit("productByBarcode");
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
    socket.on("barcode", (code) => {
      if (code) {
        setScannedCode(code);
        setScanning(false);
        setMessage({
          color: "bg-secondary_accent text-black",
          message: "Barcode Was Scanned Successfully",
          title: "Barcode Scanned Successfully",
        });
      }
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

  function handleManualInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 13) {
      setScannedCode(e.target.value);
    }
  }

  // const { inputRef } = useBarcode({
  //   value: "1003329056001",
  //   options: {
  //     background: "#fff",
  //   },
  // });

  return (
    <div className={"flex flex-col p-5 items-center justify-center gap-5"}>
      <BarcodeIcon
        className={`size-40 ${scanning && "animate-pulse text-secondary_accent"}`}
      />
      {/*<canvas ref={inputRef} />*/}
      <h1 className={"text-3xl text-black font-bold"}>Scan Barcode</h1>
      <h3 className={"text-sm lg:text-base text-black/50 italic"}>
        {variant === "details"
          ? "Scan the barcode of an item to fetch its details"
          : "Scan the barcode on the item to update its quantity"}
      </h3>
      {message?.message && (
        <Alert className={`${message.color} w-auto self-center`}>
          <InfoIcon className="size-5" />
          <AlertTitle className={"capitalize"}>{message.title}</AlertTitle>
          <AlertDescription
            className={"italic text-black/50 font-semibold capitalize"}
          >
            {message.message}
          </AlertDescription>
        </Alert>
      )}
      <Button
        className={
          "bg-secondary_accent text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
        }
        onClick={handleScanCode}
        disabled={scanning}
      >
        {scanning ? "Scanning..." : "Start Scanning"}
      </Button>
      {!showManualCode && (
        <Button
          className={
            "bg-white border border-secondary_accent/50 text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
          }
          onClick={() => setShowManualCode(!showManualCode)}
        >
          Enter Code Manually
        </Button>
      )}
      {showManualCode && (
        <>
          <InputOTP
            maxLength={13}
            value={scannedCode}
            onChange={(value) => setScannedCode(value)}
            onBlur={() => setShowManualCode(false)}
            render={({ slots }) => (
              <>
                <InputOTPGroup>
                  {slots.slice(0, 3).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}{" "}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {slots.slice(3, 5).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {slots.slice(5, 7).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {slots.slice(7, 9).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {slots.slice(9, 11).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {slots.slice(11, 13).map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className={"border-black"}
                    />
                  ))}
                </InputOTPGroup>
              </>
            )}
          />
          {/*<Input*/}
          {/*  placeholder={"Enter Barcode"}*/}
          {/*  onBlur={() => setShowManualCode(false)}*/}
          {/*  minLength={13}*/}
          {/*  maxLength={13}*/}
          {/*  onChange={handleManualInput}*/}
          {/*  autoFocus={true}*/}
          {/*  className={*/}
          {/*    "w-60 bg-white rounded-lg border-0 text-black placeholder:text-black/50"*/}
          {/*  }*/}
          {/*/>*/}
        </>
      )}
    </div>
  );
}
