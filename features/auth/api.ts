import api from "@/lib/axios";
import { LoginFormValues } from "@/lib/zod/authSchema";
import { forgotPasswordFormValues } from "@/schema/forgotPasswordSchema";
import { resetPasswordFormValues } from "@/schema/resetPasswordSchema";
import { verificationFormValues } from "@/schema/verificationSchema";
import { apiResponse, User } from "@/types";
import { AxiosResponse } from "axios";

interface LoginResponse extends apiResponse<User> {
  token: string;
}
export const Login = (data: LoginFormValues) =>
  api.post<null, AxiosResponse<LoginResponse>>(`/auth/login`, data);
export const ForgotPassword = (data: forgotPasswordFormValues) =>
  api.post<null, AxiosResponse<{ message: string }>>(
    "/auth/forgotPasswords",
    data
  );

export interface VerifyResetCodeResponse {
  message: string;
}

export const verifyResetCode = (
  data: verificationFormValues
): Promise<AxiosResponse<VerifyResetCodeResponse>> =>
  api.post("/auth/verifyResetCode", data);

export const resetPassword = (
  data: resetPasswordFormValues & { email: string }
): Promise<AxiosResponse<resetPasswordFormValues>> => {
  return api.put("/auth/resetPassword", data);
};
