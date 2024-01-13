export type NewOrderParams = {
  customer: {
    name: string;
    phone: string;
    address: string;
    governorate: string;
  };
  products: ProductType[];
  notes: string;
};
export type ProductType = {
  UID: string;
  quantity: number;
  price: number;
};
