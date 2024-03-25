"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { dashboardLinks } from "@/utils/dashboard-links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import ClientOrdersSection from "@/app/(client)/components/sections/ClientOrdersSection";
import OrdersTable from "@/app/(client)/components/tables/OrdersTable";
import ShopifyOrdersTable from "@/app/(client)/components/tables/ShopifyOrdersTable";
import Link from "next/link";
import ZammitOrdersTable from "@/app/(client)/components/tables/ZammitOrders.Table";
import {
  OrderResponse,
  ShopifyOrderResponseType,
  ZammitOrderResponseType,
} from "@/types/response";
import { useState } from "react";

export default function ClientOrders({
  orderData,
  noOrders,
  data,
  shopifyData,
  noShopifyOrders,
  zammitData,
  noZammitOrders,
}: {
  orderData: OrderResponse | null;
  noOrders: boolean;
  data: any;
  shopifyData: ShopifyOrderResponseType | null;
  noShopifyOrders: boolean;
  zammitData: ZammitOrderResponseType | null;
  noZammitOrders: boolean;
}) {
  const [selectedTab, setSelectedTab] = useState("turuq-orders");
  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value)}
      className="w-full"
    >
      {/*<h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">*/}
      {/*  {selectedTab === "turuq-orders"*/}
      {/*    ? "Turuq Orders"*/}
      {/*    : selectedTab === "shopify"*/}
      {/*      ? "Shopify Orders"*/}
      {/*      : "External Orders"}*/}
      {/*</h1>*/}
      <TabsList className="hidden lg:flex justify-start">
        <TabsTrigger
          value="turuq-orders"
          className={
            "bg-white rounded-xl drop-shadow-md border-none w-40 h-10 uppercase"
          }
        >
          Turuq
        </TabsTrigger>
        <TabsTrigger
          value="shopify"
          className={
            "bg-white data-[state=active]:bg-[#95bf47] rounded-xl drop-shadow-md border-none w-40 h-10 uppercase"
          }
        >
          Shopify
        </TabsTrigger>
        <TabsTrigger
          value="external"
          className={
            "bg-white rounded-xl drop-shadow-md border-none w-40 h-10 uppercase"
          }
        >
          External
        </TabsTrigger>
      </TabsList>
      <TabsList className="lg:hidden flex justify-start h-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/client">
                {dashboardLinks["dashboard"]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-xs lg:text-base">
                  Order Types
                  <ChevronDownIcon className={"size-3"} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <TabsTrigger value={"turuq-orders"}>
                      Turuq Orders
                    </TabsTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TabsTrigger value={"shopify"}>Shopify Orders</TabsTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TabsTrigger value={"external"}>
                      External Orders
                    </TabsTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbPage className={"text-xs text-accent/60"}>
              {selectedTab === "turuq-orders"
                ? "Turuq Orders"
                : selectedTab === "shopify"
                  ? "Shopify Orders"
                  : "External Orders"}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </TabsList>
      <TabsContent value="turuq-orders" className="w-full">
        {orderData && !noOrders && (
          <div className="flex flex-col gap-5">
            <ClientOrdersSection
              data={data.orders}
              title="turuq orders"
              variant="orders"
            />
            {orderData?.orders?.length > 0 ? (
              <OrdersTable orders={orderData?.orders} />
            ) : (
              <></>
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent value="shopify">
        {shopifyData && !noShopifyOrders ? (
          <div className="flex flex-col gap-5">
            <ClientOrdersSection
              data={shopifyData.orderStatistics}
              title="shopify orders"
              variant="shopify"
              isShopify={true}
            />
            {shopifyData.shopifyOrders?.length > 0 ? (
              <ShopifyOrdersTable orders={shopifyData.shopifyOrders} />
            ) : (
              <h3>You Currently Have No Shopify Orders</h3>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-accent/50 uppercase">
              Shopify orders
            </h1>
            <h3 className="text-accent">
              Would you like to integrate your shopify store?{" "}
              <Link
                href={"/client/guide"}
                className="underline underline-offset-4"
              >
                Check this link for a guide.
              </Link>
            </h3>
          </div>
        )}
      </TabsContent>
      <TabsContent value="external">
        {zammitData && !noZammitOrders ? (
          <div className="flex flex-col gap-5">
            {zammitData.orderStatistics && (
              <ClientOrdersSection
                data={zammitData.orderStatistics}
                title="external orders"
                variant="shopify"
              />
            )}
            {zammitData.zammitOrders?.length > 0 ? (
              <ZammitOrdersTable orders={zammitData.zammitOrders} />
            ) : (
              <h3 className="flex items-center">
                You Currently Have No Zammit Orders
              </h3>
            )}
          </div>
        ) : (
          <></>
        )}
      </TabsContent>
    </Tabs>
  );
}
