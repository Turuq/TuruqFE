import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Inventory
        </h1>
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={`card-${i}`}
          className="col-span-12 lg:col-span-6 flex flex-col gap-3"
        >
          <Skeleton className="w-full h-20 rounded-xl bg-white" />
        </div>
      ))}
      <div className="col-span-12">
        <Skeleton className="w-full h-40 rounded-xl bg-white" />
      </div>
    </div>
  );
}
