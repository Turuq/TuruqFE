"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CodesType } from "@/types/response";
import { useBarcode } from "next-barcode";
import { useEffect, useState } from "react";

export default function AddItemWarehouse({ codes }: { codes: CodesType }) {
  const [UID, setUID] = useState("0000000000000");
  const [superlative, setSuperlative] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const { inputRef } = useBarcode({
    value: UID,
    options: {
      background: "#fff",
    },
  });

  useEffect(() => {
    let generatedUID = `${superlative}${client}${category}${size}${color}`;
    if (generatedUID.length > 0) {
      setUID(generatedUID);
    }
  }, [superlative, client, category, size, color]);
  return (
    <div className={"glass p-5 rounded-xl"}>
      <div
        className={
          "bg-transparent p-5 rounded-xl grid grid-cols-4 gap-2 space-y-3"
        }
      >
        <div className={"col-span-4 flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Item Description</h2>
          <Input
            className={
              "w-full bg-white rounded-xl border-0 text-black placeholder:text-black/50"
            }
            placeholder={"Add Item Description"}
            type={"text"}
          />
        </div>
        <div className={"col-span-2  flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Superlative</h2>
          <Select onValueChange={(value) => setSuperlative(value)}>
            <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
              <SelectValue placeholder="Select Superlative Client" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={"border-none h-[200px]"}>
                {codes.superlativeCode.map((code) => (
                  <SelectItem
                    key={code.superlative}
                    value={code.superlativeCode}
                  >
                    {code.superlative}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className={"col-span-2 flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Client</h2>
          <Select onValueChange={(value) => setClient(value)}>
            <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={"border-none h-[200px]"}>
                {codes.clientCodes.map((code) => (
                  <SelectItem key={code.companyName} value={code.clientCode}>
                    {code.companyName}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className={"col-span-1 flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Item Category</h2>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={"border-none h-[200px]"}>
                {codes.productCategories.map((code) => (
                  <SelectItem key={code.category} value={code.categoryCode}>
                    {code.category}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className={"col-span-1 flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Item Size</h2>
          <Select onValueChange={(value) => setSize(value)}>
            <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={"border-none h-[200px]"}>
                {codes.sizeChart.map((code) => (
                  <SelectItem key={code.size} value={code.sizeCode}>
                    {code.size}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className={"col-span-1 flex flex-col"}>
          <h2 className={"text-base text-black font-bold"}>Item Color</h2>
          <Select onValueChange={(value) => setColor(value)}>
            <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
              <SelectValue placeholder="Select Color" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className={"border-none h-[200px]"}>
                {codes.colorCode.map((code) => (
                  <SelectItem key={code.color} value={code.colorCode}>
                    {code.color}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        <div className={"col-span-4 flex flex-col gap-5"}>
          <h2 className={"text-base text-black font-bold"}>Generated ID</h2>
          <Input
            value={UID}
            disabled={true}
            className={
              "w-full bg-white rounded-xl border-0 text-black placeholder:text-black/50"
            }
          />
          <div className={"flex items-center justify-center"}>
            <canvas ref={inputRef} />
          </div>
        </div>
        <div className={"col-span-4 flex items-center justify-end"}>
          <Button
            className={
              "bg-secondary_accent text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
            }
          >
            Add Item
          </Button>
        </div>
      </div>
    </div>
  );
}
