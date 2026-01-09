"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types";
import Link from "next/link";

interface CategoryCarouselProps {
  categories: Category[];
  title?: string;
  showNavigation?: boolean;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const defaultItemsPerView = {
  mobile: 1,
  tablet: 2,
  desktop: 4,
};

export function CategoryCarousel({
  categories,
  title,
  showNavigation = true,
  itemsPerView = defaultItemsPerView,
}: CategoryCarouselProps) {
  const [api, setApi] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <div className="relative ">
        <Carousel
          setApi={setApi}
          dir="ltr"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <div className="px-8">
            <CarouselContent dir="ltr" className="-ml-2 md:-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category._id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <Link href={`products?category=${category._id}`}>
                      <CategoryCard category={category} />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          {showNavigation && (
            <>
              <CarouselPrevious className="left-0 hover:bg-secondary" />
              <CarouselNext className="right-0 hover:bg-secondary" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
}
