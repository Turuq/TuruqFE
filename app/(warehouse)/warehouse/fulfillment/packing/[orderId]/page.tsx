import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dynamic from "next/dynamic";

const OrderPacking = dynamic(
  () =>
    import(
      "@/app/(warehouse)/warehouse/fulfillment/packing/[orderId]/OrderPacking"
    ),
  { ssr: false },
);

export default async function Page({
  params,
}: {
  params: { orderId: string };
}) {
  const res = await fetch(
    `${process.env.API_URL}order/orderDetails/${params.orderId}`,
    {
      method: "GET",
      next: { revalidate: 0 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const data = await res.json();
  if (data.error)
    return (
      <div>
        <h1>Order not found</h1>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
  return (
    <div>
      <div className={"flex items-center justify-start ml-5"}>
        <Link
          href={"/warehouse/fulfillment/packing"}
          className={
            "flex items-center gap-5 text-xs text-black/80 hover:text-black"
          }
        >
          <ArrowLeft className={"size-4"} />
          Back
        </Link>
      </div>
      {data && (
        <div className={"p-5 m-5 bg-white rounded-2xl flex flex-col gap-5"}>
          <h1 className={"font-bold space-x-2"}>
            {"Packing Order: "}
            <span>{params.orderId}</span>
          </h1>
          <div className={"grid grid-cols-3 gap-5"}>
            <div className={"flex flex-col gap-2"}>
              <h1 className={"font-bold text-xs text-black/50"}>Customer</h1>
              <h1 className={"text-base capitalize"}>
                {data.type === "turuq"
                  ? data.order.customer?.name
                  : `${data.order.customer?.first_name} ${data.order.customer?.last_name}`}
              </h1>
            </div>
            <div className={"flex flex-col gap-2"}>
              <h1 className={"font-bold text-xs text-black/50"}>Phone</h1>
              <h1 className={"text-base"}>{data.order.customer?.phone}</h1>
            </div>
            <div className={"flex flex-col gap-2"}>
              <h1 className={"font-bold text-xs text-black/50"}>Governorate</h1>
              <h1 className={"text-base"}>
                {data.order.customer?.governorate}
              </h1>
            </div>
          </div>
          {!data.order.mapped && (
            <Alert className={"border-amber-400 bg-amber-400/30"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {
                  "Products in this order are not mapped, barcode scanner functionality is unavailable."
                }
              </AlertDescription>
            </Alert>
          )}
          <h1 className={"font-bold space-x-2"}>Order Products</h1>
          <OrderPacking data={data} />
        </div>
      )}
      {/*<pre>*/}
      {/*  <code>{JSON.stringify(data, null, 2)}</code>*/}
      {/*</pre>*/}
    </div>
  );
}
