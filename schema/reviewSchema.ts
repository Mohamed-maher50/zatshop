import z from "zod";

export const reviewSchema = z.object({
  review: z.string().min(5, "التقييم يجب ألا يقل عن 5 أحرف"),
  rating: z.number().min(1).max(5),
  productId: z.string(),
});

export type reviewFormValues = z.infer<typeof reviewSchema>;
const updateReviewSchema = reviewSchema
  .partial()
  .extend({ productId: z.string() });
export type updateReviewFormValues = z.infer<typeof updateReviewSchema>;
