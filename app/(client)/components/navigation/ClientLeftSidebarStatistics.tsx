"use client";

import { ClientInformationType } from "@/types/client";
import { clientQuickLinks } from "@/utils/links";
import moment from "moment";
import { useState } from "react";

export default function ClientLeftSidebarStatistics({
  data,
}: {
  data: ClientInformationType;
}) {
  const [quickLink, setQuickLink] = useState(0);
  return (
    <div className="bg-accent rounded-xl h-full flex shadow-xl flex-col gap-3 p-2 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-balance text-base text-white">Statistics</h3>
        <p className="text-sm text-white">
          {moment().format("DD")}
          <span className="text-xs text-white/50 ml-1">
            {moment().format("MMM")}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          {clientQuickLinks.map((link, index) => (
            <div
              key={link.id}
              className={`${
                index === quickLink
                  ? "bg-white text-accent cursor-default font-semibold"
                  : "bg-transparent text-white hover:bg-white/20 cursor-pointer"
              } rounded-xl p-2 capitalize text-sm text-center`}
              onClick={() => setQuickLink(index)}
            >
              {link.id}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end justify-end">
          <h3 className="text-white text-base font-bold">
            {quickLink === 0
              ? data.orders.total
              : quickLink === 1
                ? data.inventory.totalInStock
                : quickLink === 2
                  ? `${data.finance.balance} EGP`
                  : 0}
          </h3>
        </div>
      </div>
      <div className="flex items-end justify-end w-full -mt-1">
        <p className="text-white/50 text-sm capitalize self-end">
          {clientQuickLinks[quickLink].label}
        </p>
      </div>
    </div>
  );
}
