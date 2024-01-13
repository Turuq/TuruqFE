"use client";

import {
  AdminOrderType,
  OrderType,
  ProductDetailsType,
  ProductType,
} from "@/types/response";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";
import { Checkbox } from "@/components/ui/checkbox";

import moment from "moment";
import { useEffect, useState } from "react";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  CheckIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeft,
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  FilterXIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProductByIdAction } from "@/lib/actions";

const availableStatus = [
  "cancelled",
  "collected",
  "delivered",
  "outForDelivery",
  "pending",
  "postponed",
  "returned",
  "unreachable",
];

export default function AdminOrdersTable({
  orders,
  caption,
  handleCheckedChange,
  checkedOrders,
}: {
  caption: string;
  orders: AdminOrderType[];
  handleCheckedChange?: (checked: string | boolean, value: string) => void;
  checkedOrders: string[];
}) {
  const [data, setData] = useState<AdminOrderType[]>(orders.slice(0, 10));
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderType | null>(
    null
  );
  const [limit, setLimit] = useState<number>(10);
  const [pages, setPages] = useState(Math.ceil(orders.length / limit));
  const [currentPage, setCurrentPage] = useState(1);
  const [sortProductNumber, setSortProductNumber] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortShippedTo, setSortShippedTo] = useState<"asc" | "desc" | null>(
    null
  );
  const [filterGovernorate, setFilterGovernorate] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [availableGovernorate, setaAvailableGovernorate] = useState<string[]>(
    []
  );
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailsType | null>();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (orders) {
      const govSet = new Set<string>();
      orders.forEach((order) => govSet.add(order.customer.governorate));
      setaAvailableGovernorate(Array.from(govSet));
    }
  }, [orders]);

  useEffect(() => {
    setPages(Math.ceil(orders.length / limit));
  }, [limit, orders.length]);

  useEffect(() => {
    const start = limit * currentPage - limit;
    const temp = orders.slice(start, limit * currentPage);
    setData(temp);
  }, [currentPage, limit, orders]);

  function handleProductNumberSort() {
    if (sortProductNumber === null) {
      setSortProductNumber("asc");
      data.sort((a, b) => a.products.length - b.products.length);
    } else if (sortProductNumber === "asc") {
      setSortProductNumber("desc");
      data.sort((a, b) => b.products.length - a.products.length);
    } else {
      setSortProductNumber(null);
      setData(orders);
    }
  }

  function handleShippedToSort() {
    if (sortShippedTo === null) {
      setSortShippedTo("asc");
      data.sort((a, b) => {
        if (a.customer.name > b.customer.name) {
          return 1;
        }
        if (a.customer.name < b.customer.name) {
          return -1;
        }
        return 0;
      });
    } else if (sortShippedTo === "asc") {
      setSortShippedTo("desc");
      data.sort((a, b) => {
        if (a.customer.name < b.customer.name) {
          return 1;
        }
        if (a.customer.name > b.customer.name) {
          return -1;
        }
        return 0;
      });
    } else {
      setSortShippedTo(null);
      setData(orders);
    }
  }

  function handleGovSelect(gov: string) {
    if (gov === filterGovernorate) {
      setFilterGovernorate("all");
      setData(orders);
    } else {
      setFilterGovernorate(gov);
      const filteredOrders = orders.filter(
        (order) => order.customer.governorate === gov
      );
      setData(filteredOrders);
    }
  }

  function handleStatusSelect(status: string) {
    if (status === filterStatus) {
      setFilterStatus("all");
      setData(orders);
    } else {
      setFilterStatus(status);
      const filteredOrders = orders.filter((order) => order.status === status);
      setData(filteredOrders);
    }
  }

  function handleInformationDialog(index: number) {
    setOpen(true);
    setSelectedOrder(data[index]);
  }

  async function showProductDetails(
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) {
    const res = await getProductByIdAction({ productId: id });
    if (res.data) {
      setSelectedProduct(res.data);
    }
  }

  function handleQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const filteredOrders = orders.filter((order) =>
      order.customer.name.toLowerCase().includes(e.target.value)
    );
    setData(filteredOrders);
  }

  return (
    <div>
      <div className="flex items-center w-full justify-between p-2">
        <p className="text-xs text-accent/50 capitalize">
          showing {limit < orders.length ? limit : orders.length} out of{" "}
          {data.length} orders
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs text-accent/50">
            Rows per page:{" "}
            <span className="bg-white p-1 rounded-md">{limit}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLimit(10)}>10</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(15)}>15</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(20)}>20</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(25)}>25</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(30)}>30</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="overflow-x-scroll bg-white rounded-t-xl">
        <TableCaption className="capitalize px-10">
          <div className="flex items-center justify-between gap-5">
            <div className="text-accent/50 text-xs">
              page {currentPage + " out of " + pages}
            </div>
            <span className="text-center">{caption} list</span>
            <div className="flex items-center justify-end gap-5">
              <button
                disabled={currentPage === 1}
                className="text-accent/50 hover:text-accent disabled:text-gray-500"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(1);
                  }
                }}
              >
                <ChevronFirstIcon className="size-4 text-inherit" />
              </button>
              <button
                disabled={currentPage === 1}
                className="text-accent/50 hover:text-accent disabled:text-gray-500"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((oldPage) => oldPage - 1);
                  }
                }}
              >
                <ChevronLeftIcon className="size-4 text-inherit" />
              </button>
              <button
                disabled={currentPage === pages}
                className="text-accent/50 hover:text-accent disabled:text-gray-500"
                onClick={() => {
                  if (currentPage < pages) {
                    setCurrentPage((oldPage) => oldPage + 1);
                  }
                }}
              >
                <ChevronRightIcon className="size-4 text-inherit" />
              </button>
              <button
                disabled={currentPage === pages}
                className="text-accent/50 hover:text-accent disabled:text-gray-500"
                onClick={() => {
                  if (currentPage < pages) {
                    setCurrentPage(pages);
                  }
                }}
              >
                <ChevronLastIcon className="size-4 text-inherit" />
              </button>
            </div>
          </div>
        </TableCaption>
        <TableHeader className="rounded-xl w-full">
          <TableRow className="rounded-xl">
            <TableHead className="text-xs font-bold w-auto text-center rounded-tl-xl mb-5">
              <Checkbox disabled />
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center rounded-tl-xl mb-5">
              #
            </TableHead>
            <TableHead className="text-xs font-bold uppercasew-full lg: w-[10%]">
              company name
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[5%] ">
              <div className="flex items-center justify-center gap-2">
                <p># of items</p>
                <button onClick={handleProductNumberSort}>
                  {sortProductNumber === null ? (
                    <ArrowUpDown className="size-3 text-accent" />
                  ) : sortProductNumber === "asc" ? (
                    <ArrowDown01 className="size-3 text-accent" />
                  ) : (
                    <ArrowDown10 className="size-3 text-accent" />
                  )}
                </button>
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[15%] ">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-xs">Shipped to</p>
                  <button onClick={handleShippedToSort}>
                    {sortShippedTo === null ? (
                      <ArrowUpDown className="size-3 text-accent" />
                    ) : sortShippedTo === "asc" ? (
                      <ArrowDownAZ className="size-3 text-accent" />
                    ) : (
                      <ArrowDownZA className="size-3 text-accent" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowSearch((oldValue) => !oldValue)}
                  >
                    {!showSearch ? (
                      <SearchIcon className="size-3 text-accent" />
                    ) : (
                      <XIcon className="size-3 text-accent" />
                    )}
                  </button>
                </div>
                {showSearch && (
                  <Input
                    placeholder="Filter"
                    className="w-full h-5 text-accent placeholder:text-accent/50 font-light"
                    onChange={handleQuery}
                  />
                )}
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[20%]">
              Address
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[5%]">
              <div className="flex items-center justify-center gap-2">
                <p>governorate</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      {filterGovernorate === "all" ? (
                        <FilterIcon className="size-3 text-accent" />
                      ) : (
                        <FilterXIcon className="size-3 text-accent" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="">
                    <DropdownMenuLabel>Filter by Governorate</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                      {availableGovernorate.map((gov) => (
                        <DropdownMenuItem
                          key={gov}
                          onClick={() => handleGovSelect(gov)}
                          className={`capitalize ${
                            gov === filterGovernorate && "bg-accent/10"
                          }`}
                        >
                          {gov === filterGovernorate && (
                            <CheckIcon className="size-3 mr-2 text-accent" />
                          )}{" "}
                          {gov}
                        </DropdownMenuItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[5%]">
              contact
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[10%]">
              received
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[10%]">
              <div className="flex items-center justify-center gap-2">
                <p>status</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      {filterStatus === "all" ? (
                        <FilterIcon className="size-3 text-accent" />
                      ) : (
                        <FilterXIcon className="size-3 text-accent" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableStatus.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleStatusSelect(status)}
                        className={`capitalize ${
                          status === filterStatus && "bg-accent/10"
                        }`}
                      >
                        {status === filterStatus && (
                          <CheckIcon className="size-3 mr-2 text-accent" />
                        )}{" "}
                        {status === "outForDelivery"
                          ? "out for delivery"
                          : status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold uppercase w-full lg:w-[7%] text-right rounded-tr-xl">
              Courier
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs w-full">
          {data.map((order, index) => (
            <TableRow
              key={order._id.toString()}
              className="odd:bg-accent/10 cursor-pointer last:rounded-b-xl"
            >
              <TableCell className="text-center font-bold mt-5">
                <Checkbox
                  checked={checkedOrders.includes(order._id.toString())}
                  onCheckedChange={(checked) =>
                    handleCheckedChange &&
                    handleCheckedChange(checked, order._id.toString())
                  }
                />
              </TableCell>
              <TableCell
                className="text-center font-bold mt-5"
                onClick={() => handleInformationDialog(index)}
              >
                {index + limit * (currentPage - 1) + 1}
              </TableCell>
              <TableCell
                className="font-medium"
                onClick={() => handleInformationDialog(index)}
              >
                {order.client.companyName}
              </TableCell>
              <TableCell
                className="text-center"
                onClick={() => handleInformationDialog(index)}
              >
                {order.products.length}
              </TableCell>
              <TableCell
                className="capitalize"
                onClick={() => handleInformationDialog(index)}
              >
                {order.customer.name}
              </TableCell>
              <TableCell onClick={() => handleInformationDialog(index)}>
                {order.customer.address}
              </TableCell>
              <TableCell
                className="text-center"
                onClick={() => handleInformationDialog(index)}
              >
                {order.customer.governorate}
              </TableCell>
              <TableCell onClick={() => handleInformationDialog(index)}>
                {order.customer.phone}
              </TableCell>
              <TableCell onClick={() => handleInformationDialog(index)}>
                {moment(order.createdAt).format("ddd, DD MMM hh:mm A")}
              </TableCell>
              <TableCell
                className={`uppercase font-semibold ${
                  order.status === "delivered"
                    ? "text-green-700"
                    : order.status === "cancelled" ||
                      order.status === "postponed" ||
                      order.status === "unreachable"
                    ? "text-red-700"
                    : order.status === "outForDelivery" ||
                      order.status === "pending"
                    ? "text-amber-400"
                    : "text-black"
                }`}
                onClick={() => handleInformationDialog(index)}
              >
                {order.status === "outForDelivery"
                  ? "out for delivery"
                  : order.status}
              </TableCell>
              <TableCell
                className="text-right"
                onClick={() => handleInformationDialog(index)}
              >
                {order.courier ? order.courier.name : "Not Assigned"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full">
        {data.length === 0 && (
          <p className="w-full text-center">
            {filterGovernorate !== "all" || filterStatus !== "all"
              ? "There are no orders available for the selected filter."
              : "There are no orders available."}
          </p>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedOrder?.client.companyName}</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 gap-5 items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Customer</p>
                  <p className="text-sm capitalize">
                    {selectedOrder?.customer.name}{" "}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Contact #</p>
                  <Link
                    href={`tel:${selectedOrder?.customer.phone}`}
                    className="text-sm underline underline-offset-4"
                  >
                    {selectedOrder?.customer.phone}
                  </Link>
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <p className="text-sm font-semibold">Address</p>
                  <p className="text-sm">
                    {selectedOrder?.customer.address} -{" "}
                    <span className="font-bold uppercase">
                      {selectedOrder?.customer.governorate}
                    </span>
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          {selectedProduct ? (
            <div className="flex flex-col gap-5 border-y border-accent/10 py-5">
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-5">
                  <button onClick={() => setSelectedProduct(null)}>
                    <ChevronLeftCircleIcon className="size-5 text-accent" />
                  </button>
                  <h3 className="text-sm font-semibold uppercase">
                    {selectedProduct.itemDescription} - {selectedProduct.UID}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Color</p>
                  <p className="text-sm">{selectedProduct.color} </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Size</p>
                  <p className="text-sm">{selectedProduct.size} </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Quantity</p>
                  <p className="text-sm">{selectedProduct.quantity} </p>
                </div>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold w-auto text-center">
                    Product ID
                  </TableHead>
                  <TableHead className="text-xs font-bold w-auto text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="text-xs font-bold w-auto text-right">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder?.products.map((product) => (
                  <TableRow
                    key={product.UID}
                    className="cursor-pointer"
                    onClick={(e) => showProductDetails(e, product.UID)}
                  >
                    <TableCell className="text-center text-xs font-medium">
                      {product.UID}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      {product.price} EGP
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-5">
              <p className="font-bold text-sm capitalize">total</p>
              <p className="text-sm">{selectedOrder?.total} EGP</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
