import api from "@/lib/axios";
import { Product } from "@/types";
import { AxiosResponse } from "axios";

export const WishList = {
  get: async () => await api.get<AxiosResponse<Product[]>>("/wishlist"),

  add: async (productId: string) =>
    await api.post<AxiosResponse<string[]>>("/wishlist", {
      productId: productId,
    }),
  remove: async (productId: string) =>
    await api.delete<AxiosResponse<string[]>>(`/wishlist/${productId}`),
};
