export type NewOrderParams = {
  customer: {
    name: string;
    phone: string;
    address: string;
    governorate: string;
  };
  products: ProductType[];
  notes: string;
  type: "promotional" | "turuq" | "refund" | "exchange";
  refundAmount?: number;
  priceDifference?: number;
  handledBy?: "brand" | "customer";
};
export type ProductType = {
  UID: string;
  quantity: number;
  price: number;
};
