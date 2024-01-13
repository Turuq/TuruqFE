import { ClientType } from "@/types/client";
import { cookies } from "next/headers";
import NewClientDialog from "../../components/forms/NewClientDialog";
import AdminClientSection from "../../components/sections/AdminClientSection";

export default async function page() {
  const clientRes = await fetch(`${process.env.API_URL}client`, {
    method: "GET",
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const clientData = (await clientRes.json()) as ClientType[];
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          clients list
        </h1>
        <div className="flex items-center justify-end gap-3">
          <NewClientDialog />
        </div>
      </div>
      <AdminClientSection data={clientData} />
    </div>
  );
}
