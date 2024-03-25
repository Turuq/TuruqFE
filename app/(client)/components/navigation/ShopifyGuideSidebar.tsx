import Link from "next/link";

export default function ShopifyGuideSidebar() {
  return (
    <div className={"flex flex-col gap-5 p-1 mr-10"}>
      <h1 className={"text-sm font-bold text-black"}>Shopify Integration</h1>
      <Link
        href={"/client/guide"}
        className={"text-black/50 hover:underline text-sm font-semibold"}
      >
        Webhooks
      </Link>
      <Link
        href={"/client/guide/stock-sheets"}
        className={"text-black/50 hover:underline text-sm font-semibold"}
      >
        Stock Sheets
      </Link>
    </div>
  );
}
