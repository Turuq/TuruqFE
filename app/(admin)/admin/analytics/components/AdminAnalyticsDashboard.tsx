import { AdminAnalyticsType } from "@/types/response";
import ClientAnalytics from "@/app/(admin)/admin/analytics/components/ClientAnalytics";
import OrderAnalytics from "@/app/(admin)/admin/analytics/components/OrderAnalytics";
import FinanceAnalytics from "@/app/(admin)/admin/analytics/components/FinanceAnalytics";

interface AdminAnalyticsDashboardProps {
  variant: "week" | "month" | "year";
  data: AdminAnalyticsType;
}

export default async function AdminAnalyticsDashboard({
  data,
  variant,
}: AdminAnalyticsDashboardProps) {
  return (
    <div className="flex flex-col gap-5 bg-white/50 rounded-xl p-5">
      <div className={"bg-white p-5 flex flex-col gap-5 rounded-xl"}>
        <h3 className="text-xl text-accent/50 font-bold uppercase">
          Client Analytics
        </h3>
        <ClientAnalytics data={data.clientAnalytics} />
      </div>
      <div className={"bg-white p-5 flex flex-col gap-5 rounded-xl"}>
        <h3 className="text-xl text-accent/50 font-bold uppercase">
          Order Analytics
        </h3>
        <OrderAnalytics data={data.orderAnalytics} />
      </div>
      <div className={"bg-white p-5 flex flex-col gap-5 rounded-xl"}>
        <FinanceAnalytics data={data.financeAnalytics} />
      </div>
    </div>
  );
}
