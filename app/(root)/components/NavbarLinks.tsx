"use client";

import { navbarLinks } from "@/utils/links";
import Link from "next/link";
import { useState } from "react";

export default function NavbarLinks({
  variant = "horizontal",
  closeSheet,
}: {
  variant: "horizontal" | "vertical";
  closeSheet?: (e: React.MouseEvent) => void;
}) {
  const [active, setActive] = useState<number>(0);

  return (
    <div
      className={`flex ${
        variant === "vertical"
          ? "flex-col items-start gap-5"
          : "flex-row items-center gap-10"
      } justify-evenly`}
    >
      {navbarLinks.map((link, index: number) => (
        <Link
          href={link.path}
          key={link.path}
          onClick={(e) => {
            setActive(index);
            closeSheet && closeSheet(e);
          }}
          className={`${
            active === index
              ? variant === "horizontal"
                ? "text-white"
                : "text-accent"
              : variant === "horizontal"
              ? "text-white/60 hover:text-white"
              : "text-accent/60 hover:text-accent"
          } uppercase font-bold transition-colors ease-in duration-200`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
