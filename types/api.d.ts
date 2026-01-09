import { pagination } from ".";

export interface apiResponse<T> {
  data: T;
}
export interface apiPaginatedResponse<T> {
  results: number;
  data: T;
  paginationResult: pagination;
}
export interface apiError {
  status: string;
  message: string;
}
