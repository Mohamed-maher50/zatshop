import { products } from "@/app/page";
import { Button } from "@/components/ui/button";
import { SelectContent, SelectValue } from "@/components/ui/select";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { cn } from "@/lib/utils";
export const ColorButton = ({ hex }: { hex?: string }) => (
  <Button
    className={cn("")}
    size={"icon-xs"}
    variant={"outline"}
    style={{ background: hex }}
  ></Button>
);
const page = () => {
  return (
    <ProductsGrid className="grid-cols-2! lg:grid-cols-3!">
      {products.map((product) => (
        <HomeProductCard key={product.title} product={product} />
      ))}
    </ProductsGrid>
  );
};

export default page;
