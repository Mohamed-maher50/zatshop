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
        src={"/categoryImage.png"}
        width={255}
        height={255}
        alt="category name"
      />
      <span className="font-semibold text-center block mx-auto text-[#3A3845] uppercase w-fit  text-lg">
        {category.name}
      </span>
    </div>
  );
};

export default CategoryCard;
