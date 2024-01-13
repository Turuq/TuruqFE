import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

interface ICardProps {
  title: string;
  value: string | number;
  variant?: "default" | "finance";
  description?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditableInformationCard({
  title,
  value,
  variant = "default",
  description,
  className,
  onChange,
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
        <Input
          defaultValue={value ? value.toLocaleString() : 0}
          className="text-inherit font-bold text-2xl lg:text-4xl border-none bg-accent/10"
          type="number"
          onChange={onChange}
        />
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
