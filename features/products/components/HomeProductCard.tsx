"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { arabicNumber } from "@/lib/arabicNumber";
import type { Product, VariantOption } from "@/types";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeProductCard = ({ product }: { product: Product }) => {
  const renderOptionDisplay = (option: VariantOption) => {
    if (option.type === "color") {
      return (
        <div key={option.name} className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            {option.name}
          </span>
          <div className="flex gap-1">
            {option.values.map((value) => (
              <div
                key={value}
                className="border border-border w-5 h-5"
                style={{ backgroundColor: value }}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={option.name} className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground font-medium">
          {option.name}
        </span>
        <div className="flex flex-wrap gap-1">
          {option.values.map((value) => (
            <Badge key={value} variant="outline" className="text-xs border">
              {value}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card
      className="group h-full overflow-hidden   bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-sm"
      style={{ borderRadius: 0 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary/30">
        <div style={{ height: 280 }} className="relative w-full">
          <Image
            width={255}
            height={280}
            src={product.imageCover.url || "/image.png"}
            alt={product.title}
            placeholder="blur"
            blurDataURL="/image.png"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {!product.TotalStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Badge variant="destructive" className="text-xs font-medium">
                غير متوفر
              </Badge>
            </div>
          )}

          {/* Badges positioned cleanly */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.priceAfterDiscount && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
                -{product.priceAfterDiscount}%
              </Badge>
            )}
            {product.isFreeShipping && (
              <Badge className="bg-secondary text-secondary-foreground text-xs font-medium flex items-center gap-1">
                <Truck size={12} />
                Free
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-3 p-4">
        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-tight">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">
            {arabicNumber(product.variants[0].price, "price")}
          </span>
          {product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {arabicNumber(product.price, "price")}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.ratingsAverage && (
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-0.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">
                {product.ratingsAverage.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground" suppressHydrationWarning>
              ({product.ratingsQuantity.toLocaleString()})
            </span>
          </div>
        )}

        {product.options && product.options.length > 0 && (
          <div className="flex flex-col gap-2 py-2 border-t border-border/30 border-b border-border/30">
            {product.options.map((option) => renderOptionDisplay(option))}
          </div>
        )}

        <Link
          href={`/products/${product._id}/${product.slug}`}
          className="w-full"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 font-medium text-xs bg-transparent hover:bg-primary/5"
          >
            عرض المنتج
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HomeProductCard;
