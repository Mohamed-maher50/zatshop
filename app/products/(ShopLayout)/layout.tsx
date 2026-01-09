import { Slider } from "@/components/ui/slider";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HugeiconsIcon } from "@hugeicons/react";
import { Close } from "@hugeicons/core-free-icons";
const categories = [
  {
    name: "Electronics",
    subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Shoes", "Bags"],
  },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-fiction", "Children", "Education"],
  },
  {
    name: "Sports",
    subcategories: ["Fitness", "Football", "Cycling", "Swimming"],
  },
  {
    name: "Home",
    subcategories: ["Furniture", "Kitchen", "Decor", "Lighting"],
  },
  {
    name: "Beauty",
    subcategories: ["Makeup", "Skincare", "Haircare"],
  },
  {
    name: "Toys",
    subcategories: ["Action Figures", "Puzzles", "Educational"],
  },
  {
    name: "Automotive",
    subcategories: ["Car Care", "Accessories", "Tools"],
  },
];



export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Breadcrumb className="mt-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator dir="ltr" />
          <BreadcrumbItem>المنتجات</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className=" min-h-screen pt-12 ">
        <div className="mb-6"></div>
        {children}
      </main>
    </>
  );
}
