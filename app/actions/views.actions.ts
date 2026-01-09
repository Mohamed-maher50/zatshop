"use server";
import { Reviews } from "@/features/reviews/api/api";
import {
  reviewFormValues,
  updateReviewFormValues,
} from "@/schema/reviewSchema";
import { apiError } from "@/types";
import axios from "axios";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export const createReviewAction = async <T>(review: reviewFormValues) => {
  try {
    const res = await Reviews.createReview(review);
    revalidatePath(`/products/${review.productId}`);
    return { ok: true, data: res.data };
  } catch (error: unknown) {
    const response: { ok: boolean; error?: string } = { ok: false };
    if (axios.isAxiosError<apiError>(error)) {
      response.error = error?.response?.data.message || "تم التعليق من قبل";
    } else response.error = `فشل`;
    throw new Error(response.error);
  }
};
export const updateReviewAction = async <T>(
  reviewId: string,
  review: updateReviewFormValues
) => {
  try {
    const res = await Reviews.updateReview(reviewId, review);
    revalidateTag(`reviews-${review.productId}`, "max");
    return { ok: true, data: res.data };
  } catch (error: unknown) {
    const response: { ok: boolean; error?: string } = { ok: false };
    if (axios.isAxiosError<apiError>(error)) {
      response.error = error?.response?.data.message;
    } else response.error = `فشل`;
    throw new Error(response.error);
  }
};
