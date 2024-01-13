"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { BoxesIcon, LayoutDashboardIcon, WarehouseIcon } from "lucide-react";
import Link from "next/link";

export default function ClientFromAdminNavigation({
  clientId,
  companyName,
}: {
  clientId: string;
  companyName: string;
}) {
  return (
    <div>
      {clientId && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={`/admin/clients/${clientId}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} capitalize`}
                >
                  <LayoutDashboardIcon className="size-5 text-accent" />
                  {/* {`${companyName} Dashboard`} */}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href={`/admin/clients/${clientId}/orders`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} capitalize`}
                >
                  <BoxesIcon className="size-5 text-accent" />
                  {/* {`${companyName} Orders`} */}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href={`/admin/clients/${clientId}/inventory`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} capitalize`}
                >
                  <WarehouseIcon className="size-5 text-accent" />
                  {/* {`${companyName} Inventory`} */}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
}
