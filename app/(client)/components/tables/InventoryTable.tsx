"use client";

import { ClientInventoryType } from "@/types/response";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function InventoryTable({
  inventory,
}: {
  inventory: ClientInventoryType[];
}) {
  const [data, setData] = useState<ClientInventoryType[]>(
    inventory.slice(0, 10)
  );
  const [limit, setLimit] = useState<number>(10);
  const [pages, setPages] = useState(Math.ceil(inventory.length / limit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(inventory.length / limit));
  }, [limit, inventory.length]);

  useEffect(() => {
    const start = limit * currentPage - limit;
    const temp = inventory.slice(start, limit * currentPage);
    setData(temp);
  }, [currentPage, inventory, limit]);

  return (
    <div>
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
            <DropdownMenuItem onClick={() => setLimit(10)}>10</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(15)}>15</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(20)}>20</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(25)}>25</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLimit(30)}>30</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="overflow-x-scroll bg-white rounded-t-xl">
        <TableCaption className="capitalize">
          <div className="flex items-center justify-between gap-5">
            <div className="text-accent/50 text-xs">
              page {currentPage + " out of " + pages}
            </div>
            <span className="text-center">your inventory list</span>
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
              #
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              UID
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Description
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Size
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Color
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Collection
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Quantity
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Company
            </TableHead>
            <TableHead className="text-xs font-bold w-auto text-center">
              Storage Remarks
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs w-full">
          {data.slice(0, limit).map((product, index) => (
            <TableRow
              key={product._id.toString()}
              className="odd:bg-accent/10 cursor-pointer last:rounded-b-xl"
            >
              <TableCell className="text-center font-bold mt-5">
                {index + limit * (currentPage - 1) + 1}
              </TableCell>
              <TableCell className="text-center">{product.UID}</TableCell>
              <TableCell className="text-center">
                {product.itemDescription}
              </TableCell>
              <TableCell className="text-center">{product.size}</TableCell>
              <TableCell className="text-center">{product.color}</TableCell>
              <TableCell className="text-center">
                {product.collection ?? ""}
              </TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                {product.primaryClient.companyName}
              </TableCell>
              <TableCell className="text-center">
                {product.storageRemarks ?? ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
