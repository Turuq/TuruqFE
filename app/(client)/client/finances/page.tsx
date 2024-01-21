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
  const financeRes = await fetch(`${process.env.API_URL}finance/${clientId}`, {
    headers: {
      Authorization: `${cookieStore.get("token")?.value}`,
    },
  });
  const financeData = await financeRes.json();
  return (
    <div>
      <ClientFinancesSection data={financeData.finance} />
      <div></div>
    </div>
  );
}
