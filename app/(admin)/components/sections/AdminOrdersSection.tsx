import InformationCard from "@/app/(client)/components/cards/InformationCard";
import { OrderStatisticsType } from "@/types/client";
import { PackageOpenIcon } from "lucide-react";
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
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          {title}
        </h1>
        {variant === "dashboard" && (
          <Link
            href={"/admin/orders"}
            className="bg-white p-2 rounded-xl w-auto text-sm text-accent"
          >
            <div className="flex items-center">
              <PackageOpenIcon className="size-4 lg:size-5 text-inherit mr-2" />
              <span className="text-xs lg:text-inherit">Order Details</span>
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
          className="bg-accent text-white"
        />
      </div>
      {/* Delivered Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard title="Delivered Orders" value={orders.delivered} />
      </div>
      {/* Cancelled Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Cancelled Orders"
          value={orders.cancelled}
          className="text-red-500"
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-5">
        {/* Collected Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Collected Orders" value={orders.collected} />
        </div>
        {/* Returned Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Returned Orders" value={orders.returned} />
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
          <InformationCard title="Pending Orders" value={orders.pending} />
        </div>
        {/* Unreachable Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Unreachable Orders"
            value={orders.unreachable}
            className="text-red-500"
          />
        </div>
        {/* Postponed Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Postponed Orders"
            value={orders.postponed}
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
