"use client";

import { clientSidebarLinks } from "@/utils/links";
import ClientLeftSidebarLink from "./ClientLeftSidebarLink";
import ClientLeftSidebarStatistics from "./ClientLeftSidebarStatistics";
import {
  ClipboardListIcon,
  PackageOpenIcon,
  PackagePlusIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { NewOrderDialog } from "../forms/NewOrderDialog";
import { ClientInformationType } from "@/types/client";
import UploadInventoryButton from "@/components/shared/UploadInventoryButton";
import { usePathname } from "next/navigation";
import ShopifyGuideSidebar from "@/app/(client)/components/navigation/ShopifyGuideSidebar";

export default function ClientLeftSideBar({
  data,
}: {
  data: ClientInformationType;
}) {
  const pathname = usePathname();
  return (
    <div className="hidden lg:block col-span-2 h-svh">
      {pathname.includes("/guide") ? (
        <ShopifyGuideSidebar />
      ) : (
        <div className="flex flex-col gap-5">
          {/* Navigation */}
          <div className="bg-white flex flex-col gap-3 rounded-xl shadow-xl h-full p-2">
            {clientSidebarLinks.map((link) => (
              <ClientLeftSidebarLink key={link.label} {...link} />
            ))}
          </div>
          {/* Statistics */}
          <ClientLeftSidebarStatistics data={data} />
          {/* Quick Actions */}
          <div className="bg-white rounded-xl h-full flex items-center shadow-xl justify-between gap-3 p-2">
            {/* View Order Details */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center w-1/4">
                  <Link
                    href={"/client/orders"}
                    className="text-accent/80 hover:text-accent size-5"
                  >
                    <PackageOpenIcon className="size-5 text-inherit" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Order Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Add New Order */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center w-1/4">
                  <NewOrderDialog>
                    <div className="text-accent/80 hover:text-accent size-5">
                      <PackagePlusIcon className="size-5 text-inherit" />
                    </div>
                  </NewOrderDialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add New Order</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* View Inventory Details */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center w-1/4">
                  <Link
                    href={"/client/inventory"}
                    className="text-accent/80 hover:text-accent size-5"
                  >
                    <ClipboardListIcon className="size-5 text-inherit" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Inventory Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Upload Excel File */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center w-1/4">
                  <UploadInventoryButton variant="icon" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload Inventory Excel File</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
}
