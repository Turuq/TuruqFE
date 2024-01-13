"use client";

// !DELETE THIS FILE

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BoxesIcon,
  DatabaseIcon,
  InfoIcon,
  LayoutDashboardIcon,
  WarehouseIcon,
} from "lucide-react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Turuq.co 2023 Forecast",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "2023 Forecast",
      data: labels.map(() => faker.datatype.number({ min: 1000, max: 3000 })),
      borderColor: "rgb(6, 190, 225)",
      backgroundColor: "rgba(6, 190, 225, 0.5)",
    },
  ],
};

export default function ClientPage() {
  const [value, setValue] = useState("dashboard");
  const [selected, setSelected] = useState("dashboard");

  function handleValueChange(value: string) {
    setSelected(value);
    setValue(value);
  }
  return (
    <div className="flex flex-col gap-5">
      {/* Big Screen Navigation */}
      <Tabs value={value} onValueChange={handleValueChange} className="w-full">
        {/* Small Screen Navigation */}
        {/* <div className="lg:hidden">
          <ClientNavigation
            selected={selected}
            setSelected={setSelected}
            setValue={setValue}
          />
        </div> */}
        <TabsList className="hidden lg:flex justify-start">
          <TabsTrigger value="dashboard">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon className="size-5 text-inherit" />
              <h3 className="capitalize text-base text-inherit">dashboard</h3>
            </div>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <div className="flex items-center gap-2">
              <BoxesIcon className="size-5 text-inherit" />
              <h3 className="capitalize text-base text-inherit">orders</h3>
            </div>
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <div className="flex items-center gap-2">
              <WarehouseIcon className="size-5 text-inherit" />
              <h3 className="capitalize text-base text-inherit">inventory</h3>
            </div>
          </TabsTrigger>
          <TabsTrigger value="finances">
            <div className="flex items-center gap-2">
              <DatabaseIcon className="size-5 text-inherit" />
              <h3 className="capitalize text-base text-inherit">finances</h3>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex flex-col gap-5 mt-10">
            <h1 className="text-3xl text-white/50 uppercase font-bold">
              dashboard
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* finances */}
              <div className="flex flex-col gap-5">
                <h1 className="uppercase text-base text-white font-bold">
                  finances
                </h1>
                <div className="w-full bg-white rounded-xl mt-1">
                  <Line options={options} data={data} />
                </div>
                <div className="grid grid-cols-5 gap-5">
                  {/* Account Balance */}
                  <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                    <h3 className="text-inherit font-semibold text-sm uppercase">
                      Account Balance
                    </h3>
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-base text-accent">0</h1>
                    </div>
                  </div>
                  {/* Prepaid to Clients */}
                  <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                    <h3 className="text-inherit font-semibold text-sm uppercase">
                      Prepaid to Clients
                    </h3>
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-base text-accent">0</h1>
                    </div>
                  </div>
                  {/* Storage Service */}
                  <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                    <h3 className="text-inherit font-semibold text-sm uppercase">
                      Storage Service
                    </h3>
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-base text-accent">0</h1>
                    </div>
                  </div>
                  {/* Packaging Service */}
                  <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                    <h3 className="text-inherit font-semibold text-sm uppercase">
                      Packaging Service
                    </h3>
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-base text-accent">0</h1>
                    </div>
                  </div>
                  {/* Collected */}
                  <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                    <h3 className="text-inherit font-semibold text-sm uppercase">
                      Collected
                    </h3>
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold text-base text-accent">0</h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* orders */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h1 className="uppercase text-base text-white font-bold">
                    orders
                  </h1>
                  <div className="flex items-center gap-5">
                    <button className="text-sm flex items-center justify-center font-semibold capitalize text-accent bg-white rounded-lg w-44 h-7">
                      <InfoIcon className="size-4 text-inherit mr-2" />
                      <h3>View order details</h3>
                    </button>
                    <button className="rounded-full bg-transparent flex items-center justify-center">
                      <PlusCircleIcon className="size-6 text-white rounded-full" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 grid grid-cols-12 gap-5">
                    {/* Total Orders */}
                    <div className="col-span-3 h-auto">
                      <div className="flex flex-col gap-10 justify-between bg-secondary-500 text-white rounded-xl w-full h-full p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          total orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-white">0</h1>
                        </div>
                      </div>
                    </div>
                    {/* Delivered/Out for Delivery/Returned */}
                    <div className="col-span-9 flex flex-col gap-5">
                      {/* Delivered Orders */}
                      <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          delivered orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-accent">0</h1>
                          <span className="font-bold text-base text-accent/50">
                            0%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Out For Delivery */}
                        <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                          <h3 className="text-inherit font-semibold text-sm uppercase">
                            out for delivery
                          </h3>
                          <div className="flex items-center gap-1">
                            <h1 className="font-bold text-base text-accent">
                              0
                            </h1>
                            <span className="font-bold text-base text-accent/50">
                              0%
                            </span>
                          </div>
                        </div>
                        {/* Returned Orders */}
                        <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                          <h3 className="text-inherit font-semibold text-sm uppercase">
                            returned orders
                          </h3>
                          <div className="flex items-center gap-1">
                            <h1 className="font-bold text-base text-red-500">
                              0
                            </h1>
                            <span className="font-bold text-base text-red-500/50">
                              0%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 grid grid-cols-12 gap-5">
                    {/* Cancelled Orders */}
                    <div className="col-span-3 h-auto">
                      <div className="flex flex-col gap-10 justify-between bg-secondary-500 text-white rounded-xl w-full h-full p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          cancelled orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-red-500">
                            0
                          </h1>
                          <span className="font-bold text-base text-red-500/50">
                            0%
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Pending/Collected/Unreachable/Postponed */}
                    <div className="col-span-9 grid grid-cols-4 gap-5">
                      {/* Pending Orders */}
                      <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          pending orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-accent">0</h1>
                          <span className="font-bold text-base text-accent/50">
                            0%
                          </span>
                        </div>
                      </div>
                      {/* Collected Orders */}
                      <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          collected orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-accent">0</h1>
                          <span className="font-bold text-base text-accent/50">
                            0%
                          </span>
                        </div>
                      </div>
                      {/* Unreachable Orders */}
                      <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          unreachable orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-accent">0</h1>
                          <span className="font-bold text-base text-accent/50">
                            0%
                          </span>
                        </div>
                      </div>
                      {/* Postponed Orders */}
                      <div className="flex flex-col gap-10 justify-between bg-white text-accent rounded-xl w-full h-auto p-2">
                        <h3 className="text-inherit font-semibold text-sm uppercase">
                          postponed orders
                        </h3>
                        <div className="flex items-center gap-1">
                          <h1 className="font-bold text-base text-amber-400">
                            0
                          </h1>
                          <span className="font-bold text-base text-amber-400/50">
                            0%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">orders</TabsContent>
        <TabsContent value="inventory">inventory</TabsContent>
        <TabsContent value="finances">finances</TabsContent>
      </Tabs>
    </div>
  );
}
