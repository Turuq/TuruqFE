import { ClientType } from "@/types/client";
import ClientDashboard from "../components/ClientDashboard";

import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page() {
  const cookieStore = cookies();
  let client: ClientType;
  const cookieValue = cookieStore.get("client")?.value;
  if (!cookieValue) {
    throw new Error("Unauthorized");
  }
  client = JSON.parse(cookieValue) as ClientType;
  const clientId = client?._id;
  const res = await fetch(`${process.env.API_URL}client/home/${clientId}`, {
    next: { revalidate: 300 },
    headers: {
      Authorization: `${cookieStore.get("token")?.value}`,
    },
  });
  const data = await res.json();

  return (
    <div className="">
      <ClientDashboard data={data} />
    </div>
  );
}
