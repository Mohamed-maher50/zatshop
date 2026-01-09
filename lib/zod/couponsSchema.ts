import { z } from "zod";

export const couponsSchema = z.object({
	name: z.string().min(2, "Coupon name is required").max(32),
	discount: z
		.number({ coerce: true })
		.min(1, { message: "Discount must be at least 1%" })
		.max(100, { message: "Discount cannot exceed 100%" }),
	expire: z.string(),
	active: z.boolean().optional().default(true),
});
export type couponFormValues = z.infer<typeof couponsSchema>;
