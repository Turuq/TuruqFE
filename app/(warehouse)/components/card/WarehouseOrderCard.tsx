import Link from "next/link";

interface OrderCardProps {
  _id: string;
  customer: {
    name: string;
    first_name: string;
    last_name: string;
    governorate: string;
  };
  client: {
    companyName: string;
  };
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function FulfillmentOrderCard({
  _id,
  customer,
  client,
  total,
  status,
  createdAt,
  updatedAt,
}: OrderCardProps) {
  return (
    <div className="grid grid-cols-3 p-5 gap-5 bg-secondary_accent/10 rounded-xl">
      <div className="col-span-2 grid grid-cols-2 items-center gap-5">
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-black font-bold text-xs">Order ID</h3>
          <h3 className="uppercase text-black text-xs">{_id.toString()}</h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-black font-bold text-xs">Customer</h3>
          <h3 className="uppercase text-black text-xs">
            {customer.name ??
              `${customer.first_name} ${customer.last_name}` ??
              ""}
          </h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-black font-bold text-xs">brand name</h3>
          <h3 className="uppercase text-black text-xs">{client.companyName}</h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-black font-bold text-xs">
            total amount
          </h3>
          <h3 className="uppercase text-black text-xs">{total} EGP</h3>
        </div>
      </div>
      <div className={"col-span-1 flex items-center justify-center"}>
        <Link
          href={`/warehouse/fulfillment/packing/${_id.toString()}`}
          className={"hover:bg-secondary_accent rounded-xl p-2"}
        >
          Start Packing
        </Link>
      </div>
    </div>
  );
}
