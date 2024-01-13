"use client";

import { ClientType } from "@/types/client";
import { ChangeEvent, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGridIcon, LayoutListIcon, SearchIcon } from "lucide-react";

import AdminClientCard from "./AdminClientCard";
import { Input } from "@/components/ui/input";

export default function AdminClientSection({ data }: { data: ClientType[] }) {
  const [clients, setClients] = useState<ClientType[]>(data);
  const [layout, setLayout] = useState<"grid" | "list">("list");

  function handleValueChange(value: string) {
    setLayout(value as "grid" | "list");
  }

  function handleClientFilter(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") {
      setClients(data);
    } else {
      const filterClients = data.filter((client) =>
        client.companyName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setClients(filterClients);
    }
  }

  return (
    <div className="col-span-12 flex flex-col gap-5">
      <div className="hidden lg:flex items-center justify-between">
        <div className="bg-white flex items-center rounded-xl px-2">
          <Input
            placeholder="Filter Clients"
            className="bg-white border-none text-accent placeholder:text-accent/50 w-80"
            onChange={handleClientFilter}
          />
          <SearchIcon className="size-5 text-accent" />
        </div>
        <ToggleGroup
          type="single"
          defaultValue="list"
          onValueChange={handleValueChange}
        >
          <ToggleGroupItem value="grid">
            <LayoutGridIcon className="size-4 text-accent" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <LayoutListIcon className="size-4 text-accent" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {clients.map((client) => (
          <AdminClientCard
            key={client._id.toString()}
            client={client}
            layout={layout}
          />
        ))}
      </div>
    </div>
  );
}
