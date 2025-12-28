import z from "zod";
import { passwordConfirmValidation, passwordValidation } from "./sharedFields";

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    passwordConfirm: passwordConfirmValidation,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password confirmation does not match",
    path: ["passwordConfirm"],
  });
export type resetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
