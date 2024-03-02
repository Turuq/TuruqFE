import InformationCard from "@/app/(client)/components/cards/InformationCard";
import { OrderStatisticsType } from "@/types/client";
import Link from "next/link";

export default function AdminOrdersSection({
  orders,
  variant,
  title,
}: {
  orders: OrderStatisticsType;
  variant?: "dashboard" | "orders";
  title: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-0">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          {title}
        </h1>
        {variant === "dashboard" && (
          <Link
            href={"/admin/orders"}
            className="bg-white hover:bg-accent hover:text-white p-2 rounded-lg w-40 text-sm text-accent self-end group"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
      </div>
      {/* Information Cards */}
      {/* Total Orders */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <InformationCard
          title="Total Orders"
          value={orders.total}
          first={true}
          className="text-white bg-accent relative"
        />
      </div>
      {/* Delivered Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard title="Delivered" value={orders.delivered} />
      </div>
      {/* Cancelled Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Cancelled"
          value={orders.cancelled}
          className="text-red-500"
        />
      </div>
      {/* Out Of Stock Orders */}
      <div className="col-span-12 lg:col-span-2">
        <InformationCard
          title="Out Of Stock"
          value={orders.outOfStock}
          className="text-red-500"
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-5">
        {/* Collected Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Collected" value={orders.collected} />
        </div>
        {/* Returned Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Returned" value={orders.returned} />
        </div>
        {/* Out For Delivery */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Out For Delivery"
            value={orders.outForDelivery}
          />
        </div>
        {/* Pending Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Pending" value={orders.pending} />
        </div>
        {/* Unreachable Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Unreachable"
            value={orders.unreachable}
            className="text-red-500"
          />
        </div>
        {/* Postponed Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Postponed"
            value={orders.postponed}
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
