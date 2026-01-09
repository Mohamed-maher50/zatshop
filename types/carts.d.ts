import { Product } from "./Product";
export interface CartItem {
  product: Product;
  variantSku: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
export interface Cart {
  _id: string;
  items: Array<CartResponseItem>;
  user: string;
  subtotal: 3898;
  createdAt: string;
  updatedAt: string;
  totalPriceAfterDiscount: number;
  coupon?: string;
  couponValue?: number;
}
export interface CartResponseItem {
  variant: {
    sku: string;
    attributes: Record<string, string>;
  };
  title: string;
  product: string;
  variantSku: string;
  image: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}
export interface CartResponse {
  status: "success";
  numOfCartItems: number;
  data: Cart;
}
