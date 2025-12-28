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
  items: Array<CartItem>[];
  user: string;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}
