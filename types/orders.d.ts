import { Cart, CartItem } from "./carts";
import { User } from "./Users";

export interface Order {
  _id: "694cf08bf89ca9d3049ee1a8";
  user: Pick<User, "_id" | "name" | "email">;
  cartItems: Array<CartItem>;
  taxPrice: 0;
  shippingPrice: 0;
  totalOrderPrice: 100;
  paymentMethodType: "cash" | "card";
  isPaid: false;
  paidAt?: string;
  isDelivered: false;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  publicId: string;
}
