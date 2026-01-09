import z from "zod";
const imageSchema = z.object({
  url: z
    .string()
    .url("Image URL must be a valid URL")
    .regex(/\.(jpg|jpeg|png|gif|webp)$/i, "Image must be a valid image format"),
  id: z.string().optional(),
  alt: z.string().optional(),
});
export const imagesSchema = z.array(imageSchema);
const productVariantsSchema = z.object({
  attributes: z.record(z.string()),
  price: z.any().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a non-negative number",
  }),
  stock: z.any().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number",
  }),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string().optional(),
        id: z.string().optional(),
      })
    )
    .optional(),
});
const Option = z.object({
  name: z.string().min(1, "Option name is required"),
  values: z.array(z.string()).min(1, "At least one value is required"),
});
export type Option = z.infer<typeof Option>;

export const productSchema = z.object({
  title: z.string().min(3, "Product title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().min(1, "Please select a brand"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.array(z.string()).optional(),
  images: z.array(imageSchema).optional(),
  options: z
    .array(Option)
    .min(1, "At least one option is required")
    .superRefine((v, ctx) => {
      const names = v.map((item) => item.name);

      const duplicates = names.filter(
        (name, index) => names.indexOf(name) !== index
      );
      if (duplicates.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate option names",
          path: [duplicates.length, `name`],
        });
      }
    }),
  variants: z
    .array(productVariantsSchema)
    .min(1, "At least one variant is required"),
  imageCover: z.object({
    url: z.string().url(),
    id: z.string().optional(),
  }),
});
export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductVariants = z.infer<typeof productVariantsSchema>;
