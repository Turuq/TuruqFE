"use client";

import { format } from "date-fns";
import { FileDownIcon, MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

export default function DownloadInventoryButton({
  clientId,
  companyName,
}: {
  clientId: string;
  companyName: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  async function downloadInventory() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/latest?client=${clientId}`);
      if (res.status === 200) {
        const blob = await res.blob();
        const fileName = `${companyName}_${format(
          new Date(),
          "yyyy-MM-dd_hh:mm_a"
        )}_inventory.xlsx`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        toast({
          title: "Failed to download inventory",
          description:
            "An error occurred while downloading the inventory. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to download inventory",
        description: error.message,
        variant: "destructive",
      });
    }
    setDownloading(false);
  }
  return (
    <button
      className={`${
        downloading
          ? "bg-accent text-white/80 hover:text-white"
          : "bg-white text-accent/80 hover:text-accent"
      } p-2 rounded-xl w-auto text-sm flex items-center`}
      onClick={downloadInventory}
      disabled={downloading}
    >
      <FileDownIcon className="size-4 lg:size-5 text-inherit mr-2" />
      <span className="text-start text-xs text-inherit">
        {downloading ? (
          <span className="flex items-center">
            Downloading{" "}
            <MoreHorizontalIcon className="text-inherit size-5 animate-pulse ml-2" />
          </span>
        ) : (
          "Download Excel File"
        )}
      </span>
    </button>
  );
}
