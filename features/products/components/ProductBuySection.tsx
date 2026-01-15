import ProductSelector from "@/features/products/components/ProductSelector";
import VariantSelector from "@/features/products/components/VariantSelector";
import ProductCarousel from "@/features/products/components/ProductCarousel";
import { BayProductProvider } from "@/providers/BayProductProvider";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ProductInfo from "./ProductInfo";

const ProductBuySection = ({ product }: { product: Product }) => {
  return (
    <BayProductProvider initialProduct={product}>
      <div className="md:flex grid mt-12 gap-10 md:gap-16">
        <ProductCarousel images={product.images.map((i) => i.url)} />
        <div className="flex-1 gap-3 flex flex-col">
          <ProductInfo product={product} />

          <VariantSelector
            product={product}
            selectedVariant={product["variants"][0]}
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
  );
};

export default ProductBuySection;
