import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
