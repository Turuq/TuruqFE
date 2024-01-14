"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { deleteOrderAction } from "@/lib/actions";

export type InventoryColumns = {
  index: number;
  UID: string;
  itemDescription: string;
  size: string;
  color: string;
  collection?: string;
  quantity: number;
  companyName: string;
  storageRemarks?: string;
};

export type OrderColumns = {
  index: number;
  numberItems: number;
  companyName: string;
  name: string;
  address: string;
  governorate: string;
  phone: string;
  received: string;
  status: string;
  courier: string;
};

export const adminInventoryColumns: ColumnDef<InventoryColumns>[] = [
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">#</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "UID",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">UID</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "itemDescription",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Description</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Size</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Color</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "collection",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Collection</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Quantity</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Company</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "storageRemarks",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Storage Remarks</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
];

export const adminOrderColumns: ColumnDef<OrderColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        onClick={(event) => event.stopPropagation()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(event) => event.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "index",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">#</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "numberItems",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit"># Of Items</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Company Name</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Shipped To</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Address</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "governorate",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Governorate</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Contact</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Link
            href={`tel:${row.getValue("phone")}`}
            className="hover:underline underline-offset-4"
          >
            {row.getValue("phone")}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "received",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Received</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formatted = moment(row.getValue("received")).format(
        "DD MMM YYYY - hh:mm A"
      );

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Status</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <h3
            className={`text-xs font-bold ${
              row.getValue("status") === "delivered" ||
              row.getValue("status") === "collected"
                ? "text-green-700"
                : row.getValue("status") === "pending"
                ? "text-amber-400"
                : row.getValue("status") === "cancelled" ||
                  row.getValue("status") === "postponed" ||
                  row.getValue("status") === "unreachable" ||
                  row.getValue("status") === "returned"
                ? "text-red-500"
                : "text-accent"
            }`}
          >
            {row.getValue("status") !== "outForDelivery"
              ? row.getUniqueValues("status")
              : "out for delivery"}
          </h3>
        </div>
      );
    },
  },
  {
    accessorKey: "courier",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-between">
          <h3 className="text-inherit">Courier</h3>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-xs"
          >
            <ArrowUpDown className="size-3" />
          </button>
        </div>
      );
    },
  },
];
