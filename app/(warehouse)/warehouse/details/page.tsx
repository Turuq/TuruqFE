import { Metadata } from "next";
import ItemDetailsContainer from "@/app/(warehouse)/warehouse/details/ItemDetailsContainer";

export const metadata: Metadata = {
  title: "Turuq | Warehouse (Item Details)",
  description:
    "Fetch and Display Item Details from the Warehouse, by Scanning an Item's Barcode.",
};

export default function Page() {
  return <ItemDetailsContainer />;
}
