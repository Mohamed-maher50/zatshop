import { z } from "zod";
import { emailValidation } from "./sharedFields";

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export type forgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
