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
              href={"/client/inventory"}
              className="bg-white hover:bg-accent hover:text-white p-2 rounded-lg w-44 text-sm text-accent group drop-shadow-sm"
            >
              <div className="flex items-center gap-3 w-full">
                <div className={"w-[10%] group-hover:hidden block"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-inherit"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  </svg>
                </div>
                <div className={"w-[10%] group-hover:block hidden"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 text-inherit"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <path d="M12 11h4" />
                    <path d="M12 16h4" />
                    <path d="M8 11h.01" />
                    <path d="M8 16h.01" />
                  </svg>
                </div>
                <div className={"w-full flex items-center justify-center"}>
                  <span className="text-sm lg:text-inherit text-center">
                    Inventory Details
                  </span>
                </div>
              </div>
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
