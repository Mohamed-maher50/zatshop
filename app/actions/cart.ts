"use server";

import { AddToCart, cart } from "@/features/cart/api/api";
import { apiError } from "@/types";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export const addCartItemAction = async <T>(cartItem: AddToCart) => {
  try {
    const res = await cart.addToCart(cartItem, {});
    revalidatePath("/cart");
    return { ok: true, data: res.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError)
      return {
        ok: false,
        error: error.message,
      };

    return {
      ok: false,
      error: error,
    };
  }
};
export const updateQuantityAction = async ({
  quantity,
  sku,
}: {
  quantity: number;
  sku: string;
}) => {
  try {
    const res = await cart.updateQuantity({ sku, quantity });
    revalidatePath("/cart");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const applyCouponAction = async (couponName: string) => {
  try {
    const res = await cart.applyCoupon(couponName);
    revalidatePath("/cart");
    return { ok: true, data: res.data };
  } catch (error) {
    const response: { ok: boolean; error?: string } = { ok: false };
    if (axios.isAxiosError<apiError>(error))
      response.error = error?.response?.data.message;
    else response.error = `فشل`;
    throw new Error(response.error);
  }
};
export const deleteItemAction = async (sku: string) => {
  try {
    const res = await cart.deleteProduct(sku);
    revalidatePath("/cart");
    return { ok: true, data: res.data };
  } catch (error) {
    const response: { ok: boolean; error?: string } = { ok: false };
    if (axios.isAxiosError<apiError>(error))
      response.error = error?.response?.data.message;
    else response.error = `فشل`;
    throw new Error(response.error);
  }
};
export const refreshCart = async () => {
  try {
    revalidatePath("/cart");
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
