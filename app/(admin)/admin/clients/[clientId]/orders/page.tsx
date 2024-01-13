import {
  OrderResponse,
  ShopifyOrderResponseType,
  ZammitOrderResponseType,
} from "@/types/response";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import ZammitOrdersTable from "@/app/(client)/components/tables/ZammitOrders.Table";
import ClientOrdersSection from "@/app/(client)/components/sections/ClientOrdersSection";
import ShopifyOrdersTable from "@/app/(client)/components/tables/ShopifyOrdersTable";
import OrdersTable from "@/app/(client)/components/tables/OrdersTable";
import AdminOrdersSection from "@/app/(admin)/components/sections/AdminOrdersSection";

export default async function page({
  params,
}: {
  params: { clientId: string };
}) {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.API_URL}client/home/${params.clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
  );
  const data = await res.json();

  // Client Orders
  const orderRes = await fetch(
    `${process.env.API_URL}order/clientOrders/${params.clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
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
    `${process.env.API_URL}order/clientShopifyOrders/${params.clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
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
    `${process.env.API_URL}order/clientZammitOrders/${params.clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
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
      <Tabs defaultValue="my-orders" className="w-full">
        <TabsList className="hidden lg:flex justify-start">
          <TabsTrigger value="my-orders">My Orders</TabsTrigger>
          <TabsTrigger value="shopify">Shopify Orders</TabsTrigger>
          <TabsTrigger value="zammit">Zammit Orders</TabsTrigger>
        </TabsList>
        <TabsList className="lg:hidden flex justify-start h-full">
          <Collapsible>
            <CollapsibleTrigger className="text-accent bg-white rounded-lg px-2 h-10 flex items-center gap-2 mb-2">
              <p>Choose Order Type</p>
              <ChevronUpDownIcon className="size-4 text-inherit" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
              <TabsTrigger value="my-orders" className="w-44">
                My Orders
              </TabsTrigger>
              <TabsTrigger value="shopify" className="w-44">
                Shopify Orders
              </TabsTrigger>
              <TabsTrigger value="zammit" className="w-44">
                Zammit Orders
              </TabsTrigger>
            </CollapsibleContent>
          </Collapsible>
        </TabsList>
        <TabsContent value="my-orders" className="w-full">
          {orderData && !noOrders && (
            <div className="flex flex-col gap-5">
              <AdminOrdersSection
                orders={data.orders}
                title="my orders"
                variant="orders"
              />
              {orderData?.orders?.length > 0 ? (
                <OrdersTable orders={orderData?.orders} />
              ) : (
                <></>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="shopify">
          {shopifyData && !noShopifyOrders ? (
            <div className="flex flex-col gap-5">
              <AdminOrdersSection
                orders={shopifyData.orderStatistics}
                title="shopify orders"
                variant="orders"
              />
              {shopifyData.shopifyOrders?.length > 0 ? (
                <ShopifyOrdersTable orders={shopifyData.shopifyOrders} />
              ) : (
                <h3>You Currently Have No Shopify Orders</h3>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5 justify-center">
              <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
                Shopify orders
              </h1>
              <h3 className="text-accent">
                Would you like to integrate your shopify store?{" "}
                <Link
                  href={"/client/guide"}
                  className="underline underline-offset-4"
                >
                  Check this link for a guide.
                </Link>
              </h3>
            </div>
          )}
        </TabsContent>
        <TabsContent value="zammit">
          {zammitData && !noZammitOrders ? (
            <div className="flex flex-col gap-5">
              {zammitData.orderStatistics && (
                <AdminOrdersSection
                  orders={zammitData.orderStatistics}
                  title="zammit orders"
                  variant="orders"
                />
              )}
              {zammitData.zammitOrders?.length > 0 ? (
                <ZammitOrdersTable orders={zammitData.zammitOrders} />
              ) : (
                <h3 className="flex items-center">
                  You Currently Have No Zammit Orders
                </h3>
              )}
            </div>
          ) : (
            <></>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
