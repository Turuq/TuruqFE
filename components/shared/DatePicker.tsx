"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  setDate,
  // time,
  // setTime,
  variant = "orders",
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  // time: TimeValue | undefined;
  // setTime: (date: TimeValue | undefined) => void;
  variant?: "orders" | "courier";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal rounded-none",
            !date && "text-muted-foreground",
            variant === "orders"
              ? "rounded-l-md w-[280px]"
              : "rounded-xl lg:w-[200px] w-full bg-accent text-white",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" aria-label={"Date Time Picker"}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
        {/*<div className={"p-2"}>*/}
        {/*  <TimeField value={time} onChange={(value) => setTime(value)} />*/}
        {/*</div>*/}
      </PopoverContent>
    </Popover>
  );
}
