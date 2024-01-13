import { ChartBarIcon } from "@heroicons/react/16/solid";
import {
  BoxesIcon,
  DatabaseIcon,
  LayoutDashboardIcon,
  Shirt,
  TruckIcon,
  WarehouseIcon,
} from "lucide-react";

export const dashboardLinks: { [key: string]: JSX.Element } = {
  dashboard: <LayoutDashboardIcon className="size-4 text-inherit mr-3" />,
  orders: <BoxesIcon className="size-4 text-inherit mr-3" />,
  inventory: <WarehouseIcon className="size-4 text-inherit mr-3" />,
  finances: <DatabaseIcon className="size-4 text-inherit mr-3" />,
  courier: <TruckIcon className="size-4 text-inherit mr-3" />,
  clients: <Shirt className="size-4 text-inherit mr-3" />,
  analytics: <ChartBarIcon className="size-4 text-inherit mr-3" />,
};
