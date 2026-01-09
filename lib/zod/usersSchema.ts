import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(2, "Category name is required").max(32),
  email: z.string().email({ message: "email not correct" }),
  role: z.enum(["user", "admin", "manager"], {
    message: "invalid role option",
  }),
  phone: z.string().min(10, { message: "not valid number" }).optional(),
  isDeleted: z.boolean(),
});
export type userFormValues = z.infer<typeof userSchema>;
