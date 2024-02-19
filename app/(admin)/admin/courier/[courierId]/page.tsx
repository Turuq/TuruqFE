import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneIcon } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { AdminOrderType, CourierType } from "@/types/response";
import { OrderStatisticsType } from "@/types/client";
import InformationCard from "@/app/(client)/components/cards/InformationCard";
import CourierAssignedOrdersSection from "@/app/(admin)/components/sections/CourierAssignedOrdersSection";

export default async function Page({
  params,
}: {
  params: { courierId: string };
}) {
  const res = await fetch(
    `${process.env.API_URL}couriers/getById/${params.courierId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const data = (await res.json()) as {
    orders: AdminOrderType[];
    courier: CourierType;
    statistics: OrderStatisticsType;
    finance: { total: number };
  };

  const brandSet = new Set();
  data.orders.forEach((order) => brandSet.add(order.client.companyName));
  const brands = Array.from(brandSet) as string[];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{data.courier.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <h3 className="text-accent font-semibold">{data.courier.name}</h3>
          <Link
            href={`tel:${data.courier.phone}`}
            className="hover:underline underline-offset-4"
          >
            <h3 className="flex items-center gap-1">
              <PhoneIcon className="size-4 text-accent" />
              <span className="text-accent">{data.courier.phone}</span>
            </h3>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <CourierAssignedOrdersSection
          courierId={params.courierId}
          courierName={data.courier.name}
          brands={brands}
          orders={data.orders}
        />
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-5 bg-white rounded-xl h-full p-5">
          <h1 className="text-lg lg:text-xl font-bold text-accent/50 uppercase">
            courier analytics
          </h1>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <h3 className="text-xl uppercase text-accent/50">orders</h3>
            </div>
            <InformationCard
              title="Delivered"
              value={data.statistics.delivered}
              className="bg-accent text-white"
            />
            <InformationCard
              title="Collected"
              value={data.statistics.collected}
              className="bg-gray-200 text-accent"
            />
            <InformationCard
              title="Out For Delivery"
              value={data.statistics.outForDelivery}
              className="bg-gray-200 text-accent"
            />
            <InformationCard
              title="Returned"
              value={data.statistics.returned}
              className="bg-gray-200 text-accent"
            />
            <InformationCard
              title="Cancelled"
              value={data.statistics.cancelled}
              className="bg-gray-200 text-red-500"
            />
            <InformationCard
              title="Unreachable"
              value={data.statistics.unreachable}
              className="bg-gray-200 text-red-500"
            />
            <div className="col-span-2">
              <h3 className="text-xl uppercase text-accent/50">finances</h3>
            </div>
            <div className="col-span-2">
              <InformationCard
                title="Total Earnings"
                value={data.finance.total}
                className="bg-gray-200 text-accent"
                description="Total earnings from delivered orders"
                variant="finance"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
