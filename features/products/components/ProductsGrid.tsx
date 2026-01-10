import { cn } from "@/lib/utils";
import React, { HtmlHTMLAttributes, ReactNode } from "react";

const ProductsGrid = ({
  children,
  className,
  style,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "grid gap-2.5 gap-y-12 md:gap-y-10    sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4  md:gap-7.5  ",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ProductsGrid;
