import Link from "next/link";

import NewClientDialog from "../components/forms/NewClientDialog";
import AdminClientsCarousel from "../components/carousel/AdminClientsCarousel";
import { cookies } from "next/headers";
import { AdminDashboardResponseType } from "@/types/response";
import AdminOrdersSection from "../components/sections/AdminOrdersSection";
import AdminInventorySection from "../components/sections/AdminInventorySection";
import { ClientType } from "@/types/client";
import AdminFinancePage from "@/app/(admin)/admin/finances/page";
import { dashboardLinks } from "@/utils/dashboard-links";

export default async function Page() {
  const res = await fetch(`${process.env.API_URL}admin/home`, {
    method: "GET",
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const data = (await res.json()) as AdminDashboardResponseType;

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
          Clients
        </h1>
        <div className="flex items-center justify-end gap-5">
          <Link
            href={"/admin/clients"}
            className="bg-white hover:bg-accent hover:text-white p-2 rounded-lg w-40 text-sm text-accent"
          >
            <div className="flex items-center gap-3 w-full">
              <div className={"w-[10%]"}>{dashboardLinks["clients"]}</div>
              <div className={"w-full flex items-center justify-center"}>
                <span className="text-sm lg:text-inherit text-center">
                  Client Details
                </span>
              </div>
            </div>
          </Link>
          <NewClientDialog />
        </div>
      </div>
      {clientData && <AdminClientsCarousel clients={clientData} />}
      {data.orders && (
        <div className="col-span-12">
          <AdminOrdersSection
            orders={data.orders}
            title="orders"
            variant="dashboard"
          />
        </div>
      )}
      {data.inventory && (
        <div className="col-span-12">
          <AdminInventorySection inventory={data.inventory} />
        </div>
      )}
      <div className="col-span-12">
        <AdminFinancePage />
      </div>
      {/* {data.finance && clientData && (
        <div className="col-span-12">
          <AdminFinanceSection finances={data.finance} clients={clientData} />
        </div>
      )} */}
    </div>
  );
}
