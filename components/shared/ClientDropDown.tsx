import { ClientType } from "@/types/client";
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
  WarehouseIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";
import { ChartBarIcon } from "@heroicons/react/16/solid";
import { AdminType } from "@/types/response";

export default function ClientDropDown({
  client,
  admin,
  type,
  variant = "home",
}: {
  client?: ClientType | null;
  admin?: AdminType | null;
  type: "client" | "admin";
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
              {client
                ? client?.companyName.substring(0, 1)
                : admin
                  ? admin?.name?.substring(0, 1)
                  : ""}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start gap-0">
            <h1
              className={`text-xs ${
                variant === "home" ? "text-white" : "text-accent"
              } capitalize`}
            >
              {client ? client?.name : admin ? admin?.name : ""}
            </h1>
            <h3
              className={`text-xs ${
                variant === "home" ? "text-white" : "text-accent"
              } font-bold uppercase`}
            >
              {client ? client?.companyName : "Welcome Admin!"}
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
          <Link
            href={client ? "/client" : admin ? "/admin" : "/"}
            className={`flex items-center `}
          >
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
          <Link
            href={client ? "/client/orders" : admin ? "/admin/orders" : "/"}
            className={`flex items-center `}
          >
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
          <Link
            href={
              client ? "/client/inventory" : admin ? "/admin/inventory" : "/"
            }
            className={`flex items-center `}
          >
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
          <Link
            href={client ? "/client/finances" : admin ? "/admin/finances" : "/"}
            className={`flex items-center `}
          >
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
          <Link
            href={
              client ? "/client/analytics" : admin ? "/admin/analytics" : "/"
            }
            className={`flex items-center `}
          >
            <ChartBarIcon className="mr-2 size-4 text-inherit" />
            Analytics
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"rounded-md"}>
          <LogoutButton type={type} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
