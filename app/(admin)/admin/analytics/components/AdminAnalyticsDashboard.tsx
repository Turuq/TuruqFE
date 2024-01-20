import ClientAnalytics from "@/app/(admin)/admin/analytics/components/ClientAnalytics";
import { ClientType } from "@/types/client";
import { getTop5Clients } from "@/utils/analytics-functions";
import { AdminOrderType, ShopifyOrderType } from "@/types/response";

interface AdminAnalyticsDashboardProps {
  clientData: ClientType[];
  clientPercentage: ClientType[];
  variant: "week" | "month" | "year";
  allOrders: (AdminOrderType | ShopifyOrderType)[];
}

export default async function AdminAnalyticsDashboard({
  clientData,
  clientPercentage,
  variant,
  allOrders,
}: AdminAnalyticsDashboardProps) {
  const top5Clients = getTop5Clients(allOrders, variant);
  const top5Labels = top5Clients.map((client) => client.client);
  const top5Values = top5Clients.map((client) => client.order);
  return (
    <div className="flex flex-col gap-5 bg-white/50 rounded-xl p-5">
      <h3 className="text-lg italic text-accent font-semibold">
        Client Analytics
      </h3>
      <ClientAnalytics
        clients={clientData}
        newClients={clientPercentage}
        variant={variant}
        top5Labels={top5Labels}
        top5Values={top5Values}
      />
    </div>
  );
}
