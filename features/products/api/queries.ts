import { baseUrl } from "@/constants/api";
import { apiPaginatedResponse, Product } from "@/types";

export const Products = {
  findMany: async (query: string) => {
    const productsRes = await fetch(`${baseUrl}/products${query}`);
    const res: apiPaginatedResponse<Product[]> = await productsRes.json();
    return res;
  },
};
