import api from "@/lib/axios";
import { CartItem } from "@/providers/BayProductProvider";
import { addressFormValues } from "@/schema/AddressSchema";
import { Address, apiPaginatedResponse } from "@/types";
import { CartResponse } from "@/types/carts";
import { Order } from "@/types/orders";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
export interface apiError extends AxiosError {
  message: string;
}
export const Orders = {
  createCashOrder: async <T>(
    data: { cartId: string; shippingAddress: addressFormValues },
    axiosOptions?: AxiosRequestConfig
  ) => {
    const res = await api.post<
      CartItem,
      AxiosResponse<apiPaginatedResponse<CartItem>>
    >(`/orders/${data.cartId}`, data, axiosOptions);
    return res;
  },
  getAll: async (query: string, axiosOptions?: AxiosRequestConfig) => {
    const res = await api.get<AxiosResponse<Order[]>>(
      `/orders${query}`,
      axiosOptions
    );
    return res;
  },
  updateQuantity: async ({
    axiosOptions,
    quantity,
    sku,
  }: {
    quantity: number;
    axiosOptions?: AxiosRequestConfig;
    sku: string;
  }) => {
    const res = await api.put<CartItem, AxiosResponse<CartResponse>>(
      `/cart/${sku}`,
      { quantity },
      axiosOptions
    );
    return res;
  },
  applyCoupon: async (
    couponName: string,
    axiosOptions?: AxiosRequestConfig
  ) => {
    const res = await api.put<CartItem, AxiosResponse<CartResponse>>(
      `/cart/applyCoupon`,
      { couponName },
      axiosOptions
    );
    return res;
  },
  deleteProduct: async (sku: string, axiosOptions?: AxiosRequestConfig) => {
    const res = await api.delete<CartItem, AxiosResponse<CartResponse>>(
      `/cart/${sku}`,
      axiosOptions
    );
    return res;
  },
};
