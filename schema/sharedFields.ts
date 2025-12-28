import z from "zod";

export const emailValidation = z
  .string({
    required_error: "We need your email address to create your account",
  })
  .min(1, "Email address cannot be empty")
  .email("Please enter a valid email address (e.g., you@example.com)")
  .max(255, "Email address is too long")
  .toLowerCase()
  .trim()
  .refine(
    (val) => !val.includes(".."),
    "Email address cannot contain consecutive dots"
  )
  .refine((val) => {
    const [local] = val.split("@");
    return local && local.length <= 64;
  }, "The part before @ is too long");

export const passwordConfirmValidation = z
  .string({
    required_error: "Please confirm your password",
  })
  .min(1, "Password confirmation cannot be empty");

export const passwordValidation = z
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
  .refine((val) => !/\s/.test(val), "Password cannot contain spaces");
