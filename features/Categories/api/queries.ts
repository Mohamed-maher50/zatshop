import { baseUrl } from "@/constants/api";
import { apiPaginatedResponse, Category } from "@/types";

export const Categories = {
  findMany: async (query: string) => {
    const CategoriesRes = await fetch(`${baseUrl}/categories${query}`);
    const res: apiPaginatedResponse<Category[]> = await CategoriesRes.json();
    return res;
  },
};
