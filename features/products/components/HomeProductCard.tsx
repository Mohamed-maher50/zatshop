import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const HomeProductCard = ({ product }: { product: Product }) => {
  product.priceAfterDiscount = 2000;
  product.price = 50;
  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0;
  return (
    <Card className="group grid relative ring-0  py-0 border-none outline-none hover:shadow-sm transition-all duration-300 ">
      {/* Image Container */}

      <Link
        className="absolute z-10 inset-0"
        href={`/products/${product._id}/${product.slug}`}
      >
        <span className="sr-only">See {product.title}</span>
      </Link>
      <div className="relative  overflow-hidden">
        <Image
          width={255}
          height={321}
          src={"/image.png"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 "
        />

        {/* Badges */}
        <div className="absolute row-auto top-3 left-3 flex flex-col gap-2">
          {true && (
            <Badge className=" text-white font-semibold shadow-lg">
              -{discountPercentage}%
            </Badge>
          )}
          {true && (
            <Badge className=" text-white font-medium shadow-lg flex items-center gap-1">
              <Truck size={14} />
              Free Ship
            </Badge>
          )}
        </div>

        {/* Stock Status */}
        {false && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Quick Add Button */}
        {product.TotalStock ||
          (true && (
            <Button
              aria-label={`available in Stock`}
              className="absolute bottom-3 right-3p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300  hover:scale-110"
            >
              <ShoppingBag size={20} className="" />
            </Button>
          ))}
      </div>

      {/* Content */}
      <CardContent className="p-4 grid  grid-rows-2">
        <div className="grid grid-rows-subgrid row-span-3">
          {/* Title */}
          <CardTitle>{product.title}</CardTitle>
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold  ">
              $
              {true
                ? product.priceAfterDiscount!.toFixed(2)
                : product.price.toFixed(2)}
            </span>
            {true && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          {/* Rating */}
          {product.ratingsAverage && product.ratingsAverage && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm text-gray-900">
                  {product.ratingsAverage.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({product.ratingsAverage.toLocaleString()})
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeProductCard;
