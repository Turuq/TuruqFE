"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { AdminOrderType, ProductDetailsType } from "@/types/response";
import { OrderColumns } from "../inventory/Columns";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  Trash2Icon,
  Undo2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  deleteOrderAction,
  getProductByIdAction,
  returnProductAction,
} from "@/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { DialogTrigger } from "@/components/ui/dialog";
import { EditOrderDialog } from "../../forms/EditOrderDialog";

interface AdminOrderTableProps {
  columns: ColumnDef<OrderColumns>[];
  data: OrderColumns[];
  orders: AdminOrderType[];
  changeMarkedOrders: (orders: string[]) => void;
  changeFilteredColumns: (value: ColumnFiltersState) => void;
  variant: "orders" | "zammit";
}

export function AdminOrderTable({
  columns,
  data,
  orders,
  changeMarkedOrders,
  changeFilteredColumns,
  variant = "orders",
}: AdminOrderTableProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderType>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailsType | null>();
  const [filterGovernorate, setFilterGovernorate] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [fetchingProduct, setFetchingProduct] = useState<boolean>(false);
  const [availableGovernorate, setAvailableGovernorate] = useState<string[]>(
    []
  );
  const [openDelete, setOpenDelete] = useState(false);

  const [availableStatuses, _] = useState([
    { label: "Delivered", value: "delivered" },
    { label: "Collected", value: "collected" },
    { label: "Pending", value: "pending" },
    { label: "Postponed", value: "postponed" },
    { label: "Returned", value: "returned" },
    { label: "Unreachable", value: "unreachable" },
    { label: "Out For Delivery", value: "outForDelivery" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Out Of Stock", value: "outOfStock" },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  function handleOpenDialog(index: number) {
    setOpen(true);
    setSelectedOrder(orders[index]);
  }

  function handleTableFilter(
    e: React.ChangeEvent<HTMLInputElement>,
    column: string
  ) {
    table.getColumn(column)?.setFilterValue(e.target.value);
  }

  async function showProductDetails(
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) {
    setFetchingProduct(true);
    const res = await getProductByIdAction({ productId: id });
    setFetchingProduct(false);
    if (res.data) {
      setSelectedProduct(res.data);
    }
  }

  useEffect(() => {
    if (orders) {
      let governorate = new Set<string>();
      orders.forEach((order) => {
        governorate.add(order.customer.governorate);
      });
      setAvailableGovernorate(Array.from(governorate));
    }
  }, [orders]);

  function handleGovSelect(gov: string) {
    if (gov === filterGovernorate) {
      setFilterGovernorate("all");
      table.getColumn("governorate")?.setFilterValue("");
    } else {
      setFilterGovernorate(gov);
      table.getColumn("governorate")?.setFilterValue(gov);
    }
  }

  function handleStatusSelect(status: string) {
    if (status === filterStatus) {
      setFilterStatus("all");
      table.getColumn("status")?.setFilterValue("");
    } else {
      setFilterStatus(status);
      table.getColumn("status")?.setFilterValue(status);
    }
  }

  useEffect(() => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((selected) =>
        orders[selected.index]._id.toString()
      ) as string[];
    changeMarkedOrders(selectedIds);
  }, [rowSelection, changeMarkedOrders, orders, table]);

  useEffect(() => {
    changeFilteredColumns(columnFilters);
  }, [columnFilters, changeFilteredColumns]);

  async function handleReturnProduct(productId: string) {
    if (selectedOrder) {
      const requestVariant =
        variant === "orders" ? "returned" : "zammitReturned";
      try {
        await returnProductAction({
          orderId: selectedOrder?._id.toString(),
          productId,
          variant: requestVariant,
          pathname: pathname,
        });
      } catch (error: any) {
        setOpen(false);
        toast({
          title: "Failed to return product",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  }

  async function handleOrderDelete() {
    await deleteOrderAction({
      orderId: selectedOrder?._id.toString() ?? "",
      variant,
      pathname,
    });
    setOpenDelete(false);
    setOpen(false);
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-col gap-3">
        <div className="flex items-center w-full justify-between p-2">
          <p className="text-xs text-accent/50 capitalize">
            showing {limit < orders.length ? limit : orders.length} out of{" "}
            {data.length} products
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xs text-accent/50">
              Rows per page:{" "}
              <span className="bg-white p-1 rounded-md">{limit}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(10);
                  table.setPageSize(10);
                }}
              >
                10
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(15);
                  table.setPageSize(15);
                }}
              >
                15
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(20);
                  table.setPageSize(20);
                }}
              >
                20
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(25);
                  table.setPageSize(25);
                }}
              >
                25
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setLimit(30);
                  table.setPageSize(30);
                }}
              >
                30
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="overflow-x-scroll bg-white rounded-t-xl">
        <TableCaption className="capitalize">
          <div className="flex items-center justify-between gap-5">
            <div className="text-accent/50 text-xs">
              page {currentPage + " out of " + table.getPageCount()}
            </div>
            <span className="text-center capitalize">{variant} order list</span>
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.setPageIndex(0);
                  setCurrentPage(1);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronFirstIcon className="size-4 text-accent" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.previousPage();
                  setCurrentPage((oldValue) => oldValue - 1);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="size-4 text-accent" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.nextPage();
                  setCurrentPage((oldValue) => oldValue + 1);
                }}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon className="size-4 text-accent" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  table.setPageIndex(table.getPageCount() - 1);
                  setCurrentPage(table.getPageCount());
                }}
                disabled={!table.getCanNextPage()}
              >
                <ChevronLastIcon className="size-4 text-accent" />
              </Button>
            </div>
          </div>
        </TableCaption>
        <TableHeader className="rounded-xl w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-xs">
                    <div className="grid grid-rows-2 items-center justify-center gap-3 h-full py-3">
                      <div className="">
                        {header.id !== "select" &&
                          header.id !== "actions" &&
                          header.index !== 1 &&
                          header.index !== 2 &&
                          header.id !== "governorate" &&
                          header.id !== "status" &&
                          header.id !== "received" && (
                            <Input
                              placeholder="Filter"
                              className={`w-full h-5 bg-accent/10 text-xs border-none rounded-md text-accent placeholder:text-accent/50 font-medium ${
                                header.id === "actions" && "pointer-events-none"
                              } ${
                                header.id === "select" && "pointer-events-none"
                              }`}
                              onChange={(e) =>
                                handleTableFilter(e, header.column.id)
                              }
                            />
                          )}
                        {/* Governorate Filter */}
                        <div>
                          {header.id === "governorate" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="text-accent/50 text-xs w-full h-5 flex items-center px-3 bg-accent/10 rounded-md">
                                Filter
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>
                                  Filter by Governorate
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <ScrollArea className="h-[400px] rounded-md border p-4">
                                  {availableGovernorate.map((gov) => (
                                    <DropdownMenuItem
                                      key={gov}
                                      onClick={() => handleGovSelect(gov)}
                                      className={`capitalize ${
                                        gov === filterGovernorate &&
                                        "bg-accent/10"
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
                          )}
                        </div>
                        {/* Status Filter */}
                        <div>
                          {header.id === "status" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger className="text-accent/50 text-xs w-full h-5 flex items-center px-3 bg-accent/10 rounded-md">
                                Filter
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>
                                  Filter by Status
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <ScrollArea className="h-[400px] rounded-md border p-4">
                                  {availableStatuses.map((status) => (
                                    <DropdownMenuItem
                                      key={status.value}
                                      onClick={() =>
                                        handleStatusSelect(status.value)
                                      }
                                      className={`capitalize ${
                                        status.value === filterStatus &&
                                        "bg-accent/10"
                                      }`}
                                    >
                                      {status.value === filterStatus && (
                                        <CheckIcon className="size-3 mr-2 text-accent" />
                                      )}{" "}
                                      {status.label}
                                    </DropdownMenuItem>
                                  ))}
                                </ScrollArea>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`odd:bg-accent/10 cursor-pointer last:rounded-b-xl`}
                onClick={() => handleOpenDialog(row.index)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`${
                      index === 1 && "font-bold"
                    } text-xs capitalize`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        {selectedOrder && (
          <DialogContent className="lg:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedOrder?.client.companyName}</DialogTitle>
              <DialogDescription>
                <div className="grid grid-cols-2 gap-5 items-center">
                  <div className="col-span-2 flex items-center justify-end gap-5">
                    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                      <AlertDialogTrigger asChild>
                        <Button
                          disabled={
                            selectedOrder?.status === "delivered" ||
                            selectedOrder?.status === "unreachable" ||
                            selectedOrder?.status === "postponed" ||
                            selectedOrder?.status === "pending" ||
                            selectedOrder?.status === "outForDelivery"
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`text-red-500 w-auto h-auto bg-transparent hover:bg-red-500 hover:text-white disabled:cursor-not-allowed`}
                        >
                          <Trash2Icon className="size-4 text-inherit" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are your sure you want to delete this order?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            By clicking continue, this order will be deleted and
                            its data will be lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 text-white"
                            onClick={handleOrderDelete}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {variant === "orders" && (
                      <EditOrderDialog
                        order={selectedOrder}
                        variant={variant}
                      />
                    )}
                  </div>
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
                  <div className="flex items-center gap-5 w-full">
                    <button onClick={() => setSelectedProduct(null)}>
                      <ChevronLeftCircleIcon className="size-5 text-accent" />
                    </button>
                    <h3 className="text-sm font-semibold uppercase flex-grow">
                      {selectedProduct.itemDescription} - {selectedProduct.UID}
                    </h3>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className={`text-red-500 w-auto h-auto bg-transparent hover:bg-red-500 hover:text-white`}
                          disabled={selectedOrder?.status === "returned"}
                        >
                          <Undo2 className="size-4 text-inherit" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are your sure you want to return this product?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            By clicking continue, this product will be returned.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleReturnProduct(
                                selectedProduct._id.toString()
                              )
                            }
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                      className={`cursor-pointer ${
                        product.returned && "bg-red-500/10"
                      } ${fetchingProduct && "animate-pulse bg-accent/10"}`}
                      onClick={(e) => showProductDetails(e, product.UID)}
                    >
                      <TableCell className="text-center text-xs font-medium">
                        {product.UID ?? product.id}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <p className="font-bold text-sm capitalize">subtotal</p>
                <p className="text-sm">{selectedOrder?.total} EGP</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-bold text-sm capitalize">shipping</p>
                <p className="text-sm">{selectedOrder?.shippingFees} EGP</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-bold text-sm capitalize">total</p>
                <p className="text-sm">
                  {selectedOrder?.total + selectedOrder?.shippingFees} EGP
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
