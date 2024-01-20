import { cookies } from "next/headers";
import ClientAnalytics from "../../components/ClientAnalytics";
import { ClientType } from "@/types/client";
import {
  InventoryResponseType,
  OrderResponse,
  OrderType,
} from "@/types/response";

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
    },
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
    },
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
  // Client Shopify Orders
  const shopifyRes = await fetch(
    `${process.env.API_URL}order/clientShopifyOrders/${clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    },
  );
  let shopifyData: OrderResponse | null = null;
  if (shopifyRes.status === 200) {
    const orderJson = await shopifyRes.json();
    shopifyData = {
      orders: orderJson.response,
      orderStatistics: orderJson.orders,
      client: orderJson.client,
    };
  }
  // Client Zammit Orders
  const zammitRes = await fetch(
    `${process.env.API_URL}order/clientZammitOrders/${clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    },
  );
  let zammitData: OrderResponse | null = null;
  if (zammitRes.status === 200) {
    const orderJson = await zammitRes.json();
    zammitData = {
      orders: orderJson.response,
      orderStatistics: orderJson.orders,
      client: orderJson.client,
    };
  }
  let clientOrderData: OrderType[] = [];
  if (orderData?.orders) {
    clientOrderData = [...orderData?.orders];
  }
  if (shopifyData?.orders) {
    clientOrderData = [...clientOrderData, ...shopifyData?.orders];
  }
  if (zammitData?.orders) {
    clientOrderData = [...clientOrderData, ...zammitData?.orders];
  }

  return (
    <div>
      <ClientAnalytics
        orderStatistics={data.orders}
        orderData={clientOrderData ?? []}
        inventory={inventoryData}
        finances={data.finance}
      />
    </div>
  );
}
