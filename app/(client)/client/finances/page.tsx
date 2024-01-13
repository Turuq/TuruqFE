import { cookies } from "next/headers";
import ClientFinancesSection from "../../components/sections/ClientFinancesSection";
import { ClientType } from "@/types/client";

export default async function Page() {
  const cookieStore = cookies();
  let client: ClientType;
  const cookieValue = cookieStore.get("client")?.value;
  if (!cookieValue) {
    throw new Error("Unauthorized");
  }
  client = JSON.parse(cookieValue) as ClientType;
  const clientId = client?._id;
  // TODO: Need an API endpoint for fetching the details of each individual tab
  const res = await fetch(`${process.env.API_URL}client/home/${clientId}`, {
    next: { revalidate: 300 },
    headers: {
      Authorization: `${cookieStore.get("token")?.value}`,
    },
  });
  const data = await res.json();
  return (
    <div>
      <ClientFinancesSection data={data.finance} />
      <div></div>
    </div>
  );
}
