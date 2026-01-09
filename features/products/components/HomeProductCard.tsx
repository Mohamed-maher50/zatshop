import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { arabicNumber } from "@/lib/arabicNumber";
import { Product } from "@/types";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const HomeProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group grid relative ring-0  py-0 border-none outline-none transition-all duration-300 ">
      {/* Image Container */}
      <div className=" absolute    pointer-events-none z-10  w-full top-0 h-auto">
        {/* Stock Status */}
        {!product.TotalStock && (
          <Badge
            variant={"destructive"}
            className="absolute right-1 top-6  font-bold "
          >
            غير متوفر الان
          </Badge>
        )}
        <div className="absolute  flex row-auto top-6 left-1  flex-col gap-2">
          {product.priceAfterDiscount && (
            <Badge className=" text-white font-semibold shadow-lg">
              -{product.priceAfterDiscount}%
            </Badge>
          )}
          {product.isFreeShipping && (
            <Badge className=" text-white  font-medium shadow-lg flex items-center gap-1">
              <Truck size={14} />
              Free Ship
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
      </div>
      {/* <Link
        className="absolute z-10 inset-0"
        href={`/products/${product._id}/${product.slug}`}
      >
        <span className="sr-only">See {product.title}</span>
      </Link> */}
      <div
        style={{ height: 321 }}
        className="relative  w-full  h-80.25 min-h-80.25 overflow-hidden"
      >
        <Image
          width={255}
          height={321}
          src={product.imageCover.url || "/image.png"}
          alt={product.title}
          placeholder="blur"
          blurDataURL="/image.png"
          className="h-full w-full object-cover inset-0 transition-transform duration-500 "
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 grid  grid-rows-2">
        <div className="grid grid-rows-subgrid row-span-3">
          {/* Title */}
          <CardTitle>{product.title}</CardTitle>
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold  ">
              {arabicNumber(product.variants[0].price, "price")}
            </span>
            {product.price && (
              <span className="text-sm text-gray-400 line-through">
                {arabicNumber(product.price, "price")}
              </span>
            )}
          </div>
          {/* Rating */}
          {product.ratingsAverage && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm text-gray-900">
                  {product.ratingsAverage.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.ratingsQuantity.toLocaleString()})
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <Link
        className="w-full block"
        href={`/products/${product._id}/${product.slug}`}
      >
        <Button variant={"outline"} className={"w-full"} size={"lg"}>
          الذهاب للاضافة
        </Button>
      </Link>
    </Card>
  );
};

export default HomeProductCard;
