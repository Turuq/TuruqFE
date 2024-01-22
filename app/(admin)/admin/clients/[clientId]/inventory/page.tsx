import { AdminInventoryTable } from "@/app/(admin)/components/tables/data-tables/AdminInventoryTable";
import {
  adminInventoryColumns,
  InventoryColumns,
} from "@/app/(admin)/components/tables/inventory/Columns";
import ClientInventorySection from "@/app/(client)/components/sections/ClientInventorySection";
import { InventoryResponseType } from "@/types/response";
import moment from "moment";
import { cookies } from "next/headers";

export default async function page({
  params,
}: {
  params: { clientId: string };
}) {
  // Client Inventory
  const inventoryRes = await fetch(
    `${process.env.API_URL}product/clientProducts/${params.clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  let inventoryData: InventoryResponseType | null = null;
  let noInventory: boolean = false;
  if (inventoryRes) {
    const inventoryJson = await inventoryRes.json();
    inventoryData = {
      clientInventory: inventoryJson.response,
      products: inventoryJson.products,
      client: inventoryJson.client,
      lastUpdated: inventoryJson.lastUpdated,
    };
  } else {
    noInventory = true;
  }

  const tableData: InventoryColumns[] | undefined =
    inventoryData?.clientInventory.map((item, index) => {
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
    <div>
      {inventoryData && !noInventory && (
        <div className="flex flex-col gap-5">
          <ClientInventorySection
            data={inventoryData.products}
            variant="inventory"
            isAdmin={true}
          />
          <AdminInventoryTable
            inventory={inventoryData.clientInventory}
            columns={adminInventoryColumns}
            data={tableData ?? []}
          />
          <p className="text-sm lg:text-base text-accent font-semibold italic">
            {inventoryData.lastUpdated
              ? `Last Updated On: ${moment(inventoryData.lastUpdated).format(
                  "MMMM Do YYYY, h:mm:ss a",
                )}`
              : ""}
          </p>
        </div>
      )}
    </div>
  );
}
