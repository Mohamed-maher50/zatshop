import { Container } from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PriceDetails from "@/features/cart/components/PriceDetails";
export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" py-10 min-h-screen ">
      <Container>
        <div className="pt-5 flex w-full flex-col gap-2.5">
          <Breadcrumb className="mt-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">الرئسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>العربه</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="lg:flex grid w-full gap-5 items-start">
            <div className=" flex-2">{children}</div>
            <PriceDetails />
          </div>
        </div>
      </Container>
    </main>
  );
}
