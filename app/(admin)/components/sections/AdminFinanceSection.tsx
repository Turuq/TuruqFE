"use client";

import InformationCard from "@/app/(client)/components/cards/InformationCard";
import axios from "axios";
import { ClientType, FinanceStatisticsType } from "@/types/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GovernorateType } from "@/types/governorate";
import { AdminOrderType, ShopifyOrderType } from "@/types/response";

export default function AdminFinanceSection({
  finances,
  clients,
  orders,
  shopifyOrders,
  zammitOrders,
  govFees,
}: {
  finances: FinanceStatisticsType;
  clients: Pick<ClientType, "_id">[];
  govFees: GovernorateType[];
  orders: AdminOrderType[];
  shopifyOrders: ShopifyOrderType[];
  zammitOrders: AdminOrderType[];
}) {
  const [finance, setFinance] = useState(finances);
  const [loading, setLoading] = useState(false);
  const [shippingFees, setShippingFees] = useState(0);

  useEffect(() => {
    setLoading(true);
    let promises = [];
    let adminFinance = {
      collected: 0,
      storage: 0,
      prepaid: 0,
      packaging: 0,
      balance: 0,
      shipping: 0,
    };
    for (let c in clients) {
      promises.push(
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}client/home/${clients[c]._id}`,
            {
              headers: { Authorization: Cookies.get("token") },
            }
          )
          .then((res) => {
            adminFinance.collected += res.data.finance.collected;
            adminFinance.storage += res.data.finance.storage;
            adminFinance.prepaid += res.data.finance.prepaid;
            adminFinance.packaging += res.data.finance.packaging;
            adminFinance.balance += res.data.finance.balance;
          })
          .catch((e) => {
            console.log(e);
          })
      );
    }
    Promise.all(promises)
      .then(() => {
        setLoading(false);
        setFinance(adminFinance);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [clients]);

  useEffect(() => {
    let govTotal = 0;
    if (orders) {
      orders.forEach((order) => {
        if (order.status === "delivered") {
          govTotal += order.shippingFees;
        }
      });
    }

    if (shopifyOrders) {
      shopifyOrders.forEach((order) => {
        if (order.status === "delivered") {
          const orderGov = govFees.find(
            (gov) => gov.name === order.customer.governorate
          );
          govTotal += orderGov?.fee ?? 0;
        }
      });
    }

    if (zammitOrders) {
      zammitOrders.forEach((order) => {
        if (order.status === "delivered") {
          const orderGov = govFees.find(
            (gov) => gov.name === order.customer.governorate
          );
          govTotal += orderGov?.fee ?? 0;
        }
      });
    }

    setShippingFees(govTotal);
  }, [orders, shopifyOrders, zammitOrders, govFees]);

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Finances
        </h1>
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
          title="Shipping"
          value={shippingFees}
          variant="finance"
        />
      </div>
    </div>
  );
}
