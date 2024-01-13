import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function NavbarLoader() {
  return (
    <nav className="flex items-center justify-between">
      <Image
        src={"/assets/images/dark blue logo.png"}
        alt="Turuq.co"
        width={80}
        height={80}
        priority
        aria-label="Turuq"
        className="w-20 h-auto"
      />
      <div className="flex items-center space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-2 w-40" />
          <Skeleton className="h-2 w-32" />
        </div>
      </div>
    </nav>
  );
}
