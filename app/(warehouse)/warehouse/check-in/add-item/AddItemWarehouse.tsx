"use client";

import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {CodesType} from "@/types/response";
import {useBarcode} from "next-barcode";
import {useEffect, useRef, useState} from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {checkProductExists} from "@/lib/actions";

export default function AddItemWarehouse({codes}: { codes: CodesType }) {
    const [UID, setUID] = useState("01");
    const [superlative, setSuperlative] = useState<string>("");
    const [client, setClient] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [variance, setVariance] = useState("01");
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>();
    const {inputRef} = useBarcode({
        value: UID,
        options: {
            background: "#fff",
        },
    });

    const targetRef = useRef();

    useEffect(() => {
        let generatedUID = `${superlative ? superlative : "10"}${client}${category}${size}${color}${variance}`;
        if (generatedUID.length > 0) {
            setUID(generatedUID);
        }
    }, [superlative, client, category, size, color]);

    useEffect(() => {
        if (UID.length === 13) {
            checkProductExists({UID}).then((data) => {
                if (data) {
                    setUID(data);
                }
            });
        }
    }, [UID]);

    // const { toPDF, targetRef } = usePDF({ filename: `barcode-${UID}.pdf` });

    // const doc = new jsPDF({
    //   orientation: "portrait",
    //   unit: "cm",
    //   format: [5.5, 4],
    // });
    // doc.text(UID, 2, 2);
    // doc.save("barcode.pdf");

    function handlePDF() {
        // 1. Render the component to HTML:
        const html = await inputRef.current.renderToStaticHTML();

        // 2. Create a new PDF document:
        const pdf = new jsPDF({
            unit: "cm",
            format: [5.5, 4]
        });

        // 3. Convert HTML to an image:
        try {
            const canvas = await html2canvas(html, {scale: 2}); // Adjust scale for quality
            const imgData = canvas.toDataURL('image/png');

            // 4. Add image to the PDF:
            pdf.addImage(imgData, 'jpeg', 0, 0, 5.5, 4);

            // 5. Save the PDF:
            pdf.save('myComponent.pdf');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={"glass p-5 rounded-xl"}>
            <div
                className={
                    "bg-transparent p-5 rounded-xl grid grid-cols-4 gap-2 space-y-3"
                }
            >
                <div className={"col-span-4 flex flex-col gap-5"}>
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
                <div className={"col-span-2  flex flex-col gap-5"}>
                    <h2 className={"text-base text-black font-bold"}>Superlative</h2>
                    <Select onValueChange={(value) => setSuperlative(value)}>
                        <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
                            <SelectValue placeholder="Select Superlative Client"/>
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
                <div className={"col-span-2 flex flex-col gap-5"}>
                    <h2 className={"text-base text-black font-bold"}>Client</h2>
                    <Select onValueChange={(value) => setClient(value)}>
                        <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
                            <SelectValue placeholder="Select Client"/>
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
                <div className={"col-span-1 flex flex-col gap-5"}>
                    <h2 className={"text-base text-black font-bold"}>Item Category</h2>
                    <Select onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
                            <SelectValue placeholder="Select Category"/>
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
                <div className={"col-span-1 flex flex-col gap-5"}>
                    <h2 className={"text-base text-black font-bold"}>Item Size</h2>
                    <Select onValueChange={(value) => setSize(value)}>
                        <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
                            <SelectValue placeholder="Select Size"/>
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
                <div className={"col-span-1 flex flex-col gap-5"}>
                    <h2 className={"text-base text-black font-bold"}>Item Color</h2>
                    <Select onValueChange={(value) => setColor(value)}>
                        <SelectTrigger className="w-full bg-white border-none text-black rounded-xl shadow">
                            <SelectValue placeholder="Select Color"/>
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
                <div className={"col-span-1 flex flex-col gap-5"}>
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
                <div className={"col-span-4 flex flex-row gap-10"}>
                    <h2 className={"text-base text-black font-bold"}>
                        Generated Barcode
                    </h2>
                    {/*<Input*/}
                    {/*  value={UID}*/}
                    {/*  disabled={true}*/}
                    {/*  className={*/}
                    {/*    "w-40 bg-white rounded-xl border-0 text-black placeholder:text-black/50 ring-1 ring-secondary_accent"*/}
                    {/*  }*/}
                    {/*/>*/}
                    <div
                        className={"flex flex-col gap-1 items-center justify-center"}
                        // ref={targetRef}
                    >
                        <canvas ref={inputRef}/>
                        <p className={"text-base text-black font-bold"}>{description}</p>
                    </div>
                </div>
                <div className={"col-span-4 flex items-center justify-end"} ref={targetRef}>
                    <Button
                        className={
                            "bg-secondary_accent text-black hover:bg-secondary_accent/50 rounded-lg w-60 text-sm"
                        }
                        onClick={() =>
                          toPDF({
                            canvas: {
                              mimeType: "image/jpeg",
                            },
                            page: {
                              orientation: "portrait",
                              format: [4, 4],
                            },
                          })}
                        onClick={hanldePDF}
                    >
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}
