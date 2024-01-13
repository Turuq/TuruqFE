"use client";

import React from "react";
import type { ChartData, ChartOptions } from "chart.js";
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

export const stockOptions = {
  responsive: true,
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      ticks: {
        display: false,
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
      text: "",
    },
  },
};

const labels = ["J", "F", "M", "A", "M", "J", "J"];

export const stockData = {
  labels,
  datasets: [
    {
      label: "",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 340 })),
      borderColor: "rgb(3, 37, 108)",
      backgroundColor: "rgba(3, 37, 108, 0.5)",
      lineTension: 0.5,
    },
  ],
};

export default function LineChart({
  options,
  data,
}: {
  options?: ChartOptions<"line">;
  data?: ChartData<"line">;
}) {
  return (
    <Line
      options={options ? options : stockOptions}
      data={data ? data : stockData}
    />
  );
}
