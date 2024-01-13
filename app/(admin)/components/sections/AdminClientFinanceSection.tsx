"use client";

import EditableInformationCard from "@/app/(client)/components/cards/EditableInformationCard";
import InformationCard from "@/app/(client)/components/cards/InformationCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateClientFinancesAction } from "@/lib/actions";
import { FinanceStatisticsType } from "@/types/client";
import { PencilIcon, XIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface IFinancesProps {
  data: FinanceStatisticsType;
  clientId: string;
}

export default function AdminClientFinancesSection({
  data,
  clientId,
}: IFinancesProps) {
  const { toast } = useToast();
  const [storageValue, setStorageValue] = useState(data.storage);
  const [packagingValue, setPackagingValue] = useState(data.packaging);
  const [prepaidValue, setPrepaidValue] = useState(data.prepaid);
  const [showEdit, setShowEdit] = useState(false);
  const [updating, setUpdating] = useState(false);

  function handleStorageChange(e: ChangeEvent<HTMLInputElement>) {
    setStorageValue(parseInt(e.target.value));
  }
  function handlePackagingChange(e: ChangeEvent<HTMLInputElement>) {
    setPackagingValue(parseInt(e.target.value));
  }
  function handlePrepaidChange(e: ChangeEvent<HTMLInputElement>) {
    setPrepaidValue(parseInt(e.target.value));
  }

  async function handleUpdateFinances() {
    setUpdating(true);
    // TODO: send shipping balance when implemented
    // @ts-ignore
    const newFinances: FinanceStatisticsType = {
      ...data,
      storage: storageValue,
      packaging: packagingValue,
      prepaid: prepaidValue,
    };
    const { error, data: Response } = await updateClientFinancesAction({
      data: newFinances,
      clientId,
    });
    if (error) {
      toast({
        title: "Failed to update finances",
        description: error,
        variant: "destructive",
      });
    }
    setShowEdit(false);
    setUpdating(false);
  }
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 flex lg:flex-row flex-col lg:items-center justify-between gap-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
          Finances
        </h1>
        <div className="flex items-center gap-1">
          {showEdit && (
            <Button
              variant={"outline"}
              className="rounded-xl text-accent h-10"
              disabled={
                (storageValue === data.storage &&
                  packagingValue === data.packaging &&
                  prepaidValue === data.prepaid) ||
                updating
              }
              onClick={handleUpdateFinances}
            >
              Save Changes
            </Button>
          )}
          <Button
            variant={"ghost"}
            className="w-auto h-10 rounded-xl"
            onClick={() => setShowEdit((oldValue) => !oldValue)}
          >
            {!showEdit ? (
              <PencilIcon className="size-4 text-accent" />
            ) : (
              <XIcon className="size-4 text-accent" />
            )}
          </Button>
        </div>
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
        {!showEdit ? (
          <InformationCard
            title="Prepaid To Client"
            value={data.prepaid}
            variant="finance"
          />
        ) : (
          <EditableInformationCard
            title="Prepaid To Client"
            value={data.prepaid}
            variant="finance"
            onChange={handlePrepaidChange}
          />
        )}
      </div>
      {/* Storage Services */}
      <div className="col-span-12 lg:col-span-3">
        {!showEdit ? (
          <InformationCard
            title="Storage Services"
            value={data.storage}
            variant="finance"
          />
        ) : (
          <EditableInformationCard
            title="Storage Services"
            value={data.storage}
            variant="finance"
            onChange={handleStorageChange}
          />
        )}
      </div>
      {/* Packaging Services */}
      <div className="col-span-12 lg:col-span-3">
        {!showEdit ? (
          <InformationCard
            title="Packaging Services"
            value={data.packaging}
            variant="finance"
          />
        ) : (
          <EditableInformationCard
            title="Packaging Services"
            value={data.packaging}
            variant="finance"
            onChange={handlePackagingChange}
          />
        )}
      </div>
      {/* Collected */}
      <div className="col-span-12 lg:col-span-3">
        <InformationCard
          title="Collected"
          value={data.collected}
          variant="finance"
        />
      </div>
      {/* Shipping */}
      <div className="col-span-12 lg:col-span-3">
        <InformationCard
          title="Shipping"
          value={data.shipping}
          variant="finance"
        />
      </div>
    </div>
  );
}
