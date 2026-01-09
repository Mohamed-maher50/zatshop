import { z } from "zod";
export const brandSchema = z.object({
    name: z.string().min(2, "Category name is required").max(32),
    image: z.string().url(),
});
export type brandFormValues = z.infer<typeof brandSchema>;
