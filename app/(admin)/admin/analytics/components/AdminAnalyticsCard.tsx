import { cn } from "@/lib/utils";

interface ICardProps {
  title: string;
  value: string | number;
  variant?: "default" | "finance" | "compare";
  description?: string;
  className?: string;
  percent?: number;
}

export default function AdminAnalyticsCard({
  title,
  value,
  variant = "default",
  description,
  className,
  percent,
}: ICardProps) {
  return (
    <div
      className={cn(
        "bg-white text-black w-full h-full rounded-xl p-2 flex flex-col justify-between gap-1",
        className,
      )}
    >
      <div className={`flex items-center justify-between gap-5`}>
        <h3 className="text-inherit text-sm capitalize font-semibold">
          {title}
        </h3>
        {percent !== undefined && (
          <h3
            className={`${percent > 0 ? "text-green-700" : percent < 0 ? "text-red-500" : "text-accent"} italic font-bold text-xs`}
          >
            {percent > 0 ? `+${percent}` : percent}%
          </h3>
        )}
      </div>
      {/*{variant === "compare" && percent !== undefined && (*/}
      {/*  <div>*/}
      {/*    <AnalyticsProgress*/}
      {/*      value={Math.abs(percent)}*/}
      {/*      className={`h-1 ${percent > 0 ? "text-green-700" : percent < 0 ? "text-red-500" : "text-accent"}`}*/}
      {/*      indicatorColor={*/}
      {/*        percent > 0*/}
      {/*          ? "bg-green-700"*/}
      {/*          : percent < 0*/}
      {/*            ? "bg-red-500"*/}
      {/*            : "bg-accent"*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-inherit font-bold text-2xl lg:text-4xl">
          {value ? value.toLocaleString() : 0}
        </h3>
        {variant === "finance" && (
          <span className="text-sm text-accent/50 flex w-full justify-end">
            EGP
          </span>
        )}
      </div>
      <p className="text-sm capitalize text-inherit/50">{description}</p>
    </div>
  );
}
