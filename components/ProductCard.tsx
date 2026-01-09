"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Plus, Minus } from "lucide-react";
import { Product, VariantOption, Variant } from "@/types";
import { Button } from "./ui/button";

interface VariantOptionInputProps {
  option: VariantOption;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function VariantOptionInput({
  option,
  value,
  onChange,
  disabled,
}: VariantOptionInputProps) {
  if (option.type === "color") {
    return (
      <div className="flex gap-2">
        {option.values.map((color) => (
          <button
            key={color}
            type="button"
            disabled={disabled}
            onClick={() => onChange(color)}
            title={color}
            className={`
              w-8 h-8  border-2 transition-all duration-200
              ${
                value === color
                  ? "border-foreground scale-105"
                  : "border-border hover:border-foreground/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    );
  }

  // text (Size, Weight, Shape, ...)
  return (
    <div className="grid grid-cols-4 gap-2">
      {option.values.map((val) => (
        <button
          key={val}
          type="button"
          disabled={disabled}
          onClick={() => onChange(val)}
          className={`
            py-2 text-xs font-medium border transition-all duration-200
            ${
              value === val
                ? "border-foreground bg-foreground text-card"
                : "border-border hover:border-foreground/50"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {val}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------
   Product Card
-------------------------------------------------- */

interface ProductCardProps {
  product: Product;
  onAddToCart?: (variant: Variant, quantity: number) => void;
  disabled?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  disabled = false,
}: ProductCardProps) {
  console.log(product.options);
  /* ---------------- State ---------------- */

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product.imageCover.url
  );

  /* ---------------- Variant Matching ---------------- */

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => variant.attributes[key] === value
      )
    );
  }, [product.variants, selectedAttributes]);

  const inStock = selectedVariant
    ? selectedVariant.stock > 0
    : product.TotalStock > 0;

  /* ---------------- Handlers ---------------- */

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedVariant || disabled || !inStock) return;
    onAddToCart?.(selectedVariant, quantity);
    setQuantity(1);
  };

  return (
    <div className="group w-full h-full flex flex-col bg-card border border-border overflow-hidden hover:border-foreground/30 transition-all">
      {/* Image */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover animate-in fade-in zoom-in transition-transform duration-500 group-hover:scale-105"
        />

        {!inStock && (
          <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
            <span className="text-sm font-semibold">Out of Stock</span>
          </div>
        )}

        <button className="absolute top-4 right-4 p-2 bg-card/80 border border-border">
          <Heart size={18} />
        </button>

        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {product.images.map((img) => (
              <button
                key={img.url}
                onClick={() => setSelectedImage(img.url)}
                className="w-10 h-10 border border-border overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={img.alt || product.title}
                  width={40}
                  height={40}
                  className="object-cover animate-in fade-in zoom-in"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-4">
        {/* Title & Price */}
        <div>
          <h3 className="text-sm font-medium">{product.title}</h3>
          <p className="text-sm font-semibold mt-1">
            ${selectedVariant?.price ?? product.price}
          </p>
        </div>

        {/* Options */}
        {product.options.map((option) => (
          <div key={option.name} className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-foreground/70">
              {option.name}
            </label>

            <VariantOptionInput
              option={option}
              value={selectedAttributes[option.name]}
              onChange={(value) => handleOptionChange(option.name, value)}
              disabled={disabled || !inStock}
            />
          </div>
        ))}

        {/* Quantity + Add */}
        <div className="mt-auto pt-3 border-t border-border flex gap-2">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity === 1}
              className="p-1"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              disabled={!inStock}
              className="p-1"
            >
              <Plus size={16} />
            </button>
          </div>

          <Button
            size={"xs"}
            onClick={handleAddToCart}
            disabled={!selectedVariant || !inStock || disabled}
            className="flex-1 bg-foreground text-card text-sm font-semibold transition-all disabled:opacity-50"
          >
            اضافة للسلة
          </Button>
        </div>
      </div>
    </div>
  );
}
