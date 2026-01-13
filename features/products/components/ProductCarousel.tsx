"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
const ProductCarousel = ({ images }: { images: string[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [coverApi, setCoverApi] = useState<CarouselApi>();
  const autoplayPlugin = useRef(
    Autoplay({ active: true, stopOnFocusIn: false })
  );
  return (
    <div className="flex-1 gap-7 flex flex-col">
      <Carousel
        className="w-full "
        dir="ltr"
        plugins={[autoplayPlugin.current, Fade()]}
        setApi={setCoverApi}
        opts={{
          loop: true,
          containScroll: false,
        }}
      >
        <CarouselContent className="h-[35rem] max-h-[31rem] mx-0! gap-4 w-full">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="relative w-full px-0 h-full overflow-hidden"
            >
              <Image
                src={img}
                alt=""
                fill
                className="absolute object-cover inset-0"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel
        hidden={images.length <= 1}
        plugins={[
          Autoplay({
            active: true,
            stopOnFocusIn: false,
            stopOnInteraction: false,
          }),
        ]}
        dir="ltr"
        setApi={setApi}
        className="w-full "
        opts={{
          loop: true,
          duration: 1000,
        }}
      >
        <CarouselContent className="gap-1">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              onClick={(idx) => {
                coverApi?.scrollTo(index);
                autoplayPlugin.current.reset();
              }}
              className="basis-1/4 relative lg:basis-1/5 h-24"
            >
              <Image src={image} alt="" className="object-center" fill />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
               <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
