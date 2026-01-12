"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { BrandCard } from "./BrandCard";
import { Brand } from "@/types";
import Link from "next/link";

interface BrandCarouselProps {
  brands: Brand[];
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

export function BrandCarousel({
  brands,
  title,
  showNavigation = true,
  itemsPerView = defaultItemsPerView,
}: BrandCarouselProps) {
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
          <CarouselContent dir="ltr" className="-ml-2 md:-ml-4">
            {brands.map((brand) => (
              <CarouselItem
                key={brand._id}
                className="pl-2 md:pl-4 basis-1/2 lg:basis-1/4"
              >
                <div className="h-full">
                  <Link href={`/products?brand=${brand._id}`}>
                    <BrandCard
                      id={brand._id}
                      name={brand.name}
                      logo={brand.image}
                      description={brand.description}
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

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
