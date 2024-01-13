import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarLoader() {
  return (
    <div className="hidden lg:block col-span-2 h-svh">
      <div className="flex flex-col gap-5">
        <Skeleton className="w-40 h-80 bg-white rounded-xl" />
        <Skeleton className="w-40 h-40 bg-accent/50 rounded-xl" />
        <Skeleton className="w-40 h-10 bg-white rounded-xl" />
      </div>
    </div>
  );
}
