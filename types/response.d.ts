import { ClientType, OrderStatisticsType } from "./client";
import { ProductType as RegularProductType } from "./actions";

export type LoginResponseType = {
  error: any;
  type: "client" | "admin" | null;
};

export type NewOrderResponseType = {
  error: any;
  order: any;
};

export type OrderResponse = {
  orders: OrderType[];
  orderStatistics: OrderStatisticsType;
  client: ClientType;
};

export type ShopifyOrderResponseType = {
  shopifyOrders: ShopifyOrderType[];
  orderStatistics: OrderStatisticsType;
  client: ClientType;
};

export type ZammitOrderResponseType = {
  zammitOrders: ZammitOrderType[];
  orderStatistics: OrderStatisticsType;
  client: ClientType;
};

type ShopifyOrderType = {
  _id: string;
  id: string;
  customer: CustomerType;
  products: ProductType[];
  client: Pick<ClientType, "_id" | "companyName">;
  total: number;
  status:
    | "delivered"
    | "pending"
    | "cancelled"
    | "returned"
    | "collected"
    | "postponed"
    | "outForDelivery"
    | "unreachable"
    | "outOfStock";
  createdAt: string;
  updatedAt: string;
  courier?: CourierType;
  notes: string;
};

type ZammitOrderType = {
  _id: string;
  id: string;
  customer: Omit<CustomerType, "first_name" | "last_name"> & { name: string };
  products: ProductType[];
  client: Pick<ClientType, "_id" | "companyName">;
  itemsNum: number;
  total: number;
  date: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  courier?: string | null;
};

export type OrderType = {
  products: RegularProductType[];
} & Omit<ShopifyOrderType, "id" | "products">;

type CustomerType = {
  _id: string;
  name?: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  governorate: string;
};

type ProductType = {
  _id: string;
  id: string;
  name: string;
  price: number;
  discount: number;
  variant: string;
  variant_id: string;
  properties: string[];
  quantity: number;
  returned: boolean;
};

export type InventoryResponseType = {
  clientInventory: ClientInventoryType[];
  products: { totalOutOfStock: number; totalInStock: number };
  client: ClientType;
  lastUpdated?: string;
};

type ClientInventoryType = {
  _id: string;
  itemDescription: string;
  color: string;
  size: string;
  quantity: number;
  primaryClient: {
    _id: string;
    companyName: string;
  };
  collection?: string;
  storageRemarks?: string;
  UID: string;
  createdAt: string;
  updatedAt: string;
  delivered: number;
  collected: number;
  outForDelivery: number;
  pending: number;
  unreachable: number;
  postponed: number;
  cancelled: number;
  returned: number;
};

export type AdminDashboardResponseType = {
  clients: Pick<ClientType, "_id" | "companyName">[];
  orders: OrderStatisticsType;
  inventory: {
    totalInStock: number;
    totalOutOfStock: number;
  };
  finance: FinanceType;
};

type FinanceType = {
  collected: number;
  prepaid: number;
  storage: number;
  packaging: number;
  balance: number;
  shipping: number;
};

export type AdminOrdersResponseType = {
  response: AdminOrderType[];
  orders: OrderStatisticsType;
};

export type AdminShopifyOrdersResponseType = {
  response: ShopifyOrderType[];
  orders: OrderStatisticsType;
};
export type AdminOrderType = {
  _id: string;
  customer: {
    name: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    governorate: string;
    _id: string;
  };
  products: AdminProductType[];
  client: Pick<ClientType, "_id" | "companyName">;
  total: number;
  shippingFees: number;
  status:
    | "delivered"
    | "pending"
    | "cancelled"
    | "returned"
    | "collected"
    | "postponed"
    | "outForDelivery"
    | "unreachable"
    | "outOfStock";
  notes: string;
  courier: CourierType;
  createdAt: string;
  updatedAt: string;
};

type AdminProductType = {
  returned: boolean;
  _id: string;
  id?: string;
} & RegularProductType;

export type CourierResponseType = {
  response: CourierType[];
};

export type CourierType = {
  _id: string;
  name: string;
  phone: string;
};

export type AdminInventoryResponseType = {
  response: ClientInventoryType[];
  products: { totalOutOfStock: number; totalInStock: number };
  lastUpdated: string;
};

export type AdminType = {
  _id: string;
  name: string;
  email: string;
  super: boolean;
  picture: string;
};

