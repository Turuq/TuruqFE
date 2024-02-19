import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecordsPerPageProps {
  label: string;
  ranges: number[];
  indicatorColor?: "bg-white text-accent" | "bg-accent text-white";
  limit: number;
  changeLimit: (limit: number) => void;
}

export default function RecordsPerPage({
  label,
  ranges,
  limit,
  changeLimit,
  indicatorColor = "bg-white text-accent",
}: RecordsPerPageProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-xs text-accent/50">
        {label} per page:{" "}
        <span className={`${indicatorColor} p-1 rounded-md`}>{limit}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {ranges.map((range) => (
          <DropdownMenuItem key={range} onClick={() => changeLimit(range)}>
            {range}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
