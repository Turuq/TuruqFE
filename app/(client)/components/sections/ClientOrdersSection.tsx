import InformationCard from "../cards/InformationCard";
import Link from "next/link";
import { NewOrderDialog } from "../forms/NewOrderDialog";
import { OrderStatisticsType } from "@/types/client";

interface IOrdersProps {
  title?: string;
  variant?: "dashboard" | "orders" | "shopify" | "admin";
  data: OrderStatisticsType;
  isShopify?: boolean;
  url?: string;
}

export default function ClientOrdersSection({
  title = "orders",
  variant = "dashboard",
  isShopify,
  data,
  url,
}: IOrdersProps) {
  return (
    <div className="grid grid-cols-12 gap-5">
      {/*<div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">*/}
      <div className="col-span-12 flex items-center justify-end gap-3">
        {variant === "dashboard" && (
          <Link
            href={"/client/orders"}
            className="bg-white hover:bg-accent hover:text-white p-2 rounded-lg w-40 text-sm text-accent self-end group drop-shadow-sm"
          >
            <div className="flex items-center gap-3 w-full">
              <div className={"w-[10%] group-hover:block hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-inherit"
                >
                  <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
                  <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
                  <line x1="12" x2="12" y1="22" y2="13" />
                  <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
                </svg>
              </div>
              <div className={"w-[10%] group-hover:hidden block"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-inherit"
                >
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <div className={"w-full flex items-center justify-center"}>
                <span className="text-sm lg:text-inherit text-center">
                  Order Details
                </span>
              </div>
            </div>
          </Link>
        )}
        {variant !== "shopify" && (
          <NewOrderDialog>
            <div className="bg-white hover:bg-accent hover:text-white p-2 rounded-lg w-40 text-sm text-accent self-end group drop-shadow-sm">
              <div className="flex items-center gap-3 w-full">
                <div className={"w-[10%] group-hover:block hidden"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-inherit"
                  >
                    <path d="M16 16h6" />
                    <path d="M19 13v6" />
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                  </svg>
                </div>
                <div className={"w-[10%] group-hover:hidden block"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-inherit"
                  >
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
                <div className={"w-full flex items-center justify-center"}>
                  <span className="text-sm lg:text-inherit text-center">
                    New Order
                  </span>
                </div>
              </div>
            </div>
          </NewOrderDialog>
        )}
      </div>
      {/*</div>*/}
      {/* Information Cards */}
      {/* Total Orders */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <InformationCard
          title="Total Orders"
          value={data.total}
          first={true}
          className={`text-white ${isShopify ? "bg-[#95bf47]" : "bg-accent"}`}
        />
      </div>
      {/* Delivered Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Delivered"
          value={data.delivered}
          className={`${isShopify && "text-[#95bf47]"}`}
        />
      </div>
      {/* Cancelled Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Cancelled"
          value={data.cancelled}
          // value={15000}
          className="text-red-500"
        />
      </div>
      {/* Out Of Stock Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Out Of Stock"
          value={data.outOfStock}
          className="text-red-500"
        />
      </div>
      {/*<div className="col-span-12 grid grid-cols-12 gap-5">*/}
      {/* Collected Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Collected"
          value={data.collected}
          className={`${isShopify && "text-[#95bf47]"}`}
        />
      </div>
      {/* Returned Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Returned"
          value={data.returned}
          className={`${isShopify && "text-[#95bf47]"}`}
        />
      </div>
      {/* Out For Delivery */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Out For Delivery"
          value={data.outForDelivery}
          className={`${isShopify && "text-[#95bf47]"}`}
        />
      </div>
      {/* Pending Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Pending"
          value={data.pending}
          className={`${isShopify && "text-[#95bf47]"}`}
        />
      </div>
      {/* Unreachable Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Unreachable"
          value={data.unreachable}
          className="text-red-500"
        />
      </div>
      {/* Postponed Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Postponed"
          value={data.postponed}
          className="text-red-500"
        />
      </div>
      {/*</div>*/}
    </div>
  );
}
