import { Variant } from "@/types";

export const findVariant = (
  variantId: string | undefined,
  variants: Variant[]
) => {
  if (!variantId) return undefined;
  return variants.find((v) => {
    return v.sku === variantId;
  });
};

type VariantOption = {
  key: string;
  value: string;
};

export const findVariantMatchOption = (
  variants: Variant[],
  option: VariantOption
) => variants.find((v) => v.attributes[option.key] === option.value);

export const findVariantByOption = (
  selectedVariant: Variant,
  variants: Variant[],
  option: VariantOption
) => {
  // rename current option to :(_) ex: color:red => _ :red
  const { [option.key]: _, ...remainingAttributes } =
    selectedVariant.attributes;

  return variants.find((variant) => {
    // Check if the variant has the desired option value
    if (variant.attributes[option.key] !== option.value) {
      return false;
    }

    // Check if all other attributes match
    return variantMatchesAttributes(variant, remainingAttributes);
  });
};
export const variantMatchesAttributes = (
  variant: Variant,
  attributes: Record<string, string>
): boolean => {
  return Object.entries(attributes).every(
    ([key, expectedValue]) => variant.attributes[key] === expectedValue
  );
};
