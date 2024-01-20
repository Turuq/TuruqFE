import { cookies } from "next/headers";
import AdminInventorySection from "../../components/sections/AdminInventorySection";
import { AdminInventoryResponseType } from "@/types/response";
import {
  adminInventoryColumns,
  InventoryColumns,
} from "../../components/tables/inventory/Columns";
import { AdminInventoryTable } from "../../components/tables/data-tables/AdminInventoryTable";
import axios from "axios";
import moment from "moment";

export default async function page() {
  const res = await axios.get(`${process.env.API_URL}product`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const data = (await res.data) as AdminInventoryResponseType;
  const tableData: InventoryColumns[] = data.response.map((item, index) => {
    return {
      index: index + 1,
      UID: item.UID,
      itemDescription: item.itemDescription,
      size: item.size,
      color: item.color,
      collection: item.collection,
      quantity: item.quantity,
      companyName: item.primaryClient.companyName,
      storageRemarks: item.storageRemarks,
    };
  });
  return (
    <div className="flex flex-col gap-5">
      <AdminInventorySection inventory={data.products} variant="inventory" />
      <p className="text-xs text-accent font-semibold italic">
        last updated:{" "}
        {moment(data.lastUpdated).format("ddd DD, MMM YYYY | hh:mm A")}
      </p>
      <AdminInventoryTable
        columns={adminInventoryColumns}
        data={tableData}
        inventory={data.response}
      />
    </div>
  );
}
