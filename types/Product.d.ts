import { Brand } from "./brands";
import { Category } from "./categories";
import { Subcategory } from "./subcategories";
export interface VariantOption {
  name: string;
  type: "text" | "color";
  values: string[];
}
export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  isFreeShipping: boolean;
  imageCover: {
    url: string;
  };
  images: [
    {
      url: string;
      id?: string;
      alt?: string;
    }
  ];
  slug: string;
  TotalStock: number;
  TotalSold: number;
  category: Category;
  ratingsQuantity: number;
  subcategory?: Subcategory[];
  reviews: [];
  brand: Brand;
  ratingsAverage: number;
  variants: Array<Variant>;
  options: Array<VariantOption>;
}
export interface Variant {
  attributes: Record<string, string>;
  price: number;
  stock: number;
  sku: string;
  images?: Array<{
    url: string;
    alt: string;
    id?: string;
  }>;
}
