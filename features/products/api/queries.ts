import { baseUrl } from "@/constants/api";
import api from "@/lib/axios";
import { apiPaginatedResponse, apiResponse, Product } from "@/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const Products = {
  findMany: async <T>(
    query: string,
    options?: AxiosRequestConfig<T> | undefined
  ) => {
    return await api.get<null, AxiosResponse<apiPaginatedResponse<Product[]>>>(
      `${baseUrl}/products${query}`,
      options
    );
  },
  findOne: async (id: string, query: string) => {
    const productsRes = await fetch(`${baseUrl}/products/${id}/${query}`);
    const res: apiResponse<Product> = await productsRes.json();
    return res;
  },
};
