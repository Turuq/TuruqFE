import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ShopifyGuideSidebar() {
  const pathname = usePathname();
  return (
    <div className={"flex flex-col gap-5 p-1 sticky left-0 mr-10"}>
      <h1 className={"text-sm font-bold text-black"}>Shopify Integration</h1>
      <Link
        href={"/client/guide"}
        className={`${!pathname.includes("/guide/stock-sheets") ? "text-black font-bold" : "text-black/50 hover:underline font-semibold"} text-sm `}
      >
        Webhooks
      </Link>
      <Link
        href={"/client/guide/stock-sheets"}
        className={`${pathname.includes("/guide/stock-sheets") ? "text-black font-bold" : "text-black/50 hover:underline font-semibold"} text-sm `}
      >
        Stock Sheets
      </Link>
    </div>
  );
}
