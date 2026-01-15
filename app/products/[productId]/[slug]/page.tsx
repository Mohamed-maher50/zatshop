import { Button, buttonVariants } from "@/components/ui/button";

import { Facebook, Instagram, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import ProductsGrid from "@/features/products/components/ProductsGrid";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ReviewCard from "@/features/reviews/ReviewCard";

import { Products } from "@/features/api";
import { notFound } from "next/navigation";

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
import ProductBuySection from "@/features/products/components/ProductBuySection";
import ProductPageBreadcrumb from "@/features/products/components/ProductPageBreadcrumb";

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
      <ProductPageBreadcrumb title={product.title} />

      <ProductBuySection product={product} />

      <section className="py-10 flex flex-col gap-y-12">
        <div
          className="flex flex-col gap-y-12"
          hidden={recommendedProducts.data.length === 0}
        >
          <span className="font-garamond text-natural-800  text-xl lg:text-4xl font-bold uppercase">
            المنتجات المشابهه
          </span>
          <ProductsGrid className="grid-cols-2">
            {recommendedProducts.data.map((product) => (
              <HomeProductCard key={product.title} product={product} />
            ))}
          </ProductsGrid>
        </div>
      </section>
      <section className="flex flex-col gap-y-12">
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
        <div hidden={!reviews.length} className="grid  md:grid-cols-2 gap-2">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              loggedUserId={loggedUserSession?.user.id}
            />
          ))}
          {reviews.length >= 2 && (
            <MoreReviews
              initialPage={2}
              query={`?limit=4&product=${product._id}`}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
