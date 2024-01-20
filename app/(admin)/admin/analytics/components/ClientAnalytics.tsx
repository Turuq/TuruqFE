"use client";

import { ClientType } from "@/types/client";
import AdminAnalyticsCard from "@/app/(admin)/admin/analytics/components/AdminAnalyticsCard";
import LineChart from "@/components/charts/LineChart";
import moment from "moment";
import {
  getPast12Months,
  groupNewClientsByMonth,
  groupNewClientsByWeek,
  groupNewClientsByYear,
} from "@/utils/analytics-functions";
import BarChart from "@/components/charts/BarChart";

interface ClientAnalyticsProps {
  clients: ClientType[];
  newClients: ClientType[];
  variant: "week" | "month" | "year";
  top5Labels: string[];
  top5Values: number[];
}

export default function ClientAnalytics({
  clients,
  newClients,
  variant,
  top5Labels,
  top5Values,
}: ClientAnalyticsProps) {
  const options = {
    responsive: true,
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: true,
        },
      },
      // to remove the y-axis labels
      y: {
        ticks: {
          display: true,
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${variant.toUpperCase()}LY CLIENTS`,
      },
    },
  };

  const months = getPast12Months();
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const years = [
    moment().subtract(4, "years").format("YYYY"),
    moment().subtract(3, "years").format("YYYY"),
    moment().subtract(2, "years").format("YYYY"),
    moment().subtract(1, "years").format("YYYY"),
    moment().format("YYYY"),
  ];

  let clientStats: number[] = [];
  switch (variant) {
    case "week":
      clientStats = groupNewClientsByWeek(newClients);
      break;
    case "month":
      clientStats = groupNewClientsByMonth(clients);
      break;
    case "year":
      clientStats = groupNewClientsByYear(clients);
      break;
  }

  const labels =
    variant === "week" ? weeks : variant === "month" ? months : years;
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: clientStats,
        borderColor: "rgb(3, 37, 108)",
        backgroundColor: "rgba(3, 37, 108, 0.5)",
        lineTension: 0.5,
      },
    ],
  };

  const top5BarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Top 5 Clients",
      },
    },
  };

  const top5BarChartData = {
    labels: top5Labels,
    datasets: [
      {
        label: "Delivered/Collected Orders",
        data: top5Values,
        backgroundColor: "rgba(3, 37, 108, 1)",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-5">
      <div className={`grid grid-cols-12 gap-5`}>
        <div className="col-span-12 lg:col-span-6 grid grid-cols-6 gap-5">
          <div className={`col-span-5 lg:col-span-2`}>
            <AdminAnalyticsCard
              title={"Active Clients"}
              value={clients.filter((client) => client.active).length}
              className={"lg:h-full text-white bg-accent"}
            />
          </div>
          <div className={`col-span-7 lg:col-span-4`}>
            <AdminAnalyticsCard
              title={"New Clients"}
              value={newClients.length}
              variant={"compare"}
              description={`This ${variant}`}
              percent={Math.ceil((newClients.length / clients.length) * 100)}
              className={"lg:h-full text-accent"}
            />
          </div>
          <div
            className={
              "col-span-12 lg:col-span-6 bg-white rounded-xl flex items-center"
            }
          >
            <LineChart options={options} data={data} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 bg-white rounded-xl flex flex-col items-center justify-between py-5 gap-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-lg text-accent font-semibold">Top 5 Clients</h3>
            <p className="text-sm text-accent italic">
              Based on Delivered & Collected Orders
            </p>
          </div>
          <BarChart options={top5BarChartOptions} data={top5BarChartData} />
        </div>
      </div>
    </div>
  );
}
