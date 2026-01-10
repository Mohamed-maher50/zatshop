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
          {/* <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
            {option.name}
          </span> */}
          <div className="flex gap-1 flex-wrap">
            {option.values.slice(0, 4).map((value) => (
              <div
                key={value}
                className="border border-border w-4 h-4 sm:w-5 sm:h-5 rounded-sm"
                style={{ backgroundColor: value }}
              />
            ))}
            {option.values.length > 4 && (
              <span className="text-[10px] text-muted-foreground self-center">
                +{option.values.length - 4}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={option.name} className="flex flex-col gap-1">
        <div className="flex flex-wrap gap-1">
          {option.values.slice(0, 3).map((value) => (
            <Badge
              key={value}
              variant="outline"
              className="text-[10px] sm:text-xs border px-1.5 py-0"
            >
              {value}
            </Badge>
          ))}
          {option.values.length > 3 && (
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs border px-1.5 py-0"
            >
              +{option.values.length - 3}
            </Badge>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card
      className="group h-full overflow-hidden max-sm:py-0 my-0! gap-0! border border-border/50 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card hover:shadow-sm"
      style={{ borderRadius: 0 }}
    >
      {/* Image Container - Responsive Height */}
      <div className="relative overflow-hidden bg-secondary/30">
        <div className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72">
          <Image
            fill
            src={product.imageCover.url || "/image.png"}
            alt={product.title}
            placeholder="blur"
            blurDataURL="/image.png"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {!product.TotalStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Badge
                variant="destructive"
                className="text-[10px] sm:text-xs font-medium"
              >
                غير متوفر
              </Badge>
            </div>
          )}

          {/* Badges - Responsive Positioning */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2">
            {product.priceAfterDiscount && (
              <Badge className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2">
                -{product.priceAfterDiscount}%
              </Badge>
            )}
            {product.isFreeShipping && (
              <Badge className="bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2">
                <Truck size={10} className="sm:hidden" />
                <Truck size={12} className="hidden sm:block" />
                Free
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col md:gap-3 sm:gap-3 p-2.5 sm:p-4">
        {/* Title - Responsive Font Size */}
        <h3 className="font-semibold text-foreground line-clamp-2 text-xs sm:text-sm leading-tight">
          {product.title}
        </h3>

        {/* Price - Responsive Sizing */}
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base font-bold text-foreground">
            {arabicNumber(product.variants[0].price, "price")}
          </span>
          {product.price && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
              {arabicNumber(product.price, "price")}
            </span>
          )}
        </div>

        {/* Rating - Responsive */}
        {product.ratingsAverage && (
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
            <div className="flex items-center gap-0.5">
              <Star
                size={12}
                className="fill-amber-400 text-amber-400 sm:hidden"
              />
              <Star
                size={14}
                className="fill-amber-400 text-amber-400 hidden sm:block"
              />
              <span className="font-semibold text-foreground">
                {product.ratingsAverage.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground">
              ({product.ratingsQuantity.toLocaleString()})
            </span>
          </div>
        )}

        {/* Options - Hide on smallest screens or show condensed */}
        {product.options && product.options.length > 0 && (
          <div className="flex flex-col gap-1.5 sm:gap-2 py-1.5 sm:py-2 border-t border-border/30 border-b border-border/30">
            {product.options
              .slice(0, 2)
              .map((option) => renderOptionDisplay(option))}
          </div>
        )}

        {/* Button - Responsive */}
        <Link
          href={`/products/${product._id}/${product.slug}`}
          className="w-full mt-auto"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 sm:mt-2 font-medium text-[10px] sm:text-xs bg-transparent hover:bg-primary/5 h-7 sm:h-8"
          >
            عرض المنتج
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default HomeProductCard;
