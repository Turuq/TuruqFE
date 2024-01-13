import { CourierResponseType } from "@/types/response";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourierTableRow from "../../components/CourierTableRow";
import NewCourierDialog from "../../components/forms/NewCourierDialog";

export default async function page() {
  const res = await fetch(`${process.env.API_URL}couriers`, {
    method: "GET",
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const data = (await res.json()) as CourierResponseType;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          courier list
        </h1>
        <NewCourierDialog />
      </div>
      <Table className="bg-white rounded-t-xl">
        <TableCaption>A list of available couriers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.response.map((courier, index) => (
            <CourierTableRow key={index} courier={courier} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
