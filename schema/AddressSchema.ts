import z from "zod";
export const addressSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "اسم العائلة مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  apartment: z.string().optional(),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  phone: z.string().min(11, "رقم الهاتف مطلوب"),
});
export type addressFormValues = z.infer<typeof addressSchema>;
