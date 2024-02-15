"use client";

import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDownIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import moment from "moment";

export default function CourierFilterExport({
  courierId,
  brands,
  courierName,
}: {
  courierId: string;
  courierName: string;
  brands: string[];
}) {
  const [selectedStatus, setSelectedStatus] = useState<
    "delivered/collected" | "outForDelivery" | "other"
  >();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [date, setDate] = useState<Date>();

  async function handleOrdersExport() {
    setExporting(true);
    if (selectedStatus || selectedBrand || date) {
      let status =
        selectedStatus === "delivered/collected"
          ? "delivered,collected"
          : selectedStatus === "other"
            ? "pending,unreachable,cancelled,postponed,returned"
            : selectedStatus;
      let query = "";
      if (status) {
        query += `&status=${status}`;
      }
      if (selectedBrand) {
        query += `&brand=${selectedBrand}`;
      }
      if (date) {
        query += `&date=${moment(date).toString()}`;
      }
      const res = await fetch(`/api/courier?courier=${courierId}${query}`);
      setExporting(false);
      if (res.status === 200) {
        const fileName = `${courierName.trim()}_orders_${status && status}_${
          selectedBrand && selectedBrand.trim()
        }_${new Date().toLocaleDateString()}.xlsx`;
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
        setSelectedBrand(undefined);
        setSelectedStatus(undefined);
        setDate(undefined);
      }
    }
  }

  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg lg:text-xl font-bold text-accent/50 uppercase">
          recent deliveries
        </h1>
        <div className="flex items-center justify-end">
          <Button
            variant={"ghost"}
            disabled={(!selectedStatus && !selectedBrand && !date) || exporting}
            onClick={handleOrdersExport}
          >
            {exporting ? (
              <Loader2 className="text-white size-5 animate-spin mr-2" />
            ) : (
              <FileDownIcon className="size-5 text-accent mr-2" />
            )}
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-3">
        <div className="flex lg:flex-row flex-col items-center gap-3 w-full">
          <DatePicker
            date={date}
            setDate={setDate}
            variant="courier"
            // time={undefined}
            // setTime={() => {}}
          />
          <Select
            value={selectedStatus}
            onValueChange={(value) =>
              setSelectedStatus(value as typeof selectedStatus)
            }
          >
            <SelectTrigger className="lg:w-[200px] w-full bg-accent text-white border-none">
              <SelectValue className="" placeholder="By Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="capitalize" value="delivered/collected">
                Delivered / Collected
              </SelectItem>
              <SelectItem className="capitalize" value="outForDelivery">
                Out For Delivery
              </SelectItem>
              <SelectItem className="capitalize" value="other">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="lg:w-[200px] w-full bg-accent text-white border-none">
              <SelectValue placeholder="By Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/*<div className="hidden lg:flex items-center justify-end">*/}
        {/*  <Button*/}
        {/*    variant={"ghost"}*/}
        {/*    disabled={!selectedStatus && !selectedBrand && !date}*/}
        {/*    onClick={handleOrdersExport}*/}
        {/*  >*/}
        {/*    {exporting ? (*/}
        {/*      <Loader2 className="text-white size-5 animate-spin" />*/}
        {/*    ) : (*/}
        {/*      <FileDownIcon className="size-5 text-accent" />*/}
        {/*    )}*/}
        {/*    Export*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
