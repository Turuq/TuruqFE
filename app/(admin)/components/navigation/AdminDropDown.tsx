import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  BoxesIcon,
  DatabaseIcon,
  LayoutDashboardIcon,
  TruckIcon,
  WarehouseIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChartBarIcon } from "@heroicons/react/16/solid";
import { AdminType } from "@/types/response";
import LogoutButton from "@/components/shared/LogoutButton";

export default function ClientDropDown({
  admin,
  variant = "home",
}: {
  admin: AdminType | null;
  variant?: "dashboard" | "home";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 cursor-pointer outline-none">
        <div className="flex gap-2 items-center">
          <Avatar className="size-10">
            <AvatarFallback
              className={`${
                variant === "home"
                  ? "bg-white text-accent"
                  : "bg-white text-accent"
              }`}
            >
              {admin?.name?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-0">
            <h1
              className={`text-xs ${
                variant === "home" ? "text-white" : "text-accent"
              } capitalize`}
            >
              {admin?.name}
            </h1>
            <h3
              className={`text-xs ${
                variant === "home" ? "text-white" : "text-accent"
              } font-bold uppercase`}
            >
              {"Welcome Admin!"}
            </h3>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin"} className={`flex items-center `}>
            <LayoutDashboardIcon className="mr-2 size-4 text-inherit" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin/orders"} className={`flex items-center `}>
            <BoxesIcon className="mr-2 size-4 text-inherit" />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin/inventory"} className={`flex items-center `}>
            <WarehouseIcon className="mr-2 size-4 text-inherit" />
            Inventory
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin/finances"} className={`flex items-center `}>
            <DatabaseIcon className="mr-2 size-4 text-inherit" />
            Finances
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin/courier"} className={`flex items-center `}>
            <TruckIcon className="mr-2 size-4 text-inherit" />
            Courier
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            variant === "dashboard" &&
            "bg-white text-accent hover:bg-accent hover:text-white mb-1"
          } rounded-md`}
        >
          <Link href={"/admin/analytics"} className={`flex items-center `}>
            <ChartBarIcon className="mr-2 size-4 text-inherit" />
            Analytics
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"rounded-md"}>
          <LogoutButton type={"admin"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
