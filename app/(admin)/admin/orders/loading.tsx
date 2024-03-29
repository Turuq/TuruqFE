import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:flex items-center gap-5 hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`nav-${i}`} className="">
            <Skeleton className="w-44 h-10 rounded-xl bg-accent/50" />
          </div>
        ))}
      </div>
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Orders
        </h1>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`card-${i}`}
          className="col-span-12 lg:col-span-4 flex flex-col gap-3"
        >
          <Skeleton className="w-full h-20 rounded-xl bg-accent/50" />
        </div>
      ))}
      <div className="col-span-12 grid grid-cols-12 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`card-layer2-${i}`} className="col-span-6 lg:col-span-2">
            <Skeleton className="w-full h-20 rounded-xl bg-white" />
          </div>
        ))}
      </div>
      <div className="col-span-12">
        <Skeleton className="w-full h-40 rounded-xl bg-white" />
      </div>
    </div>
  );
}
