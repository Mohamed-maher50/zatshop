"use client";
// types/cart.ts
export interface CartItem extends Product {
  productId: string;
  quantity: number;
  selectedVariant?: Variant;
}

export interface CartContextType {
  addItem: () => void;
  updateQuantity: (quantity: number) => void;
  quantity: number;
  selectedVariant?: Variant;
  updateSelectedVariants: (selectedVariant: Variant) => void;
}
import { addCartItemAction } from "@/app/actions/cart";
import { findVariant } from "@/features/products/utils";
import { Product, Variant } from "@/types";
import { useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "sonner";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const BayProductProvider = ({
  children,
  initialProduct,
}: {
  initialProduct: Product;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<CartItem>({
    productId: initialProduct._id,
    quantity: 1,

    ...initialProduct,
  });
  useEffect(() => {
    const isVariantIdSelected = searchParams.get("variant") || undefined;
    const selectedVariant =
      findVariant(isVariantIdSelected, product.variants) || product.variants[0];

    setProduct({
      productId: initialProduct._id,
      quantity: 1,
      selectedVariant: selectedVariant,
      ...initialProduct,
    });
  }, []);
  const addItem = async () => {
    if (!product.selectedVariant)
      return toast.error("برجاء اختيار موصفات المنتج");
    const addRequest = addCartItemAction({
      quantity: product.quantity,
      productId: product._id,
      variantSku: product.selectedVariant.sku,
    });

    toast.promise(addRequest, {
      loading: "تتم الاضافة",
      success: "تمت الاضافة",
      error: "حصل مشكلة",
    });
  };

  const updateQuantity = (quantity: number) =>
    setProduct((prev) => ({ ...prev, quantity }));
  const updateSelectedVariants = (selectedVariant: Variant) =>
    setProduct((prev) => ({ ...prev, selectedVariant }));

  const value = {
    addItem,
    updateQuantity,
    quantity: product.quantity || 1,
    selectedVariant: product.selectedVariant,
    updateSelectedVariants,
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
