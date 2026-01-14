import z from "zod";
import { addressSchema } from "./AddressSchema";
import { isValidObjectId } from "@/lib/isValidObjectId";
import { PAYMENT_METHODS } from "@/constants/Payments";

export const orderSchema = z.object({
  shippingAddress: addressSchema,
  cardId: z
    .string()
    .refine(isValidObjectId, "رقم العربة غير صحيح برجاء الابلاغ"),
  method: z.enum(PAYMENT_METHODS, { message: "برجاء اختيار طريقة الدفع" }),
});
export type createOrderFormValues = z.infer<typeof orderSchema>;
