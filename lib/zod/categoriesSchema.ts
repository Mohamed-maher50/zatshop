import { z } from "zod";
export const categorySchema = z.object({
	name: z.string().min(2, "Category name is required").max(32),
});
export type categoryFormValues = z.infer<typeof categorySchema>;
