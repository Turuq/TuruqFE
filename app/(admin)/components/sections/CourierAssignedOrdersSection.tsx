"use client";
import { AdminOrderType } from "@/types/response";
import { useEffect, useState } from "react";
import CourierFilterExport from "@/app/(admin)/components/CourierFilterExport";
import OrderCard from "@/app/(admin)/components/cards/OrderCard";
import moment from "moment/moment";

interface CourierAssignedOrdersSectionProps {
  courierId: string;
  courierName: string;
  brands: string[];
  orders: AdminOrderType[];
}

export default function CourierAssignedOrdersSection({
  orders,
  courierId,
  courierName,
  brands,
}: CourierAssignedOrdersSectionProps) {
  const [data, setData] = useState<AdminOrderType[]>(orders);
  const [selectedStatus, setSelectedStatus] = useState<
    "delivered/collected" | "outForDelivery" | "other"
  >();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    //   Filter orders based on selected status, brand and date
    let filteredOrders = data;
    if (selectedStatus) {
      filteredOrders = filteredOrders.filter((order) => {
        if (selectedStatus === "delivered/collected") {
          return order.status === "delivered" || order.status === "collected";
        } else if (selectedStatus === "other") {
          return (
            order.status === "pending" ||
            order.status === "unreachable" ||
            order.status === "cancelled" ||
            order.status === "postponed" ||
            order.status === "returned"
          );
        } else {
          return order.status === selectedStatus;
        }
      });
    }
    if (selectedBrand) {
      filteredOrders = filteredOrders.filter(
        (order) => order.client.companyName === selectedBrand,
      );
    }
    if (date) {
      filteredOrders = filteredOrders.filter((order) =>
        moment(date).isSame(moment(order.createdAt), "date"),
      );
    }
    setData(filteredOrders);
  }, [date, selectedStatus, selectedBrand]);

  function resetFilters() {
    setSelectedBrand(undefined);
    setSelectedStatus(undefined);
    setDate(undefined);
    setData(orders);
  }

  async function handleOrdersExport() {
    setExporting(true);
    if (selectedStatus || selectedBrand || date) {
      let status =
        selectedStatus === "delivered/collected"
          ? "delivered,collected"
          : selectedStatus === "other"
            ? "pending,unreachable,cancelled,postponed,returned"
            : selectedStatus;
      let query = "";
      if (status) {
        query += `&status=${status}`;
      }
      if (selectedBrand) {
        query += `&brand=${selectedBrand}`;
      }
      if (date) {
        query += `&date=${moment(date).toString()}`;
      }
      const res = await fetch(`/api/courier?courier=${courierId}${query}`);
      setExporting(false);
      if (res.status === 200) {
        const fileName = `${courierName.trim()}_Assigned_Orders_${status ? status : ""}_${
          selectedBrand ? selectedBrand.trim() : ""
        }_${new Date().toLocaleDateString()}.xlsx`;
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
        setSelectedBrand(undefined);
        setSelectedStatus(undefined);
        setDate(undefined);
      }
    }
  }

  return (
    <div className="col-span-1 lg:col-span-8 flex flex-col gap-5 bg-white rounded-xl h-full p-5">
      <CourierFilterExport
        brands={brands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        date={date}
        setDate={setDate}
        exporting={exporting}
        handleOrdersExport={handleOrdersExport}
        resetFilters={resetFilters}
      />
      {data.map((order, index) => (
        <OrderCard
          key={`order-${order._id.toString()}`}
          _id={order._id.toString()}
          status={order.status}
          total={order.total}
          client={order.client}
          customer={order.customer}
          createdAt={order.createdAt}
          updatedAt={order.updatedAt}
        />
      ))}
    </div>
  );
}
