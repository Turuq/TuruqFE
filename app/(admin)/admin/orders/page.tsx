import { Metadata } from "next";

import { cookies } from "next/headers";
import {
  AdminOrderType,
  AdminOrdersResponseType,
  AdminShopifyOrdersResponseType,
  CourierResponseType,
} from "@/types/response";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import AdminOrderTabSection from "../../components/sections/AdminOrderTabSection";
import { OrderColumns } from "../../components/tables/inventory/Columns";
import AdminShopifyTabSection from "../../components/sections/AdminShopifyTabSection";

export const metadata: Metadata = {
  title: "Turuq | Admin Orders",
};

export default async function page() {
  const res = await fetch(`${process.env.API_URL}order`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const data = (await res.json()) as AdminOrdersResponseType;

  // Shopify Orders
  const resShopify = await fetch(`${process.env.API_URL}order/shopifyOrders`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const dataShopify =
    (await resShopify.json()) as AdminShopifyOrdersResponseType;

  // Zammit Orders
  const resZammit = await fetch(`${process.env.API_URL}order/zammitOrders`, {
    next: { revalidate: 300 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const dataZammit = (await resZammit.json()) as AdminOrdersResponseType;

  const courierRes = await fetch(`${process.env.API_URL}couriers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
  const availableCouriers = (await courierRes.json()) as CourierResponseType;

  const tableData: OrderColumns[] = data.response.map((item, index) => {
    return {
      index: index + 1,
      numberItems: item.products.length,
      companyName: item.client.companyName,
      name: item.customer.name,
      address: item.customer.address,
      governorate: item.customer.governorate,
      phone: item.customer.phone,
      received: item.createdAt,
      status: item.status,
      courier: item.courier?.name ?? "Not Assigned",
    };
  });

  const shopifyTableData: OrderColumns[] = dataShopify.response.map(
    (item, index) => {
      return {
        index: index + 1,
        numberItems: item.products.length,
        companyName: item.client.companyName,
        name: `${item.customer.first_name} ${item.customer.last_name}`,
        address: item.customer.address,
        governorate: item.customer.governorate,
        phone: item.customer.phone,
        received: item.createdAt,
        status: item.status,
        courier: item.courier?.name ?? "Not Assigned",
      };
    }
  );

  const zammitTableData: OrderColumns[] = dataZammit.response.map(
    (item, index) => {
      return {
        index: index + 1,
        numberItems: item.products.length,
        companyName: item.client.companyName,
        name: item.customer.name,
        address: item.customer.address,
        governorate: item.customer.governorate,
        phone: item.customer.phone,
        received: item.createdAt,
        status: item.status,
        courier: item.courier?.name ?? "Not Assigned",
      };
    }
  );
  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="hidden lg:flex justify-start">
          <TabsTrigger value="orders">Orders</TabsTrigger>
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
              <TabsTrigger value="orders" className="w-44">
                Orders
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
        <TabsContent value="orders" className="">
          <AdminOrderTabSection
            title="orders"
            orders={data.orders}
            tableData={tableData}
            couriers={availableCouriers}
            variant="orders"
            orderData={data.response}
          />
        </TabsContent>
        <TabsContent value="shopify" className="">
          <AdminShopifyTabSection
            title="shopify orders"
            orders={dataShopify.orders}
            tableData={shopifyTableData}
            couriers={availableCouriers}
            variant="shopify"
            orderData={dataShopify.response}
          />
        </TabsContent>
        <TabsContent value="zammit" className="">
          <AdminOrderTabSection
            title="zammit orders"
            orders={dataZammit.orders}
            tableData={zammitTableData}
            couriers={availableCouriers}
            variant="zammit"
            orderData={dataZammit.response}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
