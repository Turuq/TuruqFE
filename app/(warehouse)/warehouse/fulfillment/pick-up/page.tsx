import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className={"flex items-center justify-start"}>
        <Link
          href={"/warehouse/fulfillment"}
          className={
            "flex items-center gap-5 text-xs text-black/80 hover:text-black"
          }
        >
          <ArrowLeft className={"size-4"} />
          Back
        </Link>
      </div>
    </div>
  );
}
