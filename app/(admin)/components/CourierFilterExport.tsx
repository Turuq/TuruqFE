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
import { FileDownIcon, Loader2, RotateCcwIcon } from "lucide-react";

export default function CourierFilterExport({
  brands,
  selectedStatus,
  setSelectedStatus,
  selectedBrand,
  setSelectedBrand,
  date,
  setDate,
  exporting,
  handleOrdersExport,
  resetFilters,
}: {
  brands: string[];
  selectedStatus:
    | "delivered/collected"
    | "outForDelivery"
    | "other"
    | undefined;
  setSelectedStatus: (
    value: "delivered/collected" | "outForDelivery" | "other" | undefined,
  ) => void;
  selectedBrand: string | undefined;
  setSelectedBrand: (value: string | undefined) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  exporting: boolean;
  handleOrdersExport: () => void;
  resetFilters: () => void;
}) {
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
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={exporting || (!date && !selectedStatus && !selectedBrand)}
            onClick={resetFilters}
          >
            <RotateCcwIcon className="size-5 text-accent" />
          </Button>
        </div>
      </div>
    </div>
  );
}
