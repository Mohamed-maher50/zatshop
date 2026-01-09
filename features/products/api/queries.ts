import { baseUrl } from "@/constants/api";
import { apiPaginatedResponse, apiResponse, Product } from "@/types";

export const Products = {
  findMany: async (query: string) => {
    const productsRes = await fetch(`${baseUrl}/products${query}`);
    const res: apiPaginatedResponse<Product[]> = await productsRes.json();
    return res;
  },
  findOne: async (id: string, query: string) => {
    const productsRes = await fetch(`${baseUrl}/products/${id}/${query}`);
    const res: apiResponse<Product> = await productsRes.json();
    return res;
  },
};
