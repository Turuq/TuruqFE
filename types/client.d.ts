export type ClientType = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  companyLocation: string;
  servicesOffered: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  shopifyCode?: string;
};

export type OrderStatisticsType = {
  total: number;
  delivered: number;
  outForDelivery: number;
  pending: number;
  unreachable: number;
  postponed: number;
  cancelled: number;
  returned: number;
  collected: number;
  outOfStock: number;
};

export type InventoryStatisticsType = {
  totalInStock: number;
  totalOutOfStock: number;
};

export type FinanceStatisticsType = {
  collected: number;
  prepaid: number;
  storage: number;
  packaging: number;
  balance: number;
  shipping: number;
};

export type ClientInformationType = {
  client: ClientType;
  orders: OrderStatisticsType;
  inventory: InventoryStatisticsType;
  finance: FinanceStatisticsType;
};
