"use client";

import { dashboardLinks } from "@/utils/dashboard-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILinkProps {
  href: string;
  label: string;
  icon: string;
  variant?: "client" | "admin";
}

export default function ClientLeftSidebarLink({
  href,
  label,
  icon,
  variant = "client",
}: ILinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`flex items-center px-3 gap-3 p-2 group ${
        variant === "client"
          ? pathname === href
            ? "bg-accent text-white cursor-default"
            : "bg-white text-accent hover:bg-accent/20 cursor-pointer"
          : pathname === href
            ? "bg-accent text-white cursor-default"
            : "bg-white text-accent hover:bg-accent/20 cursor-pointer"
      } rounded-lg text-base`}
    >
      <div className={"w-[30%] flex items-center justify-center size-4"}>
        {dashboardLinks[icon]}
      </div>
      <div className={"w-full"}>
        <h3 className="capitalize text-inherit text-base">{label}</h3>
      </div>
    </Link>
  );
}
