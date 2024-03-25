import { PackageCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const res = await fetch(
    `${process.env.API_URL}order/orderDetails/${params.orderId}`,
    {
      method: "GET",
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const data = await res.json();
  return (
    <div
      className={
        "bg-white flex flex-col lg:grid lg:grid-cols-3 gap-5 rounded-2xl p-5 h-svh"
      }
    >
      <div
        className={
          "flex flex-col items-center justify-center gap-5 col-span-2  lg:border-r  lg:border-r-black/50"
        }
      >
        <PackageCheckIcon className={"size-10 text-emerald-500"} />
        <h1 className={"text-xl font-bold"}>Order Packed Successfully</h1>
        <Button>Assign Courier</Button>
      </div>
      <div
        className={
          "flex flex-col gap-5 col-span-1 border-t border-t-black/50 lg:border-t-0 pt-5 lg:pt-0"
        }
      >
        <h1>Order Summary</h1>
        <div className={"flex items-center justify-between gap-5"}>
          <h2 className={"text-sm text-black/50"}>Order ID:</h2>
          <h2 className={"font-bold text-sm"}>{params.orderId}</h2>
        </div>
        <div className={"flex items-center justify-between gap-5"}>
          <h2 className={"text-sm text-black/50"}>Customer:</h2>
          <h2 className={"font-bold text-sm capitalize"}>
            {data.type === "turuq"
              ? data.order.customer?.name
              : `${data.order.customer?.first_name} ${data.order.customer?.last_name}`}
          </h2>
        </div>
        <div className={"flex items-center justify-between gap-5"}>
          <h2 className={"text-sm text-black/50"}>Phone:</h2>
          <h2 className={"font-bold text-sm"}>{data.order.customer.phone}</h2>
        </div>
        <div className={"flex items-center justify-between gap-5"}>
          <h2 className={"text-sm text-black/50"}>Governorate:</h2>
          <h2 className={"font-bold text-sm"}>
            {data.order.customer.governorate}
          </h2>
        </div>
        <div className={"flex items-center justify-between gap-5"}>
          <h2 className={"text-sm text-black/50"}>Address:</h2>
          <h2 className={"font-bold text-sm"}>{data.order.customer.address}</h2>
        </div>
        <div className={"border-t border-t-black/50 py-5"}>
          {data.order.products.map((product: any, index: number) => (
            <div key={`product-${index}`} className={"flex items-center gap-2"}>
              <h1>{product.quantity}x</h1>
              <h1>
                {data.order?.mapped === true
                  ? product?.itemDescription
                  : product?.name}{" "}
                |
              </h1>
              <h1>
                {data.order?.mapped === false
                  ? product?.variant
                  : `${product?.size} | ${product.color}`}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
