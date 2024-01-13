import ClientOrdersSection from "./sections/ClientOrdersSection";
import ClientInventorySection from "./sections/ClientInventorySection";
import ClientFinancesSection from "./sections/ClientFinancesSection";
import {
  ClientType,
  FinanceStatisticsType,
  InventoryStatisticsType,
  OrderStatisticsType,
} from "@/types/client";

interface IDashboardProps {
  data: {
    client: ClientType;
    orders: OrderStatisticsType;
    inventory: InventoryStatisticsType;
    finance: FinanceStatisticsType;
  };
}

export default function ClientDashboard({ data }: IDashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
      <div className="col-span-1 lg:col-span-12 flex flex-col gap-10">
        {/* Orders */}
        <ClientOrdersSection data={data.orders} />
        {/* Inventory */}
        <ClientInventorySection data={data.inventory} />
        {/* Finances */}
        <ClientFinancesSection data={data.finance} />
        {/* Order Stats */}
      </div>
    </div>
  );
}
