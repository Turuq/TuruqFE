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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ClientInventoryType } from "@/types/response";
import InformationCard from "@/app/(client)/components/cards/InformationCard";
import { InventoryColumns } from "../inventory/Columns";
import { Button } from "@/components/ui/button";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminInventoryTableProps {
  columns: ColumnDef<InventoryColumns>[];
  data: InventoryColumns[];
  inventory: ClientInventoryType[];
}

export function AdminInventoryTable({
  columns,
  data,
  inventory,
}: AdminInventoryTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState<ClientInventoryType>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  function handleOpenDialog(index: number) {
    setOpen(true);
    setSelectedProduct(inventory[index]);
  }

  function handleTableFilter(
    e: React.ChangeEvent<HTMLInputElement>,
    column: string
  ) {
    table.getColumn(column)?.setFilterValue(e.target.value);
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-col gap-3">
        <div className="flex items-center w-full justify-between p-2">
          <p className="text-xs text-accent/50 capitalize">
            showing {limit < inventory.length ? limit : inventory.length} out of{" "}
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
            <span className="text-center">inventory list</span>
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
                    <div className="flex flex-col justify-end gap-3 h-full py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <Input
                        placeholder="Filter"
                        className="w-full h-5 bg-accent/10 text-xs border-none rounded-md text-accent placeholder:text-accent/50 font-medium"
                        onChange={(e) => handleTableFilter(e, header.column.id)}
                      />
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
                className="odd:bg-accent/10 cursor-pointer last:rounded-b-xl"
                onClick={() => handleOpenDialog(row.index)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={`${index === 0 && "font-bold"} text-xs`}
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
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct?.primaryClient.companyName} - (
              {selectedProduct?.itemDescription})
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 gap-5 items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Collection</p>
                  <p className="text-sm">
                    {selectedProduct?.collection ?? "N/A"}{" "}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Size</p>
                  {selectedProduct?.size}
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <p className="text-sm font-semibold">Color</p>
                  <p className="text-sm">{selectedProduct?.color}</p>
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <p className="text-sm font-semibold">Quantity</p>
                  <p className="text-sm">{selectedProduct?.quantity}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="hidden lg:grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <InformationCard
                title="Delivered"
                value={selectedProduct?.delivered ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Cancelled"
                value={selectedProduct?.cancelled ?? 0}
                className="bg-gray-200 text-red-500"
              />
            </div>
            <div className="col-span-6 grid grid-cols-6 gap-5">
              <div className="col-span-3">
                <InformationCard
                  title="Collected"
                  value={selectedProduct?.collected ?? 0}
                  className="bg-gray-200"
                />
              </div>
              <div className="col-span-3">
                <InformationCard
                  title="Returned"
                  value={selectedProduct?.returned ?? 0}
                  className="bg-gray-200"
                />
              </div>
              <div className="col-span-3">
                <InformationCard
                  title="Out For Delivery"
                  value={selectedProduct?.outForDelivery ?? 0}
                  className="bg-gray-200"
                />
              </div>
              <div className="col-span-3">
                <InformationCard
                  title="Pending"
                  value={selectedProduct?.pending ?? 0}
                  className="bg-gray-200"
                />
              </div>
            </div>
            <div className="col-span-3">
              <InformationCard
                title="Unreachable"
                value={selectedProduct?.unreachable ?? 0}
                className="bg-gray-200 text-red-500 h-auto"
              />
            </div>
            <div className="col-span-3">
              <InformationCard
                title="Postponed"
                value={selectedProduct?.postponed ?? 0}
                className="bg-gray-200 text-red-500 h-auto"
              />
            </div>
          </div>
          <div className="lg:hidden grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <InformationCard
                title="Delivered"
                value={selectedProduct?.delivered ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Cancelled"
                value={selectedProduct?.cancelled ?? 0}
                className="bg-gray-200 text-red-500"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Collected"
                value={selectedProduct?.collected ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Returned"
                value={selectedProduct?.returned ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Out For Delivery"
                value={selectedProduct?.outForDelivery ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Pending"
                value={selectedProduct?.pending ?? 0}
                className="bg-gray-200"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Unreachable"
                value={selectedProduct?.unreachable ?? 0}
                className="bg-gray-200 text-red-500 h-auto"
              />
            </div>
            <div className="col-span-6">
              <InformationCard
                title="Postponed"
                value={selectedProduct?.postponed ?? 0}
                className="bg-gray-200 text-red-500 h-auto"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
