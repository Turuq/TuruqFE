import { PackageOpenIcon, PackagePlusIcon } from "lucide-react";
import InformationCard from "../cards/InformationCard";
import Link from "next/link";
import { NewOrderDialog } from "../forms/NewOrderDialog";
import { OrderStatisticsType } from "@/types/client";

interface IOrdersProps {
  title?: string;
  variant?: "dashboard" | "orders" | "shopify" | "admin";
  data: OrderStatisticsType;
  url?: string;
}

export default function ClientOrdersSection({
  title = "orders",
  variant = "dashboard",
  data,
  url,
}: IOrdersProps) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          {title}
        </h1>
        <div className="flex items-center justify-end gap-3">
          {variant === "dashboard" ||
            (variant === "admin" && (
              <Link
                href={variant === "admin" && url ? url : "/client/orders"}
                className="bg-white p-2 rounded-xl w-auto text-sm text-accent"
              >
                <div className="flex items-center">
                  <PackageOpenIcon className="size-4 lg:size-5 text-inherit mr-2" />
                  <span className="text-xs lg:text-inherit">Order Details</span>
                </div>
              </Link>
            ))}
          {variant !== "shopify" && (
            <NewOrderDialog>
              <div className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
                <PackagePlusIcon className="size-4 lg:size-5 text-inherit mr-2" />
                <span className="text-xs lg:text-inherit">New Order</span>
              </div>
            </NewOrderDialog>
          )}
        </div>
      </div>
      {/* Information Cards */}
      {/* Total Orders */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <InformationCard
          title="Total Orders"
          value={data.total}
          className="bg-accent text-white"
        />
      </div>
      {/* Delivered Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard title="Delivered Orders" value={data.delivered} />
      </div>
      {/* Cancelled Orders */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Cancelled Orders"
          value={data.cancelled}
          className="text-red-500"
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-5">
        {/* Collected Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Collected Orders" value={data.collected} />
        </div>
        {/* Returned Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Returned Orders" value={data.returned} />
        </div>
        {/* Out For Delivery */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Out For Delivery"
            value={data.outForDelivery}
          />
        </div>
        {/* Pending Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard title="Pending Orders" value={data.pending} />
        </div>
        {/* Unreachable Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Unreachable Orders"
            value={data.unreachable}
            className="text-red-500"
          />
        </div>
        {/* Postponed Orders */}
        <div className="col-span-6 lg:col-span-2">
          <InformationCard
            title="Postponed Orders"
            value={data.postponed}
            className="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
