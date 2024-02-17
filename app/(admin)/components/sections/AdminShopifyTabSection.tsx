"use client";

import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminOrdersSection from "./AdminOrdersSection";
import { OrderStatisticsType } from "@/types/client";
import {
  CourierResponseType,
  OrderStatusType,
  ShopifyOrderType,
} from "@/types/response";
import { useState } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { assignCourierAction, updateOrderStatusAction } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { adminOrderColumns, OrderColumns } from "../tables/inventory/Columns";
import { ColumnFiltersState } from "@tanstack/react-table";
import { AdminShopifyOrderTable } from "../tables/data-tables/AdminShopifyOrderTable";

export default function AdminShopifyTabSection({
  title,
  orders,
  couriers,
  tableData,
  variant,
  orderData,
}: {
  title: string;
  orders: OrderStatisticsType;
  couriers: CourierResponseType;
  tableData: OrderColumns[];
  variant: "shopify";
  orderData: ShopifyOrderType[];
}) {
  const { toast } = useToast();
  const [exporting, setExporting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [file, setFile] = useState<{ blob: Blob; fileName: string } | null>(
    null,
  );
  const [markedOrders, setMarkedOrders] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    OrderStatusType | undefined
  >();
  const [selectedCourier, setSelectedCourier] = useState<string | undefined>();
  const [date, setDate] = useState<Date>();

  const [filteredColumns, setFilteredColumns] = useState<ColumnFiltersState>();

  async function exportOrdersAsExcel() {
    setExporting(true);

    const excelVariant = "shopifyOrdersExcel";

    if (date && filteredColumns) {
      try {
        const res = await fetch(
          `/api/file?variant=${excelVariant}&date=${date.toISOString()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filteredColumns),
          },
        );
        if (res.status === 200) {
          const blob = await res.blob();
          const prefix = "shopifyOrders";
          const timestamp = format(date, "yyyy-MM-dd_hh:mm_a");
          let filters: string[] = [];
          filteredColumns.forEach((f) => {
            filters = [...filters, f.id];
          });
          const fileName = `${prefix}_${filters.join("_")}_${timestamp}.xlsx`;
          setFile({
            blob,
            fileName,
          });
          setFileReady(true);
        } else {
          toast({
            title: "Failed to Export Orders",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Failed to Export Orders",
          description: error.message,
          variant: "destructive",
        });
      }
    } else if (date) {
      try {
        const res = await fetch(
          `/api/file?variant=${excelVariant}&date=${date.toISOString()}`,
        );
        if (res.status === 200) {
          const blob = await res.blob();
          const prefix = "shopifyOrders";
          const timestamp = format(date, "yyyy-MM-dd_hh:mm_a");
          const fileName = `${prefix}_${timestamp}.xlsx`;
          setFile({
            blob,
            fileName,
          });
          setFileReady(true);
        } else {
          toast({
            title: "Failed to Export Orders",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Failed to Export Orders",
          description: error.message,
          variant: "destructive",
        });
      }
    }

    setExporting(false);
  }

  async function handleDownloadFile() {
    if (file) {
      const url = window.URL.createObjectURL(file.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    }
    setFileReady(false);
    setFile(null);
  }

  async function handleStatusUpdate() {
    setUpdating(true);
    if (markedOrders.length > 0 && selectedStatus) {
      const { error, success, message } = await updateOrderStatusAction({
        orders: markedOrders,
        status: selectedStatus,
        variant: variant,
      });
      if (success > 0 && error === 0) {
        toast({
          title: "Updated All Orders Successfully",
          description: `Updated ${success} Order(s)`,
        });
        setMarkedOrders([]);
        setSelectedStatus(undefined);
      }
      if (success > 0 && error > 0) {
        toast({
          title: "Failed To Update All Orders",
          description: `Updated ${success} Order(s) and Failed to Update ${error} Order(s)`,
          variant: "destructive",
        });
        setMarkedOrders([]);
        setSelectedStatus(undefined);
      }
      if (message) {
        toast({
          title: "Failed To Update Orders",
          description: message,
        });
      }
      setUpdating(false);
    }
  }

  async function handleAssignCourier() {
    setAssigning(true);
    if (markedOrders.length > 0 && selectedCourier) {
      const { error, success, message } = await assignCourierAction({
        orders: markedOrders,
        courier: selectedCourier,
        variant: variant,
      });
      if (success > 0 && error === 0) {
        toast({
          title: "Assigned Courier To All Orders Successfully",
          description: `Updated ${success} Order(s)`,
        });
        setMarkedOrders([]);
        setSelectedCourier(undefined);
      }
      if (success > 0 && error > 0) {
        toast({
          title: "Failed To Assign Courier To All Orders",
          description: `Updated ${success} Order(s) and Failed to Update ${error} Order(s)`,
          variant: "destructive",
        });
        setMarkedOrders([]);
        setSelectedCourier(undefined);
      }
      if (message) {
        toast({
          title: "Failed To Assign Courier",
          description: message,
        });
      }
      setAssigning(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {/* <pre>
        <code>{JSON.stringify(orderData[0], null, 2)}</code>
      </pre> */}
      <AdminOrdersSection title={title} variant="orders" orders={orders} />
      <div className="flex flex-col lg:flex-row gap-5 lg:items-center items-start w-full justify-between">
        <div className="flex items-center justify-start w-full rounded-xl flex-grow">
          <DatePicker date={date} setDate={setDate} />
          {!fileReady && !file ? (
            <Button
              variant={"outline"}
              className="rounded-none bg-accent text-white rounded-r-md"
              disabled={!date || exporting}
              onClick={exportOrdersAsExcel}
            >
              {exporting ? (
                <span className="flex items-center">
                  Exporting{" "}
                  <MoreHorizontalIcon className="text-white size-5 animate-pulse ml-2" />
                </span>
              ) : (
                "Export"
              )}
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="rounded-none bg-accent text-white rounded-r-md"
              disabled={!file || !fileReady}
              onClick={handleDownloadFile}
            >
              Download
            </Button>
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center items-start w-full gap-5">
          <div className="flex items-center gap-0">
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as OrderStatusType)
              }
            >
              <SelectTrigger className="w-[180px] bg-white border-none rounded-l-md rounded-r-none text-black">
                <SelectValue
                  className="capitalize"
                  placeholder="Update Status"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-white rounded-md">
                <SelectItem value="pending" className="capitalize">
                  Pending
                </SelectItem>
                <SelectItem value="collected" className="capitalize">
                  Collected
                </SelectItem>
                <SelectItem value="delivered" className="capitalize">
                  Delivered
                </SelectItem>
                <SelectItem value="cancelled" className="capitalize">
                  Cancelled
                </SelectItem>
                <SelectItem value="unreachable" className="capitalize">
                  Unreachable
                </SelectItem>
                <SelectItem value="outForDelivery" className="capitalize">
                  Out For Delivery
                </SelectItem>
                <SelectItem value="postponed" className="capitalize">
                  Postponed
                </SelectItem>
                <SelectItem value="returned" className="capitalize">
                  Returned
                </SelectItem>
                <SelectItem value="outOfStock" className="capitalize">
                  Out Of Stock
                </SelectItem>
              </SelectContent>
            </Select>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-none bg-accent text-white rounded-r-md"
                  disabled={
                    !selectedStatus || markedOrders.length === 0 || updating
                  }
                >
                  {updating ? (
                    <span className="flex items-center">
                      Updating{" "}
                      <MoreHorizontalIcon className="text-white size-5 animate-pulse ml-2" />
                    </span>
                  ) : (
                    "Update"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Your are about to update the status of ${markedOrders.length} Order(s), are you sure you want to
                    proceed?`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleStatusUpdate}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex items-center gap-0">
            <Select
              value={selectedCourier}
              onValueChange={(value: string) => setSelectedCourier(value)}
            >
              <SelectTrigger className="w-[180px] bg-white border-none rounded-l-md rounded-r-none text-black">
                <SelectValue placeholder="Assign Courier" />
              </SelectTrigger>
              <SelectContent className="border-none bg-white rounded-md">
                {couriers.response.map((courier) => (
                  <SelectItem
                    value={courier._id}
                    key={courier.name}
                    className="capitalize"
                  >
                    {courier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-none bg-accent text-white rounded-r-md"
                  disabled={
                    !selectedCourier || markedOrders.length === 0 || assigning
                  }
                >
                  {assigning ? (
                    <span className="flex items-center">
                      Assigning{" "}
                      <MoreHorizontalIcon className="text-white size-5 animate-pulse ml-2" />
                    </span>
                  ) : (
                    "Assign"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Your are about to assign a courier to ${markedOrders.length} Order(s), are you sure you want to
                    proceed?`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAssignCourier}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <AdminShopifyOrderTable
        orders={orderData}
        columns={adminOrderColumns}
        data={tableData}
        changeMarkedOrders={setMarkedOrders}
        changeFilteredColumns={setFilteredColumns}
      />
      {/* <AdminOrdersTable
        caption={title}
        orders={tableData}
        handleCheckedChange={handleCheckedChange}
        checkedOrders={markedOrders}
      /> */}
    </div>
  );
}
