import { z } from "zod";
import { emailValidation, passwordConfirmValidation } from "./sharedFields";

const egyptianPhoneRegex = /^(\+20|0)?1[0125]\d{8}$/;

export const signupSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Please tell us your name",
      })
      .min(1, "Your name cannot be empty")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long. Please use fewer than 100 characters")
      .trim()
      .refine(
        (val) => val.split(" ").filter(Boolean).length >= 2,
        "Please enter your full name (first and last name)"
      )
      .refine(
        (val) => /^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(val),
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      ),

    email: emailValidation,

    password: z
      .string({
        required_error: "Please create a password to secure your account",
      })
      .min(1, "Password cannot be empty")
      .min(8, "Password must be at least 8 characters for security")
      .max(128, "Password is too long. Please use fewer than 128 characters")
      .refine(
        (val) => /[a-z]/.test(val),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (val) => /[A-Z]/.test(val),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "Password must contain at least one number"
      )
      .refine(
        (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
        "Password must contain at least one special character (!@#$%^&*...)"
      )
      .refine((val) => !/\s/.test(val), "Password cannot contain spaces"),

    passwordConfirm: passwordConfirmValidation,
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || egyptianPhoneRegex.test(val),
        "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)"
      )
      .refine((val) => {
        if (!val) return true;
        const cleaned = val.replace(/[\s\-()]/g, "");
        return cleaned.length >= 11 && cleaned.length <= 14;
      }, "Phone number length is invalid"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message:
      "Passwords don't match. Please make sure both passwords are identical",
    path: ["passwordConfirm"],
  })
  .refine(
    (data) => {
      // Check if password contains parts of email or name
      const emailLocal = data.email.split("@")[0].toLowerCase();
      const nameParts = data.fullName.toLowerCase().split(" ");
      const passwordLower = data.password.toLowerCase();

      return (
        !nameParts.some(
          (part) => part.length > 2 && passwordLower.includes(part)
        ) && !passwordLower.includes(emailLocal)
      );
    },
    {
      message:
        "Password should not contain your name or email for better security",
      path: ["password"],
    }
  );

export type SignupFormValues = z.infer<typeof signupSchema>;
