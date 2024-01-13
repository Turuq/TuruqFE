import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Client List
        </h1>
        <Skeleton className="w-20 h-10 rounded-xl bg-white" />
      </div>
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <Skeleton className="w-80 h-10 rounded-xl bg-white" />
        <div className="flex items-center gap-5">
          <Skeleton className="size-10 rounded-xl bg-white" />
          <Skeleton className="size-10 rounded-xl bg-white" />
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`card-${i}`} className="col-span-12 flex flex-col gap-3">
          <Skeleton className="w-full h-40 rounded-xl bg-white" />
        </div>
      ))}
    </div>
  );
}
