"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product, Variant } from "@/types";
import { VariantProps } from "class-variance-authority";
import { usePathname, useRouter } from "next/navigation";
import { HtmlHTMLAttributes } from "react";
import {
  findVariantByOption,
  findVariantMatchOption,
  variantMatchesAttributes,
} from "../utils";
import { useBayProduct } from "@/providers/BayProductProvider";
interface ColorButtonProps
  extends HtmlHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  color: string;
}
export const ColorButton = ({
  color,
  className,
  ...props
}: ColorButtonProps) => (
  <Button
    {...props}
    className={cn("", className)}
    size={"icon-xs"}
    style={{ background: color }}
  />
);
const VariantSelector = ({
  product,
}: {
  product: Product;
  selectedVariant: Variant;
}) => {
  const pathname = usePathname();
  const { selectedVariant, updateSelectedVariants } = useBayProduct();
  const router = useRouter();
  const handleOnOptionChange = ({
    option,
    value,
  }: {
    option: string;
    value: string;
  }) => {
    if (!selectedVariant) return;
    const getNewVariant =
      findVariantByOption(selectedVariant, product.variants, {
        key: option,
        value,
      }) ||
      findVariantMatchOption(product.variants, {
        value,
        key: option,
      });

    const params = new URLSearchParams();
    if (getNewVariant) {
      params.set("variant", getNewVariant.sku);
      const url = `${pathname}?${params.toString()}`;
      window.history.pushState(null, "", url);
      updateSelectedVariants(getNewVariant);
      // router.push(pathname + `?${params.toString()}`, { scroll: false });
    }
  };
  const availableOptionsValues = ({ option }: { option: string }) => {
    const values = new Set();
    if (!selectedVariant) return values;
    const { [option]: _, ...remainingAttributes } = selectedVariant.attributes;
    product.variants.forEach((v) => {
      const isSameAttributes = variantMatchesAttributes(v, remainingAttributes);
      if (isSameAttributes && !values.has(v.attributes[option]))
        values.add(v.attributes[option]);
    });
    console.log(values);
    return values;
  };
  return (
    <div>
      {product.options.map((option, optionIndex, options) => {
        const availableValues = availableOptionsValues({ option: option.name });
        return (
          <div key={option.name} className="flex flex-col gap-y-4">
            <label className="text-natural-800 mt-4 font-semibold text-base">
              {option.name} :
            </label>
            <div className="flex  gap-4">
              {option.type == "color" &&
                option.values.map((v) => {
                  const isSelected =
                    v === selectedVariant?.attributes[option.name];
                  const isAvailableValue = !availableValues.has(v);

                  const colorButtonVariant = isAvailableValue
                    ? "destructive"
                    : isSelected
                    ? "outline"
                    : "secondary";

                  return (
                    <ColorButton
                      color={v}
                      onClick={() =>
                        handleOnOptionChange({ option: option.name, value: v })
                      }
                      className={cn(
                        " ",
                        isSelected ? "outline outline-offset-4!" : ""
                      )}
                      variant={colorButtonVariant}
                      key={v}
                    />
                  );
                })}
              {option.type === "text" &&
                option.values.map((v) => {
                  const buttonVariant = !availableValues.has(v)
                    ? "destructive"
                    : v === selectedVariant?.attributes[option.name]
                    ? "default"
                    : "outline";
                  const isParentOption = optionIndex !== options.length - 1;

                  return (
                    <Button
                      onClick={() =>
                        handleOnOptionChange({ option: option.name, value: v })
                      }
                      variant={
                        isParentOption && buttonVariant === "destructive"
                          ? "outline"
                          : buttonVariant
                      }
                      key={v}
                    >
                      {v}
                    </Button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantSelector;
