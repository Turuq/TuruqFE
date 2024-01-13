"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { CourierType } from "@/types/response";
import { useRouter } from "next/navigation";

export default function CourierTableRow({
  courier,
  index,
}: {
  courier: CourierType;
  index: number;
}) {
  const router = useRouter();
  return (
    <TableRow
      className="odd:bg-accent/10 cursor-pointer"
      onClick={() => router.push(`/admin/courier/${courier._id.toString()}`)}
    >
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>{courier.name}</TableCell>
      <TableCell>{courier.phone}</TableCell>
    </TableRow>
  );
}
