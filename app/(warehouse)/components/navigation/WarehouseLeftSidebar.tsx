"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { dashboardLinks } from "@/utils/dashboard-links";
import { warehouseSidebarLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackagePlus, PlusCircleIcon } from "lucide-react";

export default function WarehouseLeftSidebar() {
  const pathname = usePathname();
  return (
    <div
      className={
        "rounded-2xl p-5 flex flex-col gap-5 glass text-black fixed left-5"
      }
    >
      {warehouseSidebarLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex items-center w-48 px-3 gap-3 p-2 group ${
            pathname === link.href
              ? "bg-secondary_accent text-black cursor-default"
              : "bg-transparent text-black hover:bg-secondary_accent/20 cursor-pointer"
          } rounded-lg text-sm`}
        >
          <div className={"w-[30%] flex items-center justify-center size-4"}>
            {dashboardLinks[link.icon]}
          </div>
          <div className={"w-full text-center"}>
            <h3 className="capitalize text-inherit text-sm">{link.label}</h3>
          </div>
        </Link>
      ))}
      <Collapsible>
        <CollapsibleTrigger>
          <div
            className={`flex items-center bg-transparent text-black hover:bg-secondary_accent/20 w-48 px-3 gap-3 p-2 group rounded-lg text-sm`}
          >
            <div className={"w-[30%] flex items-center justify-center size-4"}>
              {dashboardLinks["inventory"]}
            </div>
            <div className={"w-full"}>
              <h3 className="capitalize text-inherit text-sm">
                Inventory Check-In
              </h3>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className={"ml-5"}>
          <Link
            href={"/warehouse/check-in/add-item"}
            className={`flex items-center w-44 px-3 gap-3 p-2 group my-5 ${
              pathname === "/warehouse/check-in/add-item"
                ? "bg-secondary_accent text-black cursor-default"
                : "bg-transparent text-black hover:bg-secondary_accent/20 cursor-pointer"
            } rounded-lg text-sm`}
          >
            <div className={"w-[30%] flex items-center justify-center size-4"}>
              <PlusCircleIcon className={"size-5 text-inherit"} />
            </div>
            <div className={"w-full text-center"}>
              <h3 className="capitalize text-inherit text-sm">Add New Item</h3>
            </div>
          </Link>
          <Link
            href={"/warehouse/check-in/update-item"}
            className={`flex items-center w-44 px-3 gap-3 p-2 group ${
              pathname === "/warehouse/check-in/update-item"
                ? "bg-secondary_accent text-black cursor-default"
                : "bg-transparent text-black hover:bg-secondary_accent/20 cursor-pointer"
            } rounded-lg text-sm`}
          >
            <div className={"w-[30%] flex items-center justify-center size-4"}>
              <PackagePlus className={"size-5 text-inherit"} />
            </div>
            <div className={"w-full text-center"}>
              <h3 className="capitalize text-inherit text-sm">restock Item</h3>
            </div>
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
