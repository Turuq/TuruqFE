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
import { AdminType } from "@/types/response";
import LogoutButton from "@/components/shared/LogoutButton";
import { adminSidebarLinks } from "@/utils/links";
import { dashboardLinks } from "@/utils/dashboard-links";

export default function AdminDropDown({
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
      <DropdownMenuContent className={"w-auto rounded-2xl p-2"}>
        <DropdownMenuLabel>
          <div className={"flex flex-col gap-1 justify-center"}>
            <h1 className={"text-xs text-accent font-bold"}>{admin?.name}</h1>
            <h3 className={"text-xs text-accent font-light"}>{admin?.email}</h3>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {adminSidebarLinks.map((link) => (
          <DropdownMenuItem
            key={link.label}
            className={`rounded-lg w-full focus:bg-accent focus:text-white bg-white text-accent`}
          >
            <Link
              href={link.href}
              className={`flex items-center px-3 my-1 gap-3`}
            >
              <div className={"w-[30%] flex items-center justify-center"}>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"rounded-lg bg-red-500 focus:bg-red-700"}>
          <LogoutButton type={"admin"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
