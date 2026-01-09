"use client";
// types/cart.ts
export interface CartItem {
  productId: string;
  variantSku: string;
  quantity: number;
}

export interface CartContextType {
  addItem: () => void;
  updateQuantity: (quantity: number) => void;
  quantity: number;
}
import { addCartItemAction } from "@/app/actions/cart";
import { Product, Variant } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const BayProductProvider = ({
  children,
  initialProduct,
  selectedVariant,
}: {
  initialProduct: Product;
  selectedVariant: Variant;
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<CartItem>({
    productId: initialProduct._id,
    variantSku: selectedVariant.sku,
    quantity: 1,
  });
  useEffect(() => {
    setProduct({
      productId: initialProduct._id,
      variantSku: selectedVariant.sku,
      quantity: 1,
    });
  }, [selectedVariant]);
  const addItem = async () => {
    const addRequest = addCartItemAction(product);

    toast.promise(addRequest, {
      loading: "تتم الاضافة",
      success: "تمت الاضافة",
      error: "حصل مشكلة",
    });
  };

  const updateQuantity = (quantity: number) =>
    setProduct((prev) => ({ ...prev, quantity }));

  const value = {
    addItem,
    updateQuantity,
    quantity: product.quantity || 1,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 5. Custom Hook for easy usage
export const useBayProduct = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
