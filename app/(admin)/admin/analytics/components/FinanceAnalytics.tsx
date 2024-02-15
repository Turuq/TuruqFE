"use client";

import { FinanceAnalyticsType } from "@/types/response";
import AdminAnalyticsCard from "./AdminAnalyticsCard";
import { BarChart } from "@tremor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface FinanceAnalyticsProps {
  data: FinanceAnalyticsType;
}

type FinanceDataType = {
  totalCollected: number;
  totalCollectedOrders: number;
  totalCollectedShopify: number;
  totalCollectedZammit: number;
  totalAccount: number;
  totalAccountOrders: number;
  totalAccountShopify: number;
  totalAccountZammit: number;
  totalShipping: number;
  totalShippingOrders: number;
  totalShippingShopify: number;
  totalShippingZammit: number;
};

export default function FinanceAnalytics({ data }: FinanceAnalyticsProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [availableClients, setAvailableClients] = useState<string[]>([]);
  const [financeData, setFinanceData] = useState<FinanceAnalyticsType>(data);

  useEffect(() => {
    const clientSet = new Set<string>();
    data.collectedBalance.perClient.orders.forEach((client) =>
      clientSet.add(client._id),
    );
    data.collectedBalance.perClient.shopify.forEach((client) =>
      clientSet.add(client._id),
    );
    data.collectedBalance.perClient.zammit.forEach((client) =>
      clientSet.add(client._id),
    );
    setAvailableClients(Array.from(clientSet));
  }, []);

  useEffect(() => {
    if (selectedClient === null) {
      setFinanceData(data);
    } else {
      const clientCollected = data.collectedBalance.perClient.orders.find(
        (client) => client._id === selectedClient,
      );
      const clientCollectedShopify =
        data.collectedBalance.perClient.shopify.find(
          (client) => client._id === selectedClient,
        );
      const clientCollectedZammit = data.collectedBalance.perClient.zammit.find(
        (client) => client._id === selectedClient,
      );
      const clientAccount = data.accountBalance.perClient.orders.find(
        (client) => client._id === selectedClient,
      );
      const clientAccountShopify = data.accountBalance.perClient.shopify.find(
        (client) => client._id === selectedClient,
      );
      const clientAccountZammit = data.accountBalance.perClient.zammit.find(
        (client) => client._id === selectedClient,
      );
      const clientShipping = data.shippingTotal.perClient.orders.find(
        (client) => client._id === selectedClient,
      );
      const clientShippingShopify = data.shippingTotal.perClient.shopify.find(
        (client) => client._id === selectedClient,
      );
      const clientShippingZammit = data.shippingTotal.perClient.zammit.find(
        (client) => client._id === selectedClient,
      );
      const clientFinances: FinanceAnalyticsType = {
        collectedBalance: {
          orders: clientCollected?.total ?? 0,
          shopify: clientCollectedShopify?.total ?? 0,
          zammit: clientCollectedZammit?.total ?? 0,
          perClient: data.collectedBalance.perClient,
        },
        accountBalance: {
          orders: clientAccount?.total ?? 0,
          shopify: clientAccountShopify?.total ?? 0,
          zammit: clientAccountZammit?.total ?? 0,
          perClient: data.accountBalance.perClient,
        },
        shippingTotal: {
          orders: clientShipping?.total ?? 0,
          shopify: clientShippingShopify?.total ?? 0,
          zammit: clientShippingZammit?.total ?? 0,
          perClient: data.shippingTotal.perClient,
        },
      };
      setFinanceData(clientFinances);
    }
  }, [selectedClient]);
  const dataFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)} EGP`;
  return (
    <div className="flex flex-col gap-5">
      <div className={`col-span-12 lg:col-span-6`}>
        <h3 className="text-xl text-accent/50 font-bold uppercase">
          Finance Analytics
        </h3>
      </div>
      <div className={`col-span-12 lg:col-span-6`}>
        <Select
          onValueChange={(value) =>
            value === "All Clients"
              ? setSelectedClient(null)
              : setSelectedClient(value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Clients" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={"All Clients"} value={"All Clients"}>
              All Clients
            </SelectItem>
            {availableClients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={`grid grid-cols-12 gap-5`}>
        <div className={`col-span-12`}>
          <AdminAnalyticsCard
            title={"Total Collected Balance"}
            value={
              financeData?.collectedBalance.orders +
              financeData?.collectedBalance.shopify +
              financeData.collectedBalance.zammit
            }
            className={`bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Orders Collected Balance"}
            value={financeData.collectedBalance.orders}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Shopify Collected Balance"}
            value={financeData.collectedBalance.shopify}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Zammit Collected Balance"}
            value={financeData.collectedBalance.zammit}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Collected Order Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.collectedBalance.perClient.orders}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["cyan"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Collected Order Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Collected Shopify Order Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.collectedBalance.perClient.shopify}
              stack={false}
              index="_id"
              layout={"vertical"}
              categories={["total"]}
              colors={["cyan"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Collected Shopify Order Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Collected Zammit Order Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.collectedBalance.perClient.zammit}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["cyan"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Collected Zammit Order Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
      </div>
      {/*  Account Balance */}
      <div className={`grid grid-cols-12 gap-5`}>
        <div className={`col-span-12`}>
          <AdminAnalyticsCard
            title={"Total Account Balance"}
            value={
              financeData.accountBalance.orders +
              financeData.accountBalance.shopify +
              financeData.accountBalance.zammit
            }
            className={`bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Orders Account Balance"}
            value={financeData.accountBalance.orders}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Shopify Account Balance"}
            value={financeData.accountBalance.shopify}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Zammit Account Balance"}
            value={financeData.accountBalance.zammit}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Order Account Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.accountBalance.perClient.orders}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["amber"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Order Account Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Shopify Order Account Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.accountBalance.perClient.shopify}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["amber"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Shopify Order Account Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Zammit Order Account Balance Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.accountBalance.perClient.zammit}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["amber"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Zammit Order Account Balance Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
      </div>
      {/*  Shipping Total */}
      <div className={`grid grid-cols-12 gap-5`}>
        <div className={`col-span-12`}>
          <AdminAnalyticsCard
            title={"Total Shipping Total"}
            value={
              financeData.shippingTotal.orders +
              financeData.shippingTotal.shopify +
              financeData.shippingTotal.zammit
            }
            className={`bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Orders Shipping Total"}
            value={financeData.shippingTotal.orders}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Shopify Shipping Total"}
            value={financeData.shippingTotal.shopify}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        <div className={`col-span-4`}>
          <AdminAnalyticsCard
            title={"Zammit Shipping Total"}
            value={financeData.shippingTotal.zammit}
            className={`bg-white shadow text-black h-auto`}
            variant={"finance"}
          />
        </div>
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Order Shipping Total Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.shippingTotal.perClient.orders}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["rose"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Order Shipping Total Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Shopify Order Shipping Total Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.shippingTotal.perClient.shopify}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["rose"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Shopify Order Shipping Total Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
        {selectedClient === null && (
          <div className={`col-span-12`}>
            <h3 className="text-lg text-accent/50 font-bold uppercase">
              Zammit Order Shipping Total Per Client
            </h3>
            <BarChart
              className="mt-6"
              data={financeData.shippingTotal.perClient.zammit}
              stack={false}
              layout={"vertical"}
              index="_id"
              categories={["total"]}
              colors={["rose"]}
              valueFormatter={dataFormatter}
              showAnimation={true}
              title={"Zammit Order Shipping Total Per Client"}
              minValue={0}
              yAxisWidth={80}
            />
          </div>
        )}
      </div>
    </div>
  );
}
