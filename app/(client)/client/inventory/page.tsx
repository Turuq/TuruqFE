import { cookies } from "next/headers";
import ClientInventorySection from "../../components/sections/ClientInventorySection";
import { ClientType } from "@/types/client";
import { InventoryResponseType } from "@/types/response";
import InventoryTable from "../../components/tables/InventoryTable";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: Props) {
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

  // Client Inventory
  const inventoryRes = await fetch(
    `${process.env.API_URL}product/clientProducts/${clientId}`,
    {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    }
  );
  let inventoryData: InventoryResponseType | null = null;
  let noInventory: boolean = false;
  if (inventoryRes) {
    const inventoryJson = await inventoryRes.json();
    inventoryData = {
      clientInventory: inventoryJson.response,
      products: inventoryJson.products,
      client: inventoryJson.client,
    };
  } else {
    noInventory = true;
  }

  return (
    <div>
      <ClientInventorySection data={data.inventory} variant="inventory" />
      <div>
        {inventoryData && !noInventory ? (
          <InventoryTable inventory={inventoryData.clientInventory} />
        ) : (
          <h3>{"You Don't Have any Inventory"}</h3>
        )}
      </div>
    </div>
  );
}
