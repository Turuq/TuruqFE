import { FinanceStatisticsType } from "@/types/client";
import InformationCard from "../cards/InformationCard";

interface IFinancesProps {
  data: FinanceStatisticsType;
}

export default function ClientFinancesSection({ data }: IFinancesProps) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Finances
        </h1>
      </div>
      {/* Account Balance */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard
          title="Account Balance"
          value={data.balance}
          variant="finance"
        />
      </div>
      {/* Prepaid To Client */}
      <div className="col-span-12 lg:col-span-6">
        <InformationCard
          title="Prepaid To Client"
          value={data.prepaid}
          variant="finance"
        />
      </div>
      {/* Storage Services */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Storage Services"
          value={data.storage}
          variant="finance"
        />
      </div>
      {/* Packaging Services */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Packaging Services"
          value={data.packaging}
          variant="finance"
        />
      </div>
      {/* Collected */}
      <div className="col-span-12 lg:col-span-4">
        <InformationCard
          title="Collected"
          value={data.collected}
          variant="finance"
        />
      </div>
      {/* Shipping */}
      {/* <div className="col-span-12 lg:col-span-3">
        <InformationCard
          title="Shipping"
          value={data.shipping}
          variant="finance"
        />
      </div> */}
    </div>
  );
}
