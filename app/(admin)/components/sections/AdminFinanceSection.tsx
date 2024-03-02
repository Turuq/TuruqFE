"use client";

import InformationCard from "@/app/(client)/components/cards/InformationCard";
import { FinanceStatisticsType } from "@/types/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket.io";
import moment from "moment";

type StatusType = {
  message: string;
  type: "update" | "fetch" | "error" | "success";
  timestamp: number;
};

export default function AdminFinanceSection({
  finances,
  // clients,
  // orders,
  // shopifyOrders,
  // zammitOrders,
  // govFees,
}: {
  finances: FinanceStatisticsType;
  // clients: Pick<ClientType, "_id">[];
  // govFees: GovernorateType[];
  // orders: AdminOrderType[];
  // shopifyOrders: ShopifyOrderType[];
  // zammitOrders: AdminOrderType[];
}) {
  const [finance, setFinance] = useState(finances);
  const [loading, setLoading] = useState(false);
  const [showUpdateFinances, setShowUpdateFinances] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType[]>([]);
  // const [shippingFees, setShippingFees] = useState(0);

  // useEffect(() => {
  //   setLoading(true);
  //   let promises = [];
  //   let adminFinance = {
  //     collected: 0,
  //     storage: 0,
  //     prepaid: 0,
  //     packaging: 0,
  //     balance: 0,
  //     shipping: 0,
  //   };
  //   for (let c in clients) {
  //     promises.push(
  //       axios
  //         .get(
  //           `${process.env.NEXT_PUBLIC_API_URL}client/home/${clients[c]._id}`,
  //           {
  //             headers: { Authorization: Cookies.get("token") },
  //           },
  //         )
  //         .then((res) => {
  //           adminFinance.collected += res.data.finance.collected;
  //           adminFinance.storage += res.data.finance.storage;
  //           adminFinance.prepaid += res.data.finance.prepaid;
  //           adminFinance.packaging += res.data.finance.packaging;
  //           adminFinance.balance += res.data.finance.balance;
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         }),
  //     );
  //   }
  //   Promise.all(promises)
  //     .then(() => {
  //       setLoading(false);
  //       setFinance(adminFinance);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [clients]);
  //
  // useEffect(() => {
  //   let govTotal = 0;
  //   if (orders) {
  //     orders.forEach((order) => {
  //       if (order.status === "delivered") {
  //         govTotal += order.shippingFees;
  //       }
  //     });
  //   }
  //
  //   if (shopifyOrders) {
  //     shopifyOrders.forEach((order) => {
  //       if (order.status === "delivered") {
  //         const orderGov = govFees.find(
  //           (gov) => gov.name === order.customer.governorate,
  //         );
  //         govTotal += orderGov?.fee ?? 0;
  //       }
  //     });
  //   }
  //
  //   if (zammitOrders) {
  //     zammitOrders.forEach((order) => {
  //       if (order.status === "delivered") {
  //         const orderGov = govFees.find(
  //           (gov) => gov.name === order.customer.governorate,
  //         );
  //         govTotal += orderGov?.fee ?? 0;
  //       }
  //     });
  //   }
  //
  //   setShippingFees(govTotal);
  // }, [orders, shopifyOrders, zammitOrders, govFees]);

  useEffect(() => {
    socket.on("connect", () => {
      setShowUpdateFinances(true);
    });
    socket.on("disconnect", () => {
      setShowUpdateFinances(false);
      setStatus([]);
    });
    socket.on("status update", (statusRes: StatusType[]) => {
      setStatus(statusRes);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect", () => {
        setStatus([]);
        setShowUpdateFinances(false);
      });
      socket.off("status update", () => {
        setStatus([]);
        setShowUpdateFinances(false);
      });
    };
  }, []);

  async function handleUpdateFinances() {
    socket.connect();
    const newStatus: StatusType[] = [
      {
        message: "Fetching Clients",
        type: "fetch",
        timestamp: Date.now(),
      },
    ];
    socket.emit("update finances", newStatus);
    setStatus(newStatus);
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Finances
        </h1>
        <Button
          className={
            "bg-accent hover:bg-accent/80 rounded-lg flex items-center justify-center"
          }
          onClick={handleUpdateFinances}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="size-5 text-inherit mr-2"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 12a9 3 0 0 0 5 2.69" />
            <path d="M21 9.3V5" />
            <path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
            <path d="M12 12v4h4" />
            <path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
          </svg>
          <span className={"text-sm"}>Update Finances</span>
        </Button>
      </div>
      {/* Account Balance */}
      <div
        className={`col-span-12 lg:col-span-6 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Account Balance"
          value={finance.balance}
          variant="finance"
          className={"bg-accent text-white"}
          first={true}
        />
      </div>
      {/* Prepaid To Client */}
      <div
        className={`col-span-12 lg:col-span-6 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Prepaid To Client"
          value={finance.prepaid}
          variant="finance"
        />
      </div>
      {/* Storage Services */}
      <div
        className={`col-span-12 lg:col-span-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Storage Services"
          value={finance.storage}
          variant="finance"
        />
      </div>
      {/* Packaging Services */}
      <div
        className={`col-span-12 lg:col-span-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Packaging Services"
          value={finance.packaging}
          variant="finance"
        />
      </div>
      {/* Collected */}
      <div
        className={`col-span-12 lg:col-span-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Collected"
          value={finance.collected}
          variant="finance"
        />
      </div>
      {/* Shipping */}
      <div
        className={`col-span-12 lg:col-span-3 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <InformationCard
          title="Delivered Orders Shipping"
          value={finance.shipping}
          variant="finance"
        />
      </div>
      {showUpdateFinances && (
        <div
          className={
            "col-span-12 flex flex-col gap-2 bg-white h-svh p-0 lg:p-5 lg:rounded-xl overflow-y-scroll"
          }
        >
          {status.map((status) => (
            <div
              key={status.timestamp}
              className={`border-l-8 flex items-center gap-5 p-2 lg:p-5 ${status.type === "error" ? "bg-red-700/10 border-red-700" : status.type === "success" ? "bg-green-700/10 border-green-700" : status.type === "fetch" ? "bg-primary-900/10 border-primary-900" : "bg-amber-500/10 border-amber-500"}`}
            >
              <span className={"text-xs font-semibold italic"}>
                {moment(status.timestamp).format("hh:mm:ss")}
              </span>
              <span className={"text-sm font-semibold"}>{status.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
