import { profileSchema } from "@/components/settings/ProfileTab";
import api from "@/lib/axios";
import { updatePasswordSchema } from "@/schema/UpdatePasswordSchema";
import {
  Address,
  apiPaginatedResponse,
  apiResponse,
  Brand,
  User as UserType,
} from "@/types";
import { AxiosResponse } from "axios";
import z from "zod";

export const User = {
  getUserProfile: async () =>
    await api.get<null, AxiosResponse<apiPaginatedResponse<UserType>>>(
      `/users/getMe`
    ),
  updatePassword: async (data: z.infer<typeof updatePasswordSchema>) =>
    await api.put<null, AxiosResponse<apiPaginatedResponse<UserType>>>(
      `/users/changeMyPassword/`,
      data
    ),
  deleteAccount: async () =>
    await api.delete<null, AxiosResponse<apiPaginatedResponse<UserType>>>(
      `/users/deleteMe`
    ),

  updateProfile: async (data: z.infer<typeof profileSchema>) =>
    await api.put<null, AxiosResponse<apiResponse<UserType>>>(
      `/users/updateMe`,
      data
    ),

  updateAddress: async (data: Address) =>
    await api.put<null, AxiosResponse<apiResponse<Address>>>(
      `/addresses/${data._id}`,
      data
    ),
  newAddress: async (data: Omit<Address, "_id">) =>
    await api.post<null, AxiosResponse<apiResponse<Address>>>(
      `/addresses`,
      data
    ),
  getAddresses: async () =>
    await api.get<null, AxiosResponse<apiResponse<Address[]>>>(`/addresses`),
  deleteAddress: async (addressId: string) =>
    await api.delete<null, AxiosResponse<apiResponse<Address>>>(
      `/addresses/${addressId}`
    ),
};
