import { z } from "zod";
export const subcategorySchema = z.object({
  name: z.string().min(2, "Subcategory name is required").max(32),
  category: z.string().min(1, "Please select a category"),
});
export type subcategoryFormValues = z.infer<typeof subcategorySchema>;
