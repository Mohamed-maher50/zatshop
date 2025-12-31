"use client";
import { products } from "@/app/page";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { Product } from "@/types";
import {
  Facebook,
  FavouriteIcon,
  Instagram,
  X,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ReviewCard from "@/features/reviews/ReviewCard";
import { mockReviews } from "@/features/reviews/mock";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
const product: Product = {
  _id: "64f123abc001",
  title: "Modern Wireless Headphones",
  description:
    "High-quality wireless headphones with noise cancellation and long battery life.",
  price: 2500,
  priceAfterDiscount: 2199,
  isFreeShipping: true,

  imageCover: {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },

  images: [
    {
      url: "/marin-blue-salad-plate.png",
      alt: "Wireless headphones front view",
    },
    {
      url: "/marin-blue-salad-plate.png",
      alt: "Wireless headphones side view",
    },
    {
      url: "/Imagde.png",
      alt: "Wireless headphones top view",
    },
    {
      url: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "White wireless headphones",
    },
    {
      url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a",
      alt: "Wireless headphones on desk",
    },
    {
      url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3",
      alt: "Wireless headphones lifestyle shot",
    },
    {
      url: "https://images.unsplash.com/photo-1606220945770-b5b6c0d3d8a6",
      alt: "Wireless headphones close-up",
    },
  ],

  slug: "modern-wireless-headphones",

  TotalStock: 120,
  TotalSold: 45,

  category: {
    _id: "cat001",
    name: "Electronics",
    slug: "electronics",
  },

  subcategory: [
    {
      _id: "sub001",
      name: "Headphones",
      slug: "headphones",
    },
  ],

  brand: {
    _id: "brand001",
    name: "SoundMax",
    slug: "soundmax",
    logo: {
      url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6",
    },
  },

  ratingsAverage: 4.6,

  options: [
    {
      name: "Color",
      values: ["Black", "White", "Gray"],
    },
    {
      name: "Connectivity",
      values: ["Bluetooth", "Wired"],
    },
  ],

  variants: [
    {
      attributes: {
        Color: "Black",
        Connectivity: "Bluetooth",
      },
      price: 2500,
      stock: 40,
      sku: "SM-BLK-BT",
      images: [
        {
          url: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Black wireless headphones",
        },
      ],
    },
    {
      attributes: {
        Color: "White",
        Connectivity: "Bluetooth",
      },
      price: 2500,
      stock: 30,
      sku: "SM-WHT-BT",
      images: [
        {
          url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
          alt: "White wireless headphones",
        },
      ],
    },
  ],
};

function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; slug: string }>;
}) {
  // const { slug, productId } = await params;
  const [quantity1, setQuantity1] = useState(1);

  const [api, setApi] = useState<CarouselApi>();
  const [coverApi, setCoverApi] = useState<CarouselApi>();
  const autoplayPlugin = useRef(
    Autoplay({ active: true, stopOnFocusIn: false })
  );

  return (
    <div>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="md:flex  mt-12 gap-16">
        <div className="flex-1 gap-9 flex flex-col">
          <Carousel
            className="w-full "
            plugins={[autoplayPlugin.current, Fade()]}
            setApi={setCoverApi}
            opts={{
              loop: true,
              containScroll: false,
            }}
          >
            <CarouselContent className="h-[35rem] gap-4 w-full">
              {product.images.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="relative w-full px-0 h-full overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="absolute inset-0"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            plugins={[
              Autoplay({
                active: true,
                stopOnFocusIn: false,
                stopOnInteraction: false,
              }),
            ]}
            setApi={setApi}
            className="w-full "
            opts={{
              loop: true,
              duration: 1000,
            }}
          >
            <CarouselContent className="gap-1">
              {product.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  onClick={(idx) => {
                    coverApi?.scrollTo(index);
                    autoplayPlugin.current.reset();
                  }}
                  className="basis-1/4 relative lg:basis-1/5 h-24"
                >
                  <Image
                    src={image.url}
                    alt=""
                    className="object-center"
                    fill
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
        <div className="flex-1 gap-3 flex flex-col">
          <h1 className="text-xl text-natural-800 font-semibold">
            {product.title}
          </h1>
          <p className="text-muted-foreground">{product.description}</p>
          <div>
            <div className="flex items-center">
              <Rating readOnly defaultValue={3}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} className="text-[#C69B7B]" />
                ))}
              </Rating>
              {"(5000) reviews"}
            </div>
            <div className="flex">
              Stock :{" "}
              {product.TotalStock ? (
                <span className="text-primary">in stock</span>
              ) : (
                <span className="text-destructive">out of stock</span>
              )}
            </div>
          </div>
          <div className="font-bold">5000 EGY</div>
          {product.options.map((o) => {
            return (
              <div key={o.name} className="flex flex-col gap-y-4">
                <label className="text-natural-800 font-semibold text-base">
                  {o.name} :
                </label>
                <div className="flex gap-2.5">
                  {o.values.map((v) => {
                    return (
                      <Button variant={"outline"} key={v}>
                        {v}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="flex gap-2.5 items-center">
            <ButtonGroup>
              <Button
                disabled={quantity1 === 0}
                onClick={() => setQuantity1(Math.max(0, quantity1 - 1))}
                size="lg"
                variant="outline"
              >
                <MinusIcon />
              </Button>
              <ButtonGroupText className="min-w-12 justify-center">
                {quantity1}
              </ButtonGroupText>
              <Button
                onClick={() => setQuantity1(quantity1 + 1)}
                size="lg"
                variant="outline"
              >
                <PlusIcon />
              </Button>
            </ButtonGroup>
            <Button variant={"default"} className={"grow"} size={"lg"}>
              ADD TO CART
            </Button>
          </div>
          <div className="items-center flex gap-1">
            <Button variant={"outline"} className={"grow"} size={"lg"}>
              Buy now
            </Button>
            <Button variant={"outline"} className={""} size={"lg"}>
              <HugeiconsIcon icon={FavouriteIcon} size={20} className="" />
            </Button>
          </div>
          <span>Share this:</span>
          <div className="flex items-center ">
            <Button variant={"ghost"} size={"lg"}>
              <HugeiconsIcon icon={Facebook} size={19} />
            </Button>
            <Button variant={"ghost"}>
              <HugeiconsIcon icon={Instagram} size={19} />
            </Button>
            <Button variant={"ghost"}>
              <HugeiconsIcon icon={X} size={19} />
            </Button>
          </div>
        </div>
      </div>

      <section className="py-10 flex flex-col gap-y-12">
        <span className="font-garamond text-natural-800 text-4xl font-bold uppercase">
          Similar Items
        </span>
        <ProductsGrid>
          {products.map((product) => (
            <HomeProductCard key={product.title} product={product} />
          ))}
        </ProductsGrid>
        <span className="font-garamond text-natural-800 text-4xl font-bold uppercase">
          PRODUCT REVIEWS{" "}
          <span className="font-sans text-sm text-muted-foreground">
            {"(45)"}
          </span>
        </span>
        <div className="grid md:grid-cols-2 grid-rows-2 gap-2">
          {mockReviews.slice(0, 6).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
        <Button
          className={"w-fit mx-auto capitalize"}
          size={"lg"}
          variant={"outline"}
        >
          Load more Reviews{" "}
        </Button>
      </section>
    </div>
  );
}

export default ProductPage;
