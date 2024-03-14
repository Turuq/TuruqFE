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
import { addNewProductAction, checkProductExists } from "@/lib/actions";
import { StyleSheet } from "@react-pdf/renderer";
import jsPDF from "jspdf";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function AddItemWarehouse({ codes }: { codes: CodesType }) {
  const { toast } = useToast();
  const [UID, setUID] = useState("01");
  const [superlative, setSuperlative] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [variance, setVariance] = useState("01");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { inputRef } = useBarcode<HTMLCanvasElement>({
    value: UID,
    options: {
      background: "#fff",
    },
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "5.5cm",
      height: "4cm",
    },
    // section: {
    //   margin: 10,
    //   padding: 10,
    //   flexGrow: 1,
    // },
  });

  useEffect(() => {
    let generatedUID = `${superlative ? superlative : "10"}${client}${category}${size}${color}${variance}`;
    if (generatedUID.length > 0) {
      setUID(generatedUID);
    }
  }, [superlative, client, category, size, color]);

  useEffect(() => {
    if (UID.length === 13) {
      checkProductExists({ UID }).then((data) => {
        if (data) {
          setUID(data);
        }
      });
    }
  }, [UID]);

  function DownloadPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "cm",
      format: [5.5, 4],
    });
    doc.addImage(
      inputRef.current.toDataURL("image/jpeg"),
      "JPEG",
      0,
      0,
      5.5,
      4,
    );
    for (let i = 0; i < quantity - 1; i++) {
      doc.addPage();
      doc.addImage(
        inputRef.current.toDataURL("image/jpeg"),
        "JPEG",
        0,
        0,
        5.5,
        4,
      );
    }
    doc.save(`${description}_${UID}.pdf`);
  }

  async function handleAddProduct() {
    setLoading(true);
    const res = await addNewProductAction({
      UID,
      category:
        codes.productCategories.find((code) => code.categoryCode === category)
          ?.category ?? "",
      itemDescription: description,
      quantity,
      size: codes.sizeChart.find((code) => code.sizeCode === size)?.size ?? "",
      color:
        codes.colorCode.find((code) => code.colorCode === color)?.color ?? "",
      client:
        codes.clientCodes.find((code) => code.clientCode === client)
          ?.companyName ?? "",
    });
    if (res.message) {
      toast({ title: "Product Added", description: res.message });
      DownloadPDF();
      setLoading(false);
      resetFields();
    }
    if (res.error)
      toast({
        title: "Failed to Add Product",
        description: res.error,
        variant: "destructive",
      });
  }

  function resetFields() {
    setUID("01");
    setSuperlative("");
    setClient("");
    setCategory("");
    setSize("");
    setColor("");
    setVariance("01");
    setDescription("");
    setQuantity(0);
  }

  return (
    <div className={"glass p-5 rounded-xl"}>
      <div
        className={
          "bg-transparent p-5 rounded-xl grid grid-cols-12 lg:grid-cols-4 gap-2 space-y-3"
        }
      >
        <div className={"col-span-12 lg:col-span-4 flex flex-col gap-5"}>
          <h2 className={"text-base text-black font-bold"}>Item Description</h2>
          <Input
            className={
              "w-full bg-white rounded-xl border-0 text-black placeholder:text-black/50 ring-1 ring-secondary_accent"
            }
            onBlur={(e) => setDescription(e.target.value)}
            placeholder={"Add Item Description"}
            type={"text"}
          />
        </div>
        <div className={"col-span-12 lg:col-span-2  flex flex-col gap-5"}>
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
        <div className={"col-span-12 lg:col-span-2 flex flex-col gap-5"}>
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
        <div className={"col-span-12 lg:col-span-1 flex flex-col gap-5"}>
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
        <div className={"col-span-12 lg:col-span-1 flex flex-col gap-5"}>
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
        <div className={"col-span-12 lg:col-span-1 flex flex-col gap-5"}>
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
        <div className={"col-span-12 lg:col-span-1 flex flex-col  gap-5"}>
          <h2 className={"text-base text-black font-bold"}>Quantity</h2>
          <Input
            className={
              "w-full bg-white rounded-xl border-0 text-black placeholder:text-black/50 ring-1 ring-secondary_accent"
            }
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            type={"number"}
            placeholder={"Enter Available Quantity"}
          />
        </div>
        <div
          className={
            "col-span-12 lg:col-span-4 flex flex-col lg:flex-row items-start justify-start gap-10"
          }
        >
          <h2 className={"text-base text-black font-bold"}>
            Generated Barcode
          </h2>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <canvas ref={inputRef} />
            <p className={"text-base text-black font-bold"}>{description}</p>
          </div>
        </div>
        <div
          className={"col-span-12 lg:col-span-4 flex items-center justify-end"}
        >
          <Button
            className={
              "bg-secondary_accent text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
            }
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? (
              <Loader2
                className={"size-5 text-white self-center animate-spin"}
              />
            ) : (
              "Add Item"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
