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

export default async function Page() {
  const data = await getAllOrders();
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
        {/*<div className={"col-span-1 flex items-start"}>*/}
        {/*  <Timeline*/}
        {/*    sx={{*/}
        {/*      [`& .${timelineItemClasses.root}:before`]: {*/}
        {/*        flex: 0,*/}
        {/*        padding: 0,*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <TimelineItem>*/}
        {/*      <TimelineSeparator>*/}
        {/*        <TimelineDot sx={{ backgroundColor: "#38cbfc" }} />*/}
        {/*        <TimelineConnector />*/}
        {/*      </TimelineSeparator>*/}
        {/*      <TimelineContent>Select Order</TimelineContent>*/}
        {/*    </TimelineItem>*/}
        {/*    <TimelineItem>*/}
        {/*      <TimelineSeparator>*/}
        {/*        <TimelineDot sx={{ backgroundColor: "#38cbfc" }} />*/}
        {/*        <TimelineConnector />*/}
        {/*      </TimelineSeparator>*/}
        {/*      <TimelineContent>Start Packing</TimelineContent>*/}
        {/*    </TimelineItem>*/}
        {/*    <TimelineItem>*/}
        {/*      <TimelineSeparator>*/}
        {/*        <TimelineDot sx={{ backgroundColor: "#38cbfc" }} />*/}
        {/*      </TimelineSeparator>*/}
        {/*      <TimelineContent>Assign Courier</TimelineContent>*/}
        {/*    </TimelineItem>*/}
        {/*  </Timeline>*/}
        {/*</div>*/}
        <div className={"col-span-4 bg-white rounded-2xl p-5"}>
          <h1 className={"text-xl font-bold"}>Recent Orders</h1>
          <div className={"flex flex-col gap-5"}>
            {data.orders.map((order: AdminOrderType) => (
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
