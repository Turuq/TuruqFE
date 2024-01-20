import AdminClientFinancesSection from "@/app/(admin)/components/sections/AdminClientFinanceSection";
import ClientInventorySection from "@/app/(client)/components/sections/ClientInventorySection";
import ClientOrdersSection from "@/app/(client)/components/sections/ClientOrdersSection";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: { clientId: string };
}) {
  const res = await fetch(
    `${process.env.API_URL}client/home/${params.clientId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const data = await res.json();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
      {/*<pre>*/}
      {/*  <code>{JSON.stringify(data.orders, null, 2)}</code>*/}
      {/*</pre>*/}
      <div className="col-span-1 lg:col-span-12 flex flex-col gap-10">
        {/* Orders */}
        <ClientOrdersSection
          data={data.orders}
          variant="admin"
          url={`/admin/clients/${params.clientId}/orders`}
        />
        {/* Inventory */}
        <ClientInventorySection
          data={data.inventory}
          variant="dashboard"
          isAdmin={true}
          url={`/admin/clients/${params.clientId}/inventory`}
          clientId={params.clientId}
          companyName={data.client.companyName}
        />
        {/* Finances */}
        <AdminClientFinancesSection
          data={data.finance}
          clientId={params.clientId}
        />
      </div>
    </div>
  );
}
