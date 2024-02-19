import { Progress } from "@/components/ui/progress";
import { TruckIcon } from "lucide-react";
import moment from "moment";

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

export default function OrderCard({
  _id,
  customer,
  client,
  total,
  status,
  createdAt,
  updatedAt,
}: OrderCardProps) {
  return (
    <div className="flex flex-col p-5 gap-5 bg-accent/10 rounded-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-accent font-bold text-xs">Order ID</h3>
          <h3 className="uppercase text-accent text-xs">{_id.toString()}</h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-accent font-bold text-xs">Customer</h3>
          <h3 className="uppercase text-accent text-xs">
            {customer.name ??
              `${customer.first_name} ${customer.last_name}` ??
              ""}
          </h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-accent font-bold text-xs">
            brand name
          </h3>
          <h3 className="uppercase text-accent text-xs">
            {client.companyName}
          </h3>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="uppercase text-accent font-bold text-xs">
            total amount
          </h3>
          <h3 className="uppercase text-accent text-xs">{total} EGP</h3>
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
                  status === "delivered" || status === "collected"
                    ? 100
                    : status === "outForDelivery"
                      ? 50
                      : 0
                }
                className="w-full"
              />
              <TruckIcon
                className={`size-4 text-accent absolute -top-1 lg:-top-3 ${
                  status === "delivered" || status === "collected"
                    ? "lg:left-48 left-24"
                    : status === "outForDelivery"
                      ? "lg:left-24 left-12"
                      : "left-0"
                }`}
              />
            </div>
            <h3 className="text-xs font-semibold flex items-center justify-end col-span-2">
              {customer.governorate}
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex items-center justify-start">
              <p className="text-xs text-accent font-light italic">
                {moment(createdAt).format("DD MMM YYYY")}
              </p>
            </div>
            <div></div>
            <div className="flex items-center justify-end">
              <p className="text-xs text-accent font-light italic">
                {moment(updatedAt).format("DD MMM YYYY")}
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
              status === "delivered"
                ? "text-green-700"
                : status === "outForDelivery"
                  ? "text-gray-700"
                  : status === "pending"
                    ? "text-amber-400"
                    : "text-black"
            } font-semibold text-xs`}
          >
            {status}
          </h3>
        </div>
      </div>
    </div>
  );
}
