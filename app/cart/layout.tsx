import { Container } from "@/components/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen ">
      <Container>
        <div className="pt-5">
          <Breadcrumb className="mt-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">الرئسية</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>العربه</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </div>
      </Container>
    </main>
  );
}
