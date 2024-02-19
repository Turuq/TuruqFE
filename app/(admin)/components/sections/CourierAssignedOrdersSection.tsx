"use client";

import { AdminOrderType } from "@/types/response";
import { useEffect, useState } from "react";
import CourierFilterExport from "@/app/(admin)/components/CourierFilterExport";
import OrderCard from "@/app/(admin)/components/cards/OrderCard";
import moment from "moment/moment";
import RecordsPerPage from "@/app/(admin)/components/inputs/RecordsPerPage";
import { filterAssignedOrdersAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [filteredData, setFilteredData] = useState<AdminOrderType[]>();
  const [selectedStatus, setSelectedStatus] = useState<
    "delivered/collected" | "outForDelivery" | "other"
  >();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [exporting, setExporting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(orders.length / 10));

  useEffect(() => {
    async function filterAssignedOrders() {
      return await filterAssignedOrdersAction({
        id: courierId,
        status: selectedStatus ?? null,
        brand: selectedBrand ?? null,
        date: date ?? null,
      });
    }

    filterAssignedOrders()
      .then((res) => {
        if (res) {
          setData(res.orders.slice(0, limit));
          setFilteredData(res.orders);
          setTotalPages(Math.ceil(res.orders.length / limit));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [date, selectedStatus, selectedBrand]);

  function resetFilters() {
    setSelectedBrand(undefined);
    setSelectedStatus(undefined);
    setDate(undefined);
    setData(orders.slice(0, limit));
    setFilteredData(undefined);
  }

  function changeOrdersPerPage(newLimit: number) {
    setLimit(newLimit);
  }

  useEffect(() => {
    if (filteredData) {
      setTotalPages(Math.ceil(filteredData.length / limit));
      setData(filteredData.slice(0, limit));
    } else {
      setTotalPages(Math.ceil(orders.length / limit));
      setData(orders.slice(0, limit));
    }
  }, [limit]);

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
      if (filteredData) {
        setData(filteredData.slice(limit * page, limit * (page + 1)));
      } else {
        setData(orders.slice(limit * page, limit * (page + 1)));
      }
    }
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
      if (filteredData) {
        setData(filteredData.slice(limit * (page - 2), limit * (page - 1)));
      } else {
        setData(orders.slice(limit * (page - 2), limit * (page - 1)));
      }
    }
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
      <div className={"flex items-center"}>
        <h1 className="text-lg lg:text-xl font-bold text-accent/50 uppercase">
          assigned orders
        </h1>
      </div>
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
      <div className={"flex items-center justify-between"}>
        <p className={"text-xs text-accent font-light capitalize"}>
          showing {limit <= data.length ? limit : data.length} out of{" "}
          {filteredData ? filteredData.length : orders.length} orders
        </p>
        <RecordsPerPage
          limit={limit}
          ranges={[10, 15, 20, 25, 30]}
          label={"Orders"}
          indicatorColor={"bg-accent text-white"}
          changeLimit={changeOrdersPerPage}
        />
      </div>

      {/*</Pagination>*/}
      {data.length === 0 ? (
        <div
          className={
            "flex flex-col items-center justify-center text-accent text-sm"
          }
        >
          No Data Available{" "}
          <span
            onClick={resetFilters}
            className={
              "underline text-xs text-accent font-semibold cursor-pointer hover:underline-offset-8"
            }
          >
            Clear Filters
          </span>
        </div>
      ) : (
        <>
          {data.slice(0, limit).map((order, index) => (
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
        </>
      )}

      <div className={"flex items-center justify-end gap-5"}>
        <div className={"flex items-center justify-center"}>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={page === 1}
            onClick={previousPage}
          >
            <ChevronLeft className={"size-5 text-accent"} />
          </Button>
        </div>
        <div className={"flex items-center justify-center"}>
          <p className={"text-xs text-accent font-light capitalize"}>
            Page {page} of {totalPages}
          </p>
        </div>
        <div className={"flex items-center justify-center"}>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={page === totalPages}
            onClick={nextPage}
          >
            <ChevronRight className={"size-5 text-accent"} />
          </Button>
        </div>
      </div>
    </div>
  );
}
