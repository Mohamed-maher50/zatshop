import Image from "next/image";
import { Category } from "./types.d";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  category: Category;
}
const CategoryCard = ({
  category,
  style,
  className,
  ...props
}: CategoryCardProps) => {
  return (
    <div className={cn(className)} style={{ ...style }} {...props}>
      <Image
        src={category.image}
        width={255}
        height={255}
        alt="category name"
        className=" w-63.75 h-63.75 object-cover"
      />
      <span className="font-semibold text-center font-tajawal block mx-auto text-natural-800 uppercase  text-lg">
        {category.name}
      </span>
    </div>
  );
};

export default CategoryCard;
