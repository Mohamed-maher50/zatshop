// lib/axios.ts
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(config);
export const appApi: AxiosInstance = axios.create({
  baseURL: "/api",
});

// Request interceptor - ONLY runs on client side
api.interceptors.request.use(async (request) => {
  // Skip interceptor on server side
  if (typeof window === "undefined") {
    const s = await getServerSession(NextAuthOptions);
    const accessToken = s?.user.accessToken;

    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  }

  const session = await getSession();
  const accessToken = session?.user.accessToken;
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const isClient = typeof window !== "undefined";

    if (isClient && error.response?.status === 500) {
      toast.error("حصلت مشكلة في السيرفر، جرب مرة ثانية");
    }

    if (isClient && error.response?.status === 401) {
      // Redirect to login or signOut()
    }

    return Promise.reject(error);
  }
);

export default api;
