import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAnalyticsType } from "@/types/response";
import AdminAnalyticsDashboard from "@/app/(admin)/admin/analytics/components/AdminAnalyticsDashboard";

export default async function page() {
  // const clientRes = await fetch(`${process.env.API_URL}client`, {
  //   method: "GET",
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const clientData = (await clientRes.json()) as ClientType[];
  // const clientsThisMonth = getNewMonthlyClients(clientData);
  // const clientsThisYear = getNewYearlyClients(clientData);
  // const clientsThisWeek = getNewWeeklyClients(clientData);
  //
  // // Client Orders
  // const orderRes = await fetch(`${process.env.API_URL}order`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const orderData = (await orderRes.json()) as AdminOrdersResponseType;
  //
  // // Shopify Orders
  // const resShopify = await fetch(`${process.env.API_URL}order/shopifyOrders`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const dataShopify =
  //   (await resShopify.json()) as AdminShopifyOrdersResponseType;
  //
  // // Zammit Orders
  // const resZammit = await fetch(`${process.env.API_URL}order/zammitOrders`, {
  //   next: { revalidate: 300 },
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `${cookies().get("token")?.value}`,
  //   },
  // });
  // const dataZammit = (await resZammit.json()) as AdminOrdersResponseType;
  //
  // let allOrders: (AdminOrderType | ShopifyOrderType)[] = [];
  // if (orderData) {
  //   allOrders = [...allOrders, ...orderData.response];
  // }
  // if (dataShopify) {
  //   allOrders = [...allOrders, ...dataShopify.response];
  // }
  // if (dataZammit) {
  //   allOrders = [...allOrders, ...dataZammit.response];
  // }

  const analyticsRes = await fetch(
    `${process.env.API_URL}analytics/admin/month`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  const analyticsData = (await analyticsRes.json()) as AdminAnalyticsType;

  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="month" className="w-full">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center items-start justify-between">
          <h3 className="text-4xl text-accent/50 font-bold uppercase">
            analytics
          </h3>
          <TabsList className={"bg-transparent gap-2"}>
            <TabsTrigger
              className={
                "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
              }
              value="week"
            >
              week
            </TabsTrigger>
            <TabsTrigger
              className={
                "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
              }
              value="month"
            >
              month
            </TabsTrigger>
            <TabsTrigger
              className={
                "w-20 h-10 rounded-md bg-white border-none text-xs font-semibold capitalize"
              }
              value="year"
            >
              year
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="week">
          <AdminAnalyticsDashboard data={analyticsData} variant={"week"} />
        </TabsContent>
        <TabsContent value="month">
          <AdminAnalyticsDashboard data={analyticsData} variant={"month"} />
        </TabsContent>
        <TabsContent value="year">
          {/*<AdminAnalyticsDashboard*/}
          {/*  clientData={clientData}*/}
          {/*  clientPercentage={clientsThisYear}*/}
          {/*  variant={"year"}*/}
          {/*  allOrders={allOrders}*/}
          {/*/>*/}
        </TabsContent>
      </Tabs>
    </div>
  );
}
