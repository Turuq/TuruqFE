import { cookies } from "next/headers";
import { ClientType } from "@/types/client";
import MappingSection from "./MappingSection";

export default async function Page() {
  const clientsRes = await fetch(
    `${process.env.API_URL}productMapping/getClients`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const clients = (await clientsRes.json()) as ClientType[];
  return (
    <div className={"flex flex-col gap-5"}>
      <MappingSection clients={clients} />
    </div>
  );
}
