import { getAllOrders } from "@/lib/actions";
import { OrderType } from "@/types/response";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const data = await getAllOrders();
  return (
    <div className={"flex flex-col gap-2"}>
      {data.orders.map((order: OrderType) => (
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
                  {/*<h3>{item.name}</h3>*/}
                  <p>{item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
