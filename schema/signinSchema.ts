import { z } from "zod";
import { emailValidation } from "./sharedFields";

export const signinSchema = z.object({
  email: emailValidation,
  password: z
    .string({
      required_error: "Please enter your password to continue",
    })
    .min(1, "Password cannot be empty")
    .min(6, "Your password should be at least 6 characters long")
    .max(128, "Password is too long. Please use fewer than 128 characters"),

  rememberMe: z
    .boolean({
      invalid_type_error: "Remember me must be a yes or no option",
    })
    .optional()
    .default(false),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
