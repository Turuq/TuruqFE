"use client";

import AdminAnalyticsCard from "@/app/(admin)/admin/analytics/components/AdminAnalyticsCard";
import { getPast12Months } from "@/utils/analytics-functions";
import { ClientAnalyticsType } from "@/types/response";
import { AreaChart, BarChart } from "@tremor/react";

interface ClientAnalyticsProps {
  data: ClientAnalyticsType;
}

export default function ClientAnalytics({ data }: ClientAnalyticsProps) {
  const monthsLabels = getPast12Months();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function getMonthIndex(month: string) {
    return months.indexOf(month);
  }

  const clientCountChartData = monthsLabels.map((month) => {
    const monthIndex = getMonthIndex(month);
    return {
      date: months[monthIndex],
      Clients: data.clientsPerMonth[monthIndex]
        ? data.clientsPerMonth[monthIndex].count
        : 0,
    };
  });
  // const clientCountChartData = [
  //   ["Month", "Clients"],
  //   ...monthsLabels.map((month) => {
  //     const monthIndex = getMonthIndex(month);
  //     return [
  //       months[monthIndex],
  //       data.clientsPerMonth[monthIndex]
  //         ? data.clientsPerMonth[monthIndex].count
  //         : 0,
  //     ];
  //   }),
  // ];

  const clientCountChartOptions = {
    title: "Clients Per Month",
    // hAxis: { title: "Month", titleTextStyle: { color: "#000" } },
    vAxis: { minValue: 0 },
    backgroundColor: "transparent",
    colors: ["#03256c"],
    legend: { position: "none" },
    chartArea: {
      width: "90%",
      height: "50%",
    },
  };

  // const top5ClientChartData = [
  //   ["Client", "Orders", "Shopify Orders", "Zammit Orders"],
  //   ...data.top5Clients.all.map((client) => [
  //     client._id,
  //     client.orders ?? 0,
  //     client.shopify ?? 0,
  //     client.zammit ?? 0,
  //   ]),
  // ];
  const top5ClientChartData = data.top5Clients.all.map((client) => {
    return {
      name: client._id,
      Orders: client.orders ?? 0,
      Shopify: client.shopify ?? 0,
      Zammit: client.zammit ?? 0,
    };
  });

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  const top5ClientChartOptions = {
    title: "Top 5 Clients",
    chartArea: { width: "80%" },
    isStacked: true,
    colors: ["#03256c", "#0039ae", "#003cdf"],
    backgroundColor: "transparent",
    // hAxis: {
    //   title: "# Of Orders",
    //   minValue: 0,
    // },
    // vAxis: {
    //   title: "Client",
    // },
  };

  const barColors = [
    "#70d0ff",
    "#2db4ff",
    "#0063ff",
    "#003cdf",
    "#03256c",
  ].reverse();

  const top5ClientsOrdersChartOptions = {
    title: "Top 5 Clients By Orders",
    backgroundColor: "transparent",
    legend: { position: "none" },
  };

  const top5ClientsShopifyChartOptions = {
    title: "Top 5 Clients By Shopify Orders",
    backgroundColor: "transparent",
    legend: { position: "none" },
  };

  const top5ClientsZammitChartOptions = {
    title: "Top 5 Clients By Zammit Orders",
    backgroundColor: "transparent",
    legend: { position: "none" },
  };

  const top5ClientsOrdersChartData = data.top5Clients.orders.map(
    (client, index) => {
      return {
        client: client._id,
        Orders: client.count,
      };
    },
  );

  const top5ClientsShopifyChartData = data.top5Clients.shopifyOrders.map(
    (client, index) => {
      return {
        client: client._id,
        Shopify: client.count,
      };
    },
  );

  const top5ClientsZammitChartData = data.top5Clients.zammitOrders.map(
    (client, index) => {
      return {
        client: client._id,
        Zammit: client.count,
      };
    },
  );

  return (
    <div className="flex flex-col gap-5">
      <div className={`grid grid-cols-12 gap-5`}>
        <div className={`col-span-12 grid grid-cols-12 gap-5`}>
          <div className={`col-span-12 lg:col-span-6`}>
            <AdminAnalyticsCard
              title={"Number Of Clients"}
              value={data.clients}
              className={`bg-gradient-to-b from-secondary-500/20 via-secondary-500/10 to-transparent text-black h-auto`}
              titleColor={"text-black/50"}
            />
          </div>
          <div className={`col-span-12 lg:col-span-6 shadow rounded-xl`}>
            <AdminAnalyticsCard
              title={"Number Of New Clients"}
              value={data.newClients}
              className={`text-black h-auto`}
            />
          </div>
        </div>
        <div className={`col-span-12 rounded-xl bg-white lg:p-5`}>
          <h3 className="text-lg text-accent/50 font-bold uppercase">
            New Clients Per Month
          </h3>
          <AreaChart
            className="h-80"
            data={clientCountChartData}
            index="date"
            categories={["Clients"]}
            colors={["cyan"]}
            valueFormatter={dataFormatter}
            yAxisWidth={20}
            title={"New Clients Per Month"}
            showAnimation={true}
            showGradient={true}
          />
        </div>
        <div className={`col-span-12 rounded-xl bg-white p-5`}>
          <h3 className="text-lg text-accent/50 font-bold uppercase">
            Top 5 Clients
          </h3>
          <BarChart
            className="mt-6"
            data={top5ClientChartData}
            stack={false}
            index="name"
            categories={["Orders", "Shopify", "Zammit"]}
            colors={["cyan", "rose", "indigo"]}
            valueFormatter={dataFormatter}
            showAnimation={true}
            title={"Top 5 Clients"}
            minValue={0}
            yAxisWidth={32}
          />
        </div>
        <div className={`col-span-12 grid grid-cols-12 gap-5`}>
          {data.top5Clients.orders.length > 0 && (
            <div
              className={`col-span-12 p-5 ${data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0 && data.top5Clients.zammitOrders.length > 0 ? "lg:col-span-4" : (data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0) || (data.top5Clients.orders.length > 0 && data.top5Clients.zammitOrders.length > 0) || (data.top5Clients.zammitOrders.length > 0 && data.top5Clients.shopifyOrders.length > 0) ? "lg:col-span-6" : "col-span-12"} rounded-xl bg-white`}
            >
              <h3 className="text-lg text-accent/50 font-bold uppercase">
                Top 5 Clients (Orders)
              </h3>
              <BarChart
                className="mt-6"
                data={top5ClientsOrdersChartData}
                stack={false}
                index="client"
                categories={["Orders"]}
                colors={["cyan"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                title={"Top 5 Clients"}
                minValue={0}
                yAxisWidth={32}
              />
            </div>
          )}
          {data.top5Clients.shopifyOrders.length > 0 && (
            <div
              className={`col-span-12 p-5 ${data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0 && data.top5Clients.zammitOrders.length > 0 ? "lg:col-span-4" : (data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0) || (data.top5Clients.orders.length > 0 && data.top5Clients.zammitOrders.length > 0) || (data.top5Clients.zammitOrders.length > 0 && data.top5Clients.shopifyOrders.length > 0) ? "lg:col-span-6" : "col-span-12"} rounded-xl bg-white`}
            >
              <h3 className="text-lg text-accent/50 font-bold uppercase">
                Top 5 Clients (Shopify Orders)
              </h3>
              <BarChart
                className="mt-6"
                data={top5ClientsShopifyChartData}
                stack={false}
                index="client"
                categories={["Shopify"]}
                colors={["rose"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                title={"Top 5 Clients"}
                minValue={0}
                yAxisWidth={32}
              />
            </div>
          )}
          {data.top5Clients.zammitOrders.length > 0 && (
            <div
              className={`col-span-12 p-5 ${data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0 && data.top5Clients.zammitOrders.length > 0 ? "lg:col-span-4" : (data.top5Clients.orders.length > 0 && data.top5Clients.shopifyOrders.length > 0) || (data.top5Clients.orders.length > 0 && data.top5Clients.zammitOrders.length > 0) || (data.top5Clients.zammitOrders.length > 0 && data.top5Clients.shopifyOrders.length > 0) ? "lg:col-span-6" : "col-span-12"} rounded-xl bg-white`}
            >
              <h3 className="text-lg text-accent/50 font-bold uppercase">
                Top 5 Clients (Zammit Orders)
              </h3>
              <BarChart
                className="mt-6"
                data={top5ClientsZammitChartData}
                stack={false}
                index="client"
                categories={["Zammit"]}
                colors={["indigo"]}
                valueFormatter={dataFormatter}
                showAnimation={true}
                title={"Top 5 Clients"}
                minValue={0}
                yAxisWidth={32}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
