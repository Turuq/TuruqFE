"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WarehouseStaffType } from "@/types/response";
import LogoutButton from "@/components/shared/LogoutButton";
import { warehouseSidebarLinks } from "@/utils/links";
import { dashboardLinks } from "@/utils/dashboard-links";
import moment from "moment/moment";
import {
  PackagePlus,
  PlusCircleIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function WarehouseDropDown({
  warehouseStaff,
}: {
  warehouseStaff: WarehouseStaffType;
}) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full flex gap-2 cursor-pointer outline-none">
        <div className="flex gap-2 items-center">
          <Avatar className="size-10">
            <AvatarFallback className={"bg-white text-black"}>
              {`${warehouseStaff.firstName.substring(0, 1)}${warehouseStaff.lastName.substring(0, 1)}`}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-0">
            <h1 className={`text-xs text-black/50 capitalize`}>
              {`${warehouseStaff.firstName} ${warehouseStaff.lastName}`}
            </h1>
            <h3 className={`text-xs text-black font-bold uppercase`}>
              {moment().hour() < 12
                ? "Good Morning"
                : moment().hour() < 18
                  ? "Good Afternoon"
                  : "Good Evening"}
            </h3>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-60 rounded-2xl p-2"}>
        <DropdownMenuLabel>
          <div className={"flex flex-col gap-1 justify-center"}>
            <h1
              className={"text-xs text-black font-bold"}
            >{`${warehouseStaff.firstName} ${warehouseStaff.lastName}`}</h1>
            <h3 className={"text-xs text-black font-light"}>
              {warehouseStaff.email}
            </h3>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {warehouseSidebarLinks.map((link) => (
          <DropdownMenuItem
            key={link.label}
            className={`rounded-lg w-full focus:bg-secondary_accent/20 focus:text-black bg-white text-black`}
          >
            <Link
              href={link.href}
              className={`flex items-center px-3 my-1 gap-3`}
            >
              <div className={"flex items-center size-4"}>
                {dashboardLinks[link.icon]}
              </div>
              <div className={"flex items-center justify-center w-full"}>
                <h3 className="capitalize text-inherit text-sm text-center">
                  {link.label}
                </h3>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          key={"order-shipping"}
          className={`rounded-lg w-full focus:bg-secondary_accent/20 focus:text-black bg-white text-black`}
        >
          <Link
            href={"/warehouse/fulfillment/packing"}
            className={`flex items-center px-3 my-1 gap-3`}
          >
            <div className={"flex items-center size-4"}>
              <TruckIcon className={"text-inherit"} />
            </div>
            <div className={"flex items-center justify-center w-full"}>
              <h3 className="capitalize text-inherit text-sm text-center">
                Order Shipping
              </h3>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          key={"customer-pick-up"}
          className={`rounded-lg w-full focus:bg-secondary_accent/20 focus:text-black bg-white text-black`}
        >
          <Link
            href={"/warehouse/fulfillment/pick-up"}
            className={`flex items-center px-3 my-1 gap-3`}
          >
            <div className={"flex items-center size-4"}>
              <ShoppingBagIcon className={"text-inherit"} />
            </div>
            <div className={"flex items-center justify-center w-full"}>
              <h3 className="capitalize text-inherit text-sm text-center">
                Customer Pick-up
              </h3>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          key={"add-item"}
          className={`rounded-lg w-full focus:bg-secondary_accent/20 focus:text-black bg-white text-black`}
        >
          <Link
            href={"/warehouse/check-in/add-item"}
            className={`flex items-center px-3 my-1 gap-3`}
          >
            <div className={"flex items-center size-4"}>
              <PlusCircleIcon className={"text-inherit"} />
            </div>
            <div className={"flex items-center justify-center w-full"}>
              <h3 className="capitalize text-inherit text-sm text-center">
                Add New Item
              </h3>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          key={"update-item"}
          className={`rounded-lg w-full focus:bg-secondary_accent/20 focus:text-black bg-white text-black`}
        >
          <Link
            href={"/warehouse/check-in/update-item"}
            className={`flex items-center px-3 my-1 gap-3`}
          >
            <div className={"flex items-center size-4"}>
              <PackagePlus className={"text-inherit"} />
            </div>
            <div className={"flex items-center justify-center w-full"}>
              <h3 className="capitalize text-inherit text-sm text-center">
                Restock Item
              </h3>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"rounded-lg bg-red-500 focus:bg-red-700"}>
          <LogoutButton type={"warehouse"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
