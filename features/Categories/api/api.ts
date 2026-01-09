import { baseUrl } from "@/constants/api";
import api from "@/lib/axios";
import { apiPaginatedResponse, Category } from "@/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const Categories = {
  findMany: async <T>(
    query: string,
    options: AxiosRequestConfig<T> | undefined
  ) => {
    const res = await api.get<
      null,
      AxiosResponse<apiPaginatedResponse<Category>>
    >(`${baseUrl}/categories${query}`, options);
    return res;
  },
};
