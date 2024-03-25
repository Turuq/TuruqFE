"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// import Timeline from "@mui/lab/Timeline";
// import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
import { getAllOrders } from "@/lib/actions";
import { AdminOrderType } from "@/types/response";
import FulfillmentOrderCard from "@/app/(warehouse)/components/card/WarehouseOrderCard";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<{
    data?: {
      orders: AdminOrderType[];
    };
    error?: string;
  }>();
  useEffect(() => {
    async function fetchData() {
      const fetchedData: {
        data?: {
          orders: AdminOrderType[];
        };
        error?: string;
      } = await getAllOrders();
      return fetchedData;
    }

    fetchData().then((res) => {
      setData(res);
    });
  }, []);
  return (
    <div className={"flex flex-col gap-0"}>
      <div
        className={
          "flex flex-col gap-5 p-5 bg-white w-full h-[20svh] rounded-t-2xl"
        }
      >
        <div className={"flex items-center justify-start"}>
          <Link
            href={"/warehouse/fulfillment"}
            className={
              "flex items-center gap-5 text-xs text-black/80 hover:text-black"
            }
          >
            <ArrowLeft className={"size-4"} />
            Back
          </Link>
        </div>
        <h1 className={"text-4xl text-secondary_accent/50 uppercase font-bold"}>
          Order Shipping
        </h1>
      </div>
      <div
        className={
          "grid grid-cols-4 bg-white/30 w-full h-full rounded-b-2xl p-5 gap-5"
        }
      >
        <div className={"col-span-4 bg-transparent rounded-2xl"}>
          <h1 className={"text-xl font-bold mb-5"}>Recent Orders</h1>
          <div className={"flex flex-col gap-5"}>
            {data?.data?.orders?.map((order: AdminOrderType) => (
              <FulfillmentOrderCard
                key={order._id.toString()}
                status={order.status}
                total={order.total}
                customer={order.customer}
                client={order.client}
                _id={order._id.toString()}
                updatedAt={order.updatedAt}
                createdAt={order.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
