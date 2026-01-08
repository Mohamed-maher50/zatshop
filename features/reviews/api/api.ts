import { baseUrl } from "@/constants/api";
import api from "@/lib/axios";
import {
  reviewFormValues,
  updateReviewFormValues,
} from "@/schema/reviewSchema";
import { apiPaginatedResponse, apiResponse } from "@/types";
import { Review } from "@/types/reviews";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const Reviews = {
  findMany: async <T>(
    query: string,
    options?: AxiosRequestConfig<T> | undefined
  ) => {
    const res = await api.get<
      null,
      AxiosResponse<apiPaginatedResponse<Review[]>>
    >(`${baseUrl}/reviews${query}`, options);
    return res;
  },
  createReview: async <T>(
    data: reviewFormValues,
    options?: AxiosRequestConfig<T> | undefined
  ) => {
    const res = await api.post<null, AxiosResponse<apiResponse<Review>>>(
      `${baseUrl}/reviews`,
      data,
      options
    );
    return res;
  },
  updateReview: async <T>(
    reviewId: string,
    data: updateReviewFormValues,
    options?: AxiosRequestConfig<T> | undefined
  ) => {
    const res = await api.put<null, AxiosResponse<apiResponse<Review>>>(
      `${baseUrl}/reviews/${reviewId}`,
      data,
      options
    );
    return res;
  },
  deleteReview: async (reviewId: string) =>
    await api.delete<null, AxiosResponse<apiResponse<Review>>>(
      `/reviews/${reviewId}`
    ),
};
