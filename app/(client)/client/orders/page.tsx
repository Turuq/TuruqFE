import { cookies } from "next/headers";
import { ClientType } from "@/types/client";
import {
  OrderResponse,
  ShopifyOrderResponseType,
  ZammitOrderResponseType,
} from "@/types/response";
import ClientOrders from "@/app/(client)/client/orders/ClientOrders";

export default async function Page() {
  // TODO: CLEANER CODE -> SORRY FOR THE MESS!!
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
  let noOrders: boolean = false;
  if (orderRes.status === 200) {
    const orderJson = await orderRes.json();
    orderData = {
      orders: orderJson.response,
      orderStatistics: orderJson.orders,
      client: orderJson.client,
    };
  } else {
    noOrders = true;
  }

  // Shopify Orders
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
  let shopifyData: ShopifyOrderResponseType | null = null;
  let noShopifyOrders: boolean = false;
  if (shopifyRes.status === 200) {
    const shopifyJson = await shopifyRes.json();
    shopifyData = {
      shopifyOrders: shopifyJson.response,
      orderStatistics: shopifyJson.orders,
      client: shopifyJson.client,
    };
  } else {
    noShopifyOrders = true;
  }

  // Zammit Orders
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
  let zammitData: ZammitOrderResponseType | null = null;
  let noZammitOrders: boolean = false;
  if (zammitRes) {
    const zammitJson = await zammitRes.json();
    zammitData = {
      zammitOrders: zammitJson.response,
      orderStatistics: zammitJson.orders,
      client: zammitJson.client,
    };
  } else {
    noZammitOrders = true;
  }
  return (
    <div>
      <ClientOrders
        orderData={orderData}
        noOrders={noOrders}
        data={data}
        shopifyData={shopifyData}
        noShopifyOrders={noShopifyOrders}
        zammitData={zammitData}
        noZammitOrders={noZammitOrders}
      />
    </div>
  );
}
