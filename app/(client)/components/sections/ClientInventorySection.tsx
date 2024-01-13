import { ClipboardListIcon, FileUpIcon } from "lucide-react";
import InformationCard from "../cards/InformationCard";
import Link from "next/link";
import { InventoryStatisticsType } from "@/types/client";
import UploadInventoryButton from "@/components/shared/UploadInventoryButton";
import DownloadInventoryButton from "@/components/shared/DownloadInventoryButton";

interface IInventoryProps {
  title?: string;
  variant?: "dashboard" | "inventory";
  isAdmin?: boolean;
  data: InventoryStatisticsType;
  url?: string;
  clientId?: string;
  companyName?: string;
}

export default function ClientInventorySection({
  title = "inventory",
  variant = "dashboard",
  data,
  url,
  clientId,
  companyName,
  isAdmin = false,
}: IInventoryProps) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          {title}
        </h1>
        <div className="flex items-center justify-end gap-3">
          {variant !== "inventory" && (
            <Link
              href={isAdmin && url ? url : "/client/inventory"}
              className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center"
            >
              <ClipboardListIcon className="size-4 lg:size-5 text-inherit mr-2" />
              <span className="text-xs lg:text-inherit">Inventory Details</span>
            </Link>
          )}
          {!isAdmin ? (
            <UploadInventoryButton variant="default" />
          ) : (
            <DownloadInventoryButton
              clientId={clientId ?? ""}
              companyName={companyName ?? ""}
            />
          )}
        </div>
      </div>
      {/* Total In Stock */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard title="Total In Stock" value={data.totalInStock} />
      </div>
      {/* Total Out Of Stock */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard
          title="Total Out Of Stock"
          value={data.totalOutOfStock}
        />
      </div>
    </div>
  );
}
