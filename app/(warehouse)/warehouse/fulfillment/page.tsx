import { ShoppingBagIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  // const data = await getAllOrders();
  return (
    <div className={"flex flex-col gap-2"}>
      <h1 className={"text-4xl text-secondary_accent/50 uppercase font-bold"}>
        Order Fulfillment
      </h1>
      <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
        <Link href={"/warehouse/fulfillment/packing"}>
          <div
            className={
              "bg-white group hover:bg-white/40 cursor-pointer w-full h-full rounded-2xl flex flex-col items-center justify-center gap-10 p-5"
            }
          >
            <TruckIcon
              className={"size-10 group-hover:text-secondary_accent"}
            />
            <h1 className={"text-2xl font-bold"}>Order Shipping</h1>
          </div>
        </Link>
        <Link href={"/warehouse/fulfillment/pick-up"}>
          <div
            className={
              "bg-white group hover:bg-white/40 cursor-pointer w-full h-full rounded-2xl flex flex-col items-center justify-center gap-10 p-5"
            }
          >
            <ShoppingBagIcon
              className={"size-10 group-hover:text-secondary_accent"}
            />
            <h1 className={"text-2xl font-bold"}>Warehouse Pick-up</h1>
          </div>
        </Link>
      </div>
      {/* {data.orders.map((order: OrderType) => (
        <div
          key={order._id.toString()}
          className={"grid grid-cols-12 gap-5 bg-white p-5 rounded-xl"}
        >
          <div className={"col-span-8"}>
            <h1>{order._id}</h1>
          </div>
          <div className={"col-span-4 self-end"}>
            <Button className={"hover:bg-secondary_accent rounded-xl"}>
              Start Packing
            </Button>
          </div>
          <div className={"col-span-12"}>
            <h2>Items</h2>
            <div className={"flex flex-col gap-5"}>
              {order.products.map((item, index) => (
                <div key={index} className={"flex items-center"}>
                  <h3>{item.name}</h3>
                  <p>{item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}
