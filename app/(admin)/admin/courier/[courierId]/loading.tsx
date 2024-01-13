import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex items-center gap-5">
        <Skeleton className="size-10 rounded-full bg-white" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 h-2 rounded-xl bg-white" />
          <Skeleton className="w-20 h-2 rounded-xl bg-white" />
        </div>
      </div>
      <div className="col-span-8 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <Skeleton className="w-full h-80 rounded-xl bg-white" />
      </div>
      <div className="col-span-4 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <Skeleton className="w-full h-80 rounded-xl bg-white" />
      </div>
    </div>
  );
}
