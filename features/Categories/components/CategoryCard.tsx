import { Category } from "./types.d";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
      <button className="group w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2  transition-all">
        {/* Premium Card Container */}
        <div
          className={cn(
            "relative overflow-hidden  h-64 md:h-72 lg:h-80 transition-all duration-500 border border-border/30 group-hover:shadow-2xl  group-hover:shadow-black/25  group-hover:-translate-y-2 shadow-lg shadow-black/10"
          )}
        >
          {/* Background Image with Sophisticated Overlay */}
          <div className="absolute inset-0">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={350}
              height={350}
              className={cn(
                "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 scale-100"
              )}
            />

            {/* Multi-layered Gradient for Premium Feel */}
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-75 opacity-60"
              )}
            />
          </div>

          {/* Content Section at Bottom */}
          <div className="absolute inset-0 flex  px-4 flex-col justify-end py-6 md:py-8">
            {/* Icon with Smooth Animation */}

            {/* name with Premium Typography */}
            <h3
              className={cn(
                "text-2xl md:text-3xl rtl:text-end  lg:text-4xl font-light text-white mb-2 transition-all duration-300 line-clamp-2",
                true ? "-translate-y-1" : "translate-y-0"
              )}
            >
              {category.name}
            </h3>

            {/* Description with Refined Styling */}
            {/* <p
              className={cn(
                "text-sm md:text-base text-white/85 leading-relaxed transition-all duration-300 line-clamp-2",
                true ? "opacity-100 -translate-y-1" : "opacity-80 translate-y-0"
              )}
            >
              {category.description}
            </p> */}

            {/* Premium CTA Link */}
            <div
              className={cn(
                "flex items-end justify-end gap-2 rtl:text-end mt-5 text-white font-medium text-sm transition-all duration-300 group-hover:gap-3 gap-2"
              )}
            >
              <span>تصفح التشكيلة</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className={cn(
                  "transition-all duration-300 group-hover:translate-x-2 translate-x-0"
                )}
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default CategoryCard;
