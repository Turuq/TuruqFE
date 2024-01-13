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
      className={`flex items-center px-3 gap-3 p-2 ${
        variant === "client"
          ? pathname === href
            ? "bg-accent text-white cursor-default"
            : "bg-white text-accent hover:bg-accent/20 cursor-pointer"
          : pathname === href
          ? "bg-accent text-white cursor-default"
          : "bg-white text-accent hover:bg-accent/20 cursor-pointer"
      } rounded-xl text-base`}
    >
      {dashboardLinks[icon]}
      <h3 className="capitalize text-inherit">{label}</h3>
    </Link>
  );
}
