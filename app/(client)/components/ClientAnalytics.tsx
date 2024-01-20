import {
  ClipboardListIcon,
  PackageOpenIcon,
  PackagePlusIcon,
} from "lucide-react";
import LineChart from "@/components/charts/LineChart";
import UploadInventoryButton from "@/components/shared/UploadInventoryButton";
import { FinanceStatisticsType, OrderStatisticsType } from "@/types/client";
import { InventoryResponseType, OrderType } from "@/types/response";
import {
  getPast12Months,
  groupOrderFinancesPast12Month,
  groupOrdersByPast12Months,
  groupOrdersByStatusPast12Months,
} from "@/utils/analytics-functions";

const labels = getPast12Months();

const orderOptions = {
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
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total Orders per Month",
    },
  },
};

const financesOptions = {
  responsive: true,
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: true,
        color: "#fff",
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
        color: "#fff",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total Revenue per Month",
      color: "#fff",
    },
  },
};

export default function ClientAnalytics({
  orderStatistics,
  orderData,
  inventory,
  finances,
}: {
  orderStatistics: OrderStatisticsType;
  orderData: OrderType[];
  inventory: InventoryResponseType | null;
  finances: FinanceStatisticsType;
}) {
  const orderChartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Orders",
        data: groupOrdersByPast12Months(orderData),
        borderColor: "rgb(3, 37, 108)",
        backgroundColor: "rgba(3, 37, 108, 0.5)",
        lineTension: 0.5,
      },
    ],
  };

  const orderDeliveredChartData = {
    labels: labels,
    datasets: [
      {
        label: "Delivered Orders",
        data: groupOrdersByStatusPast12Months(orderData, "delivered"),
        borderColor: "rgb(3, 37, 108)",
        backgroundColor: "rgba(3, 37, 108, 0.5)",
        lineTension: 0.5,
      },
    ],
  };

  const orderCancelledChartData = {
    labels: labels,
    datasets: [
      {
        label: "Delivered Orders",
        data: groupOrdersByStatusPast12Months(orderData, "cancelled"),
        borderColor: "rgb(239 ,68 ,68)",
        backgroundColor: "rgba(239 ,68 ,68, 0.5)",
        lineTension: 0.5,
      },
    ],
  };

  const financesData = {
    labels: labels,
    datasets: [
      {
        label: "Total Revenue",
        data: groupOrderFinancesPast12Month(orderData),
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        lineTension: 0.5,
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
      <div className="col-span-1 lg:col-span-12 flex flex-col gap-10">
        {/* Orders */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
            <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
              orders
            </h1>
            <div className="flex items-center justify-end gap-3">
              <button className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
                <PackageOpenIcon className="size-5 text-inherit mr-2" />
                <span>Order Details</span>
              </button>
              <button className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
                <PackagePlusIcon className="size-5 text-inherit mr-2" />
                <span>New Order</span>
              </button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 w-full bg-white rounded-xl">
            <LineChart options={orderOptions} data={orderChartData} />
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
            <div className="bg-accent text-white rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">total orders</h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.total}
              </h3>
            </div>
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[40%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                delivered orders
              </h3>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex flex-col items-center justify-center text-center">
                  {Math.round(
                    (orderStatistics.delivered / orderStatistics.total) * 100,
                  )}
                  <span className="font-thin text-2xl">%</span>
                </h3>
                <div className="w-full lg:w-[80%]">
                  <LineChart data={orderDeliveredChartData} />
                </div>
              </div>
              <p className="text-sm capitalize text-accent/50">
                {orderStatistics.delivered} orders delivered
              </p>
            </div>
            <div className="bg-white text-red-500 rounded-xl p-2 w-full lg:h-[40%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                cancelled orders
              </h3>
              <div className="flex items-center justify-between gap-3 w-full">
                <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex flex-col items-center justify-center text-center">
                  {Math.round(
                    (orderStatistics.cancelled / orderStatistics.total) * 100,
                  )}
                  <span className="font-thin text-2xl">%</span>
                </h3>
                <div className="w-full lg:w-[80%]">
                  <LineChart data={orderCancelledChartData} />
                </div>
              </div>
              <p className="text-sm capitalize text-red-500/50">
                {orderStatistics.cancelled} cancelled orders
              </p>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-5">
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                collected orders
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.collected}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.collected / orderStatistics.total) * 100,
                )}
                % of Total Orders
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                out for delivery
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.outForDelivery}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.outForDelivery / orderStatistics.total) *
                    100,
                )}
                % of Total Orders
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                pending orders
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.pending}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.pending / orderStatistics.total) * 100,
                )}
                % of Total Orders
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                returned orders
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.returned}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.returned / orderStatistics.total) * 100,
                )}
                % of Total Orders
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                unreachable orders
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.unreachable}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.unreachable / orderStatistics.total) * 100,
                )}
                % of Total Orders
              </p>
            </div>
            <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
              <h3 className="text-inherit text-sm capitalize">
                postponed orders
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                {orderStatistics.postponed}
              </h3>
              <p className="text-sm capitalize text-accent/50">
                {Math.round(
                  (orderStatistics.postponed / orderStatistics.total) * 100,
                )}
                % of Total Orders
              </p>
            </div>
          </div>
        </div>
        {/* Inventory */}
        {inventory && (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
              <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
                inventory
              </h1>
              <div className="flex items-center justify-end gap-3">
                <button className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
                  <ClipboardListIcon className="size-5 text-inherit mr-2" />
                  <span>Inventory Details</span>
                </button>
                <UploadInventoryButton variant="default" />
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-5">
              <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
                <h3 className="text-inherit text-sm capitalize">
                  total in stock
                </h3>
                <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                  {inventory.products.totalInStock}
                </h3>
                <p className="text-sm capitalize text-accent/50">
                  {Math.round(
                    (inventory.products.totalInStock /
                      inventory.clientInventory.length) *
                      100,
                  )}
                  % of Total Stock
                </p>
              </div>
              <div className="col-span-6 lg:col-span-2 bg-white p-2 rounded-xl text-accent">
                <h3 className="text-inherit text-sm capitalize">
                  total out of stock
                </h3>
                <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
                  {inventory.products.totalOutOfStock}
                </h3>
                <p className="text-sm capitalize text-accent/50">
                  {Math.round(
                    (inventory.products.totalOutOfStock /
                      inventory.clientInventory.length) *
                      100,
                  )}
                  % of Total Stock
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Finances */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 flex items-center justify-between">
            <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
              finances
            </h1>
            <div className="flex items-center gap-3"></div>
          </div>
          <div className="col-span-12 lg:col-span-9 w-full bg-accent text-white rounded-xl">
            <LineChart options={financesOptions} data={financesData} />
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                account balance
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex items-center gap-2">
                <span>{finances.balance}</span>
                <span className="text-sm text-accent/50 flex w-full justify-end">
                  EGP
                </span>
              </h3>
            </div>
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                prepaid to clients
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex items-center gap-2">
                <span>{finances.prepaid}</span>
                <span className="text-sm text-accent/50 flex w-full justify-end">
                  EGP
                </span>
              </h3>
            </div>
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                storage services
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex items-center gap-2">
                <span>{finances.storage}</span>
                <span className="text-sm text-accent/50 flex w-full justify-end">
                  EGP
                </span>
              </h3>
            </div>
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">
                packaging services
              </h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex items-center gap-2">
                <span>{finances.packaging}</span>
                <span className="text-sm text-accent/50 flex w-full justify-end">
                  EGP
                </span>
              </h3>
            </div>
            <div className="bg-white text-accent rounded-xl p-2 w-full lg:h-[20%] flex flex-col justify-between">
              <h3 className="text-inherit text-sm capitalize">collected</h3>
              <h3 className="text-inherit font-bold text-2xl lg:text-4xl flex items-center gap-2">
                <span>{finances.collected}</span>
                <span className="text-sm text-accent/50 flex w-full justify-end">
                  EGP
                </span>
              </h3>
            </div>
          </div>
        </div>
        {/* Order Stats */}
      </div>
    </div>
  );
}
