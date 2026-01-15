import { Product } from "@/types";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { arabicNumber } from "@/lib/arabicNumber";

const ProductInfo = ({ product }: { product: Product }) => {
  return (
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
          {`(${arabicNumber(product.reviews.length, "number")}) التقييمات`}
        </div>
        <div className="flex">
          المخزن :
          {product["variants"][0].stock ? (
            <span className="text-green-500">متوفر في المخزن</span>
          ) : (
            <span className="text-destructive ">غير متوفر</span>
          )}
        </div>
      </div>
      <div className="text-2xl  font-medium">
        {arabicNumber(product["variants"][0].price, "price")}
      </div>
    </div>
  );
};
export default ProductInfo;
