import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

import { Progress } from "@/components/ui/progress";
import { cookies } from "next/headers";
import { AdminOrderType, CourierType } from "@/types/response";
import { OrderStatisticsType } from "@/types/client";
import InformationCard from "@/app/(client)/components/cards/InformationCard";
import CourierFilterExport from "@/app/(admin)/components/CourierFilterExport";
import moment from "moment";

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
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-5 bg-white rounded-xl h-full p-5">
          <CourierFilterExport
            courierId={params.courierId}
            courierName={data.courier.name}
            brands={brands}
          />
          {data.orders.map((order, index) => (
            <div
              key={`order-${order._id.toString()}`}
              className="flex flex-col p-5 gap-5 bg-accent/10 rounded-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-accent font-bold text-xs">
                    Order ID
                  </h3>
                  <h3 className="uppercase text-accent text-xs">
                    {order._id.toString()}
                  </h3>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-accent font-bold text-xs">
                    Customer
                  </h3>
                  <h3 className="uppercase text-accent text-xs">
                    {order.customer.name ||
                      // @ts-ignore
                      `${order.customer.first_name} ${order.customer.last_name}`}
                  </h3>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-accent font-bold text-xs">
                    brand name
                  </h3>
                  <h3 className="uppercase text-accent text-xs">
                    {order.client.companyName}
                  </h3>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="uppercase text-accent font-bold text-xs">
                    total amount
                  </h3>
                  <h3 className="uppercase text-accent text-xs">
                    {order.total} EGP
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="col-span-1 lg:col-span-2 self-center w-full">
                  <div className="grid grid-cols-8 gap-5">
                    <h3 className="text-xs font-semibold flex items-center justify-start col-span-2">
                      Turuq HQ
                    </h3>
                    <div className="relative flex items-center col-span-4">
                      <Progress
                        value={
                          order.status === "delivered" ||
                          order.status === "collected"
                            ? 100
                            : order.status === "outForDelivery"
                              ? 50
                              : 0
                        }
                        className="w-full"
                      />
                      <TruckIcon
                        className={`size-4 text-accent absolute -top-1 lg:-top-3 ${
                          order.status === "delivered" ||
                          order.status === "collected"
                            ? "lg:left-48 left-24"
                            : order.status === "outForDelivery"
                              ? "lg:left-24 left-12"
                              : "left-0"
                        }`}
                      />
                    </div>
                    <h3 className="text-xs font-semibold flex items-center justify-end col-span-2">
                      {order.customer.governorate}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-5">
                    <div className="flex items-center justify-start">
                      <p className="text-xs text-accent font-light italic">
                        {moment(order.createdAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                    <div></div>
                    <div className="flex items-center justify-end">
                      <p className="text-xs text-accent font-light italic">
                        {moment(order.updatedAt).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-1 flex flex-col items-end gap-0">
                  <h3 className="uppercase text-accent font-bold text-xs">
                    order status
                  </h3>
                  <h3
                    className={`uppercase ${
                      order.status === "delivered"
                        ? "text-green-700"
                        : order.status === "outForDelivery"
                          ? "text-gray-700"
                          : order.status === "pending"
                            ? "text-amber-400"
                            : "text-black"
                    } font-semibold text-xs`}
                  >
                    {order.status}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
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
