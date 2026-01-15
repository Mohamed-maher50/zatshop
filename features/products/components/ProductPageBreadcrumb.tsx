import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const ProductPageBreadcrumb = ({ title }: { title: string }) => {
  return (
    <Breadcrumb className="mt-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">الرئيسة</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">المنتجات</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem aria-disabled>{title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductPageBreadcrumb;