export type OrderStatusType =
  | "delivered"
  | "pending"
  | "cancelled"
  | "outForDelivery"
  | "postponed"
  | "collected"
  | "unreachable"
  | "returned"
  | "outOfStock";

export type ProductDetailsType = {
  _id: string;
  itemDescription: string;
  color: string;
  size: string;
  quantity: number;
  primaryClient: string;
  UID: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationType = {
  _id: string;
  message: string;
  type: "outOfStock";
  clientId: string;
  orderId: OrderType;
  createdAt: string;
};

export type ProductSummaryType = {
  _id: string;
  itemDescription: string;
  quantity: number;
  UID: string;
  color: string;
  size: string;
};

export type AdminAnalyticsType = {
  clientAnalytics: ClientAnalyticsType;
  orderAnalytics: OrderAnalyticsType;
  financeAnalytics: FinanceAnalyticsType;
};
export type ClientAnalyticsType = {
  clients: number;
  newClients: number;
  clientsPerMonth: GroupCountType[];
  top5Clients: {
    all: {
      _id: string;
      orders: number;
      shopify: number;
      zammit: number;
      total: number;
    }[];
    orders: GroupCountType[];
    shopifyOrders: GroupCountType[];
    zammitOrders: GroupCountType[];
  };
  clientFinances: {
    shipping: {
      _id: string;
      client: {
        _id: string;
        companyName: string;
      };
      shipping: number;
    };
  };
};

export type OrderAnalyticsType = {
  orderStatistics: {
    _id: OrderStatusType;
    count: number;
  }[];
  shopifyOrderStatistics: {
    _id: OrderStatusType;
    count: number;
  }[];
  zammitOrderStatistics: {
    _id: OrderStatusType;
    count: number;
  }[];
  ordersByGovernorate: {
    _id: string;
    Orders: number;
  }[];
  shopifyOrdersByGovernorate: {
    _id: string;
    Orders: number;
  }[];
  zammitOrdersByGovernorate: {
    _id: string;
    Orders: number;
  }[];
};

export type FinanceAnalyticsType = {
  collectedBalance: {
    orders: number;
    shopify: number;
    zammit: number;
    perClient: {
      orders: FinancePerClientType[];
      shopify: FinancePerClientType[];
      zammit: FinancePerClientType[];
    };
  };
  accountBalance: {
    orders: number;
    shopify: number;
    zammit: number;
    perClient: {
      orders: FinancePerClientType[];
      shopify: FinancePerClientType[];
      zammit: FinancePerClientType[];
    };
  };
  shippingTotal: {
    orders: number;
    shopify: number;
    zammit: number;
    perClient: {
      orders: FinancePerClientType[];
      shopify: FinancePerClientType[];
      zammit: FinancePerClientType[];
    };
  };
  clientPerMonth?: {
    collected: CollectedPerMonthType[];
    account: AccountPerMonthType[];
    collectedShopify: CollectedPerMonthType[];
    accountShopify: AccountPerMonthType[];
    collectedZammit: CollectedPerMonthType[];
    accountZammit: AccountPerMonthType[];
  };
};

type GroupCountType = {
  _id: number;
  count: number;
};

type FinancePerClientType = {
  _id: string;
  total: number;
};

type CollectedPerMonthType = {
  _id: string;
  collectedBalancePerMonth: {
    [key: string]: number;
  };
};

type AccountPerMonthType = {
  _id: string;
  accountBalancePerMonth: {
    [key: string]: number;
  };
};

export type ShopifyInventoryResponse = {
  products: ShopifyInventoryType[];
};

export type ShopifyInventoryType = {
  id: string;
  title: string;
  variants: VariantType[];
};

export type VariantType = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  compare_at_price: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
};

export type MappedProductType = {
  UID: string;
  shopifyID: string;
  assignedBy: string;
  assignedAt: string;
  createdAt: string;
};

export type PopulatedMappedProductType = {
  UID: ProductDetailsType;
  shopifyID: string;
  assignedBy: string;
  assignedAt: string;
  createdAt: string;
};

export type CodesType = {
  clientCodes: {
    companyName: string;
    clientCode: string;
  }[];
  productCategories: {
    category: string;
    categoryCode: string;
  }[];
  sizeChart: {
    size: string;
    sizeCode: string;
  }[];
  colorCode: {
    color: string;
    colorCode: string;
  }[];
  superlativeCode: {
    superlative: string;
    superlativeCode: string;
  }[];
};
