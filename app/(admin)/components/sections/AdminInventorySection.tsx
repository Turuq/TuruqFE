import InformationCard from "@/app/(client)/components/cards/InformationCard";
import AdminUploadInventoryButton from "@/components/shared/AdminUploadInventoryButton";
import { ClipboardListIcon } from "lucide-react";
import Link from "next/link";

export default function AdminInventorySection({
  inventory,
  variant = "dashboard",
}: {
  inventory: {
    totalInStock: number;
    totalOutOfStock: number;
  };
  variant?: "dashboard" | "inventory";
}) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          inventory
        </h1>
        <div className="flex items-center justify-end gap-3">
          {variant === "dashboard" && (
            <Link
              href={"/admin/inventory"}
              className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center"
            >
              <ClipboardListIcon className="size-4 lg:size-5 text-inherit mr-2" />
              <span className="text-xs lg:text-inherit">Inventory Details</span>
            </Link>
          )}
          <AdminUploadInventoryButton variant="default" />
        </div>
      </div>
      {/* Total In Stock */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard
          title="Total In Stock"
          value={inventory.totalInStock}
        />
      </div>
      {/* Total Out Of Stock */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard
          title="Total Out Of Stock"
          value={inventory.totalOutOfStock}
        />
      </div>
    </div>
  );
}
