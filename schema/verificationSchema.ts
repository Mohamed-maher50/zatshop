import z from "zod";

export const verificationSchema = z.object({
  resetCode: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export type verificationFormValues = z.infer<typeof verificationSchema>;
