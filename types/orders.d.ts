import { Cart, CartItem, CartResponseItem } from "./carts";
import { Address, User } from "./Users";
export type OrderUser = {
  _id: string;
  name: string;
  email: string;
};
export type PaymentMethodType = "cash" | "card";
export type Order = {
  _id: string;
  publicId: string;
  subtotal: number;
  user: OrderUser;
  cartItems: CartResponseItem[];

  shippingAddress: Address;

  paymentMethodType: PaymentMethodType;

  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;

  isPaid: boolean;
  isDelivered: boolean;

  createdAt: string;
  updatedAt: string;
};
