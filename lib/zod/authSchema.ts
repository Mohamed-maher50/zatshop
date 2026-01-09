import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional().default(false),
});
export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب") // لازم يكون مش فاضي
    .email("البريد الإلكتروني غير صالح"), // لازم يكون email صحيح
});
export type LoginFormValues = z.infer<typeof loginSchema>;
