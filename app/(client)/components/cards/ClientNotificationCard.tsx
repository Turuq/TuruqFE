"use client";
import { BellIcon, PackageXIcon, XIcon } from "lucide-react";
import { Badge } from "@mui/material";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import moment from "moment";
import { NotificationType } from "@/types/response";
import { usePathname } from "next/navigation";
import { deleteNotificationAction } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";

export default function ClientNotificationCard({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  async function handleNotificationDelete(notificationId: string) {
    await deleteNotificationAction({ notificationId, pathname });
  }

  return (
    <Popover>
      <PopoverTrigger>
        {notifications.length > 0 ? (
          <Badge variant={"dot"} color={"error"}>
            <BellIcon className={"size-5 text-accent"} />
          </Badge>
        ) : (
          <BellIcon className={"size-5 text-accent"} />
        )}
      </PopoverTrigger>
      <PopoverContent className={"rounded-xl mt-5 p-1 w-[450px]"}>
        {notifications.length === 0 && (
          <h3 className={"text-sm text-center"}>
            You Have No New Notifications!
          </h3>
        )}
        {notifications?.map((notification) => (
          <div
            key={notification._id}
            className="w-full border-b border-accent/10 pb-5 flex items-start justify-between gap-5 p-2"
          >
            <div className={"w-[5%]"}>
              <PackageXIcon className={"size-5 text-red-500"} />
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <div
                className="flex flex-col items-start justify-center gap-1 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <p className="text-accent text-sm text-balance">
                  {notification.message}
                </p>
                <p className="text-xs font-bold italic text-accent">
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>
              <DialogContent className={"lg:max-w-4xl"}>
                <DialogHeader>
                  <DialogTitle>Out Of Stock Order</DialogTitle>
                  <DialogDescription>
                    <div className="grid grid-cols-2 gap-5 items-center">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">Customer</p>
                        <p className="text-sm capitalize">
                          {notification.orderId.customer.name}{" "}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold">Contact #</p>
                        <Link
                          href={`tel:${notification.orderId.customer.phone}`}
                          className="text-sm underline underline-offset-4"
                        >
                          {notification.orderId.customer.phone}
                        </Link>
                      </div>
                      <div className="flex flex-col gap-1 col-span-2">
                        <p className="text-sm font-semibold">Address</p>
                        <p className="text-sm">
                          {notification.orderId.customer.address} -{" "}
                          <span className="font-bold uppercase">
                            {notification.orderId.customer.governorate}
                          </span>
                        </p>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
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
                    {notification.orderId.products.map((product) => (
                      <TableRow key={product?.UID}>
                        <TableCell className="text-center text-xs font-medium">
                          {/*//@ts-ignore*/}
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
                <div className={"flex items-center justify-end"}>
                  <h3 className={"font-semibold text-sm"}>
                    Total:{" "}
                    <span className={""}>{notification.orderId.total} EGP</span>
                  </h3>
                </div>
              </DialogContent>
            </Dialog>

            <div className={"w-[5%]"}>
              <button
                onClick={() => handleNotificationDelete(notification._id)}
              >
                <XIcon className={"size-5 text-red-500"} />
              </button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
