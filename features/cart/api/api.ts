import { applyCouponAction } from "@/app/actions/cart";
import api from "@/lib/axios";
import { CartItem } from "@/providers/BayProductProvider";
import { apiPaginatedResponse, apiResponse } from "@/types";
import { CartResponse } from "@/types/carts";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
export interface apiError extends AxiosError {
  message: string;
}
export const cart = {
  addToCart: async <T>(data: CartItem, axiosOptions: AxiosRequestConfig) => {
    const res = await api.post<
      CartItem,
      AxiosResponse<apiPaginatedResponse<CartItem>>
    >(`/cart`, data, axiosOptions);
    return res;
  },
  get: async (query: string, axiosOptions: AxiosRequestConfig) => {
    const res = await api.get<CartItem, AxiosResponse<CartResponse>>(
      `/cart${query}`,
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
