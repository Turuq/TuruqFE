import { cn } from "@/lib/utils";

interface ICardProps {
  title: string;
  value: string | number;
  variant?: "default" | "finance";
  description?: string;
  className?: string;
}

export default function InformationCard({
  title,
  value,
  variant = "default",
  description,
  className,
}: ICardProps) {
  return (
    <div
      className={cn(
        "bg-white text-accent w-full h-full rounded-xl p-2 flex flex-col justify-between",
        className
      )}
    >
      <h3 className="text-inherit text-sm capitalize">{title}</h3>
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
