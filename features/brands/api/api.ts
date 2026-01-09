import api from "@/lib/axios";
import { apiPaginatedResponse, Brand } from "@/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const Brands = {
  findMany: async <T>(
    query: string,
    options?: AxiosRequestConfig<T> | undefined
  ) => {
    const res = await api.get<
      null,
      AxiosResponse<apiPaginatedResponse<Brand[]>>
    >(`/brands${query}`, options);
    return res;
  },
};
