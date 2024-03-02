import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ICardProps {
  title: string;
  value: string | number;
  variant?: "default" | "finance";
  description?: string;
  className?: string;
  first?: boolean;
}

export default function InformationCard({
  title,
  value,
  variant = "default",
  description,
  className,
  first = false,
}: ICardProps) {
  return (
    <div className={"flex flex-col gap-10"}>
      <Card className={cn(`rounded-2xl drop-shadow-xl text-accent`, className)}>
        <CardHeader className={`px-6 pt-3 pb-1 `}>
          <CardTitle className={"flex items-center justify-between"}>
            <div className={"flex items-center justify-between gap-5 w-full"}>
              <h1 className={"text-4xl font-bold"}>
                {value ? value.toLocaleString() : 0}
              </h1>
              {variant === "finance" && (
                <h3 className={"text-xl font-bold text-inherit/50"}>EGP</h3>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className={`px-6 pt-0 pb-1 ${first && "z-30"}`}>
          <p className="text-xs capitalize">{title}</p>
        </CardContent>
        {description && (
          <CardFooter className={"text-sm text-accent/50 italic"}>
            {description}
          </CardFooter>
        )}
        {first && <div className={"dot-background"}></div>}
      </Card>

      {/*<div*/}
      {/*  className={cn(*/}
      {/*    "bg-white text-accent w-full h-full rounded-xl p-2 flex flex-col justify-between",*/}
      {/*    className,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  <h3 className="text-inherit text-sm capitalize">{title}</h3>*/}
      {/*  <div className="flex items-center justify-between w-full">*/}
      {/*    <h3 className="text-inherit font-bold text-2xl lg:text-4xl">*/}
      {/*      {value ? value.toLocaleString() : 0}*/}
      {/*    </h3>*/}
      {/*    {variant === "finance" && (*/}
      {/*      <span className="text-sm text-accent/50 flex w-full justify-end">*/}
      {/*        EGP*/}
      {/*      </span>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*  <p className="text-sm capitalize text-inherit/50">{description}</p>*/}
      {/*</div>*/}
    </div>
  );
}
