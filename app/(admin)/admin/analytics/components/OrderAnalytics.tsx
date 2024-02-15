"use client";

import { OrderAnalyticsType } from "@/types/response";
import AdminAnalyticsCard from "./AdminAnalyticsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart } from "@tremor/react";

interface OrderAnalyticsProps {
  data: OrderAnalyticsType;
}

export default function OrderAnalytics({ data }: OrderAnalyticsProps) {
  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();
  return (
    <div className="">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className={"bg-transparent gap-2"}>
          <TabsTrigger
            className={
              "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
            }
            value="orders"
          >
            orders
          </TabsTrigger>
          <TabsTrigger
            className={
              "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
            }
            value="shopify"
          >
            shopify
          </TabsTrigger>
          <TabsTrigger
            className={
              "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
            }
            value="zammit"
          >
            zammit
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className={`grid grid-cols-12 gap-5`}>
            {data.orderStatistics.map((stat, index) => (
              <div
                className={
                  "col-span-6 lg:first:col-span-6 lg:last:col-span-6 lg:col-span-3"
                }
                key={stat._id}
              >
                <AdminAnalyticsCard
                  title={
                    stat._id === "outForDelivery"
                      ? "Out For Delivery"
                      : stat._id === "outOfStock"
                        ? "Out Of Stock"
                        : stat._id
                  }
                  value={stat.count}
                  percent={
                    index !== 0 && data.orderStatistics[0].count > 0
                      ? Math.ceil(
                          (stat.count / data.orderStatistics[0].count) * 100,
                        )
                      : undefined
                  }
                  className={`${index === 0 ? "bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent" : "shadow"} text-black`}
                />
              </div>
            ))}
            <div className={"col-span-12"}>
              <BarChart
                className="mt-6"
                data={data.ordersByGovernorate}
                stack={false}
                index="_id"
                categories={["Orders"]}
                colors={["cyan"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                minValue={0}
                yAxisWidth={48}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shopify">
          <div className={`grid grid-cols-12 gap-5`}>
            {data.shopifyOrderStatistics.map((stat, index) => (
              <div
                className={
                  "col-span-6 lg:first:col-span-6 lg:last:col-span-6 lg:col-span-3"
                }
                key={stat._id}
              >
                <AdminAnalyticsCard
                  title={
                    stat._id === "outForDelivery"
                      ? "Out For Delivery"
                      : stat._id === "outOfStock"
                        ? "Out Of Stock"
                        : stat._id
                  }
                  value={stat.count}
                  className={`${index === 0 ? "bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent" : "shadow"} text-black`}
                  percent={
                    index !== 0 && data.shopifyOrderStatistics[0].count > 0
                      ? Math.ceil(
                          (stat.count / data.shopifyOrderStatistics[0].count) *
                            100,
                        )
                      : undefined
                  }
                />
              </div>
            ))}
            <div className={"col-span-12"}>
              <BarChart
                className="mt-6"
                data={data.shopifyOrdersByGovernorate}
                stack={false}
                index="_id"
                categories={["Orders"]}
                colors={["cyan"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                minValue={0}
                yAxisWidth={48}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="zammit">
          <div className={`grid grid-cols-12 gap-5`}>
            {data.zammitOrderStatistics.map((stat, index) => (
              <div
                className={
                  "col-span-6 lg:first:col-span-6 lg:last:col-span-6 lg:col-span-3"
                }
                key={stat._id}
              >
                <AdminAnalyticsCard
                  title={
                    stat._id === "outForDelivery"
                      ? "Out For Delivery"
                      : stat._id === "outOfStock"
                        ? "Out Of Stock"
                        : stat._id
                  }
                  value={stat.count}
                  percent={
                    index !== 0 && data.zammitOrderStatistics[0].count > 0
                      ? Math.ceil(
                          (stat.count / data.zammitOrderStatistics[0].count) *
                            100,
                        )
                      : undefined
                  }
                  className={`${index === 0 ? "bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent" : "shadow"} text-black`}
                />
              </div>
            ))}
            <div className={"col-span-12"}>
              <BarChart
                className="mt-6"
                data={data.zammitOrdersByGovernorate}
                stack={false}
                index="_id"
                categories={["Orders"]}
                colors={["cyan"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                minValue={0}
                yAxisWidth={48}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
