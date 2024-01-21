import { cookies } from "next/headers";
import AdminFinanceSection from "../../components/sections/AdminFinanceSection";

export default async function AdminFinancePage() {
  // const resGov = await fetch(`${process.env.API_URL}admin/getFees`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const dataGov = await resGov.json();
  //
  // const res = await fetch(`${process.env.API_URL}admin/home`, {
  //   method: "GET",
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const data = (await res.json()) as AdminDashboardResponseType;
  //
  // const orderRes = await fetch(`${process.env.API_URL}order`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const orderData = (await orderRes.json()) as AdminOrdersResponseType;
  //
  // const resShopify = await fetch(`${process.env.API_URL}order/shopifyOrders`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const dataShopify =
  //   (await resShopify.json()) as AdminShopifyOrdersResponseType;
  // const resZammit = await fetch(`${process.env.API_URL}order/zammitOrders`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const dataZammit = (await resZammit.json()) as AdminOrdersResponseType;

  const financeRes = await fetch(`${process.env.API_URL}finance/`, {
    headers: {
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const financeData = await financeRes.json();

  return (
    <div>
      <AdminFinanceSection
        finances={financeData.finances}
        // clients={data.clients}
        // orders={orderData.response}
        // shopifyOrders={dataShopify.response}
        // zammitOrders={dataZammit.response}
        // govFees={dataGov.governorates}
      />
    </div>
  );
}
