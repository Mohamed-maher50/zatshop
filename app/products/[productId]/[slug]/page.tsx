import { Button, buttonVariants } from "@/components/ui/button";

import { Facebook, Instagram, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProductsGrid from "@/features/products/components/ProductsGrid";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ReviewCard from "@/features/reviews/ReviewCard";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import ProductCarousel from "@/features/products/components/ProductCarousel";
import { Products } from "@/features/api";
import { notFound } from "next/navigation";
import ProductSelector from "@/features/products/components/ProductSelector";
import VariantSelector from "@/features/products/components/VariantSelector";
import { arabicNumber } from "@/lib/arabicNumber";
import { BayProductProvider } from "@/providers/BayProductProvider";
import { findVariant } from "@/features/products/utils";
import { ReviewDialog } from "@/features/reviews/ReviewDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Reviews } from "@/features/reviews/api/api";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import MoreReviews from "@/components/MoreReviews";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageCircle } from "lucide-react";

async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string; slug: string }>;
  searchParams: Promise<Record<string, string> | undefined>;
}) {
  const loggedUserSession = await getServerSession(NextAuthOptions);
  const { productId } = await params;

  const search = await searchParams;

  const selectedVariantId = search?.variant;

  const productResponse = await Products.findOne(productId, ``);

  const product = productResponse.data;
  if (!product) notFound();

  const selectedVariant =
    findVariant(selectedVariantId, product.variants) || product.variants[0];

  const recommendedProductsResponse = await Products.findMany(
    `?category=${product.category._id}&limit=4`
  );
  const recommendedProducts = recommendedProductsResponse.data;

  const productReviewsResponse = await Reviews.findMany(
    `?product=${product._id}&page=1&limit=4`,
    {
      adapter: "fetch",

      fetchOptions: {
        next: {
          tags: [`reviews-${productId}`],
        },
      },
    }
  );
  const reviews = productReviewsResponse.data.data;
  return (
    <div>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسة</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">المنتجات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem aria-disabled>{product.title}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BayProductProvider
        initialProduct={product}
        selectedVariant={selectedVariant}
      >
        <div className="md:flex  mt-12 gap-16">
          <ProductCarousel images={product.images.map((i) => i.url)} />
          <div className="flex-1 gap-3 flex flex-col">
            <h1 className="text-xl text-natural-800 font-semibold">
              {product.title}
            </h1>
            <p className="text-muted-foreground">{product.description}</p>
            <div>
              <div className="flex items-center">
                <Rating
                  value={product.ratingsAverage}
                  readOnly
                  defaultValue={Math.floor(product.ratingsAverage)}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} className="text-[#C69B7B]" />
                  ))}
                </Rating>
                {`(${arabicNumber(
                  product.reviews.length,
                  "number"
                )}) التقييمات`}
              </div>
              <div className="flex">
                المخزن :
                {selectedVariant.stock ? (
                  <span className="text-green-500">متوفر في المخزن</span>
                ) : (
                  <span className="text-destructive ">غير متوفر</span>
                )}
              </div>
            </div>
            <div className="text-2xl  font-medium">
              {arabicNumber(selectedVariant.price, "price")}
            </div>
            <VariantSelector
              product={product}
              selectedVariant={selectedVariant}
            />
            <ProductSelector />
            <span>مشاركة المنتج:</span>
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
      </BayProductProvider>

      <section className="py-10 flex flex-col gap-y-12">
        <div
          className="flex flex-col gap-y-12"
          hidden={recommendedProducts.length === 0}
        >
          <span className="font-garamond text-natural-800  text-xl lg:text-4xl font-bold uppercase">
            المنتجات المشابهه
          </span>
          <ProductsGrid className="grid-cols-2">
            {recommendedProducts.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
          </ProductsGrid>
        </div>
        <div className="flex flex-col gap-y-12">
          <div className="flex items-center justify-between">
            <span className="font-garamond text-natural-800  text-xl lg:text-4xl font-bold uppercase">
              تقييمات المنتج
              <span className="font-sans text-sm  text-muted-foreground">
                ( {arabicNumber(product.reviews.length, "number")} )
              </span>
            </span>
            <ReviewDialog productId={productId}>
              <DialogTrigger className={buttonVariants({ size: "lg" })}>
                كتابة تقييم
              </DialogTrigger>
            </ReviewDialog>
          </div>
          <div
            hidden={!!reviews.length}
            className="w-full animate animate-in fade-in md:max-w-2xl  mx-auto"
          >
            <Alert className="flex! flex-col! items-center p-6 md:p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <MessageCircle className="md:h-12 h-10 w-10 md:w-12 text-muted-foreground" />
                <AlertDescription
                  className="text-gray-600 text-sm md:text-lg"
                  dir="rtl"
                >
                  لا توجد مراجعات حتى الآن. كن أول من يشارك رأيه في هذا المنتج.
                </AlertDescription>
                <ReviewDialog productId={productId}>
                  <DialogTrigger
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className: "px-7",
                    })}
                  >
                    كتابة تقييم
                  </DialogTrigger>
                </ReviewDialog>
              </div>
            </Alert>
          </div>
          <div
            hidden={!reviews.length}
            className="grid  md:grid-cols-2 grid-rows-2 gap-2"
          >
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                loggedUserId={loggedUserSession?.user.id}
              />
            ))}
            <MoreReviews
              initialPage={2}
              query={`?limit=4&product=${product._id}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
