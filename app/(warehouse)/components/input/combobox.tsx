"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClientType } from "@/types/client";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Combobox({
  data,
  value,
  setValue,
}: {
  data: ClientType[];
  value: string;
  setValue: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] rounded-xl justify-between capitalize"
        >
          {value ? value : "Select Client"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search For Client..." />
          <CommandEmpty>No Client(s) found.</CommandEmpty>
          <ScrollArea className={"border-none h-[200px]"}>
            <CommandGroup>
              {data.map((client) => (
                <CommandItem
                  key={client.companyName}
                  value={client.companyName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.toLowerCase() === client.companyName.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {client.companyName}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
