import { cookies } from "next/headers";
import ClientAnalytics from "../../components/ClientAnalytics";
import { ClientType } from "@/types/client";
import { InventoryResponseType, OrderResponse } from "@/types/response";
import {
  getPast12Months,
  groupOrdersByPast12Months,
  revenuePerMonth,
} from "@/utils/analytics-functions";

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

  // Client Inventory
  const inventoryRes = await fetch(
    `${process.env.API_URL}product/clientProducts/${clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
  );
  let inventoryData: InventoryResponseType | null = null;
  if (inventoryRes) {
    const inventoryJson = await inventoryRes.json();
    inventoryData = {
      clientInventory: inventoryJson.response,
      products: inventoryJson.products,
      client: inventoryJson.client,
    };
  }

  // Client Orders
  const orderRes = await fetch(
    `${process.env.API_URL}order/clientOrders/${clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
  );
  let orderData: OrderResponse | null = null;
  if (orderRes.status === 200) {
    const orderJson = await orderRes.json();
    orderData = {
      orders: orderJson.response,
      orderStatistics: orderJson.orders,
      client: orderJson.client,
    };
  }
  return (
    <div>
      <ClientAnalytics
        orderStatistics={data.orders}
        orderData={orderData?.orders ?? []}
        inventory={inventoryData}
        finances={data.finance}
      />
    </div>
  );
}
