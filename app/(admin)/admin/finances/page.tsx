import {
  AdminDashboardResponseType,
  AdminOrdersResponseType,
  AdminShopifyOrdersResponseType,
} from "@/types/response";
import { cookies } from "next/headers";
import AdminFinanceSection from "../../components/sections/AdminFinanceSection";

export default async function AdminFinancePage() {
  const resGov = await fetch(`${process.env.API_URL}admin/getFees`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const dataGov = await resGov.json();

  const res = await fetch(`${process.env.API_URL}admin/home`, {
    method: "GET",
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const data = (await res.json()) as AdminDashboardResponseType;

  const orderRes = await fetch(`${process.env.API_URL}order`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const orderData = (await orderRes.json()) as AdminOrdersResponseType;

  const resShopify = await fetch(`${process.env.API_URL}order/shopifyOrders`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const dataShopify =
    (await resShopify.json()) as AdminShopifyOrdersResponseType;
  const resZammit = await fetch(`${process.env.API_URL}order/zammitOrders`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const dataZammit = (await resZammit.json()) as AdminOrdersResponseType;

  return (
    <div>
      <AdminFinanceSection
        finances={data.finance}
        clients={data.clients}
        orders={orderData.response}
        shopifyOrders={dataShopify.response}
        zammitOrders={dataZammit.response}
        govFees={dataGov.governorates}
      />
    </div>
  );
}
