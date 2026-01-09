import * as Sidebar from "@/components/FiltrationSidebar";
import Pagination from "@/components/Pagination";
import RestQueryButton from "@/components/RestQueryButton";
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Categories, Products } from "@/features/api";
import { Brands } from "@/features/brands/api/api";
import DropdownFiltration from "@/features/products/components/DropdownFiltration";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { arabicNumber } from "@/lib/arabicNumber";
import { Close, FilterVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FolderCode } from "lucide-react";
const EmptyMessage = ({ isActive }: { isActive: boolean }) => (
  <Empty className="mt-20" hidden={!isActive}>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderCode />
      </EmptyMedia>

      <EmptyTitle>لا توجد منتجات مطابقة</EmptyTitle>

      <EmptyDescription>
        لم يتم العثور على أي منتجات تطابق عوامل التصفية أو كلمات البحث التي
        أدخلتها. جرّب تعديل الفلاتر أو تغيير كلمة البحث.
      </EmptyDescription>
    </EmptyHeader>

    <EmptyContent>
      <div className="flex gap-2">
        <RestQueryButton variant={"secondary"}>
          إعادة ضبط الفلاتر
        </RestQueryButton>
      </div>
    </EmptyContent>
  </Empty>
);
const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  // page query params
  const search = await searchParams;
  const searchParamsQueries = new URLSearchParams(search);
  const query = searchParamsQueries.get("keyword");

  // page data requests
  const brandRequest = Brands.findMany("?limit=8");
  const categoriesRequest = Categories.findMany("?limit=8", {
    adapter: "fetch",
    fetchOptions: { cache: "force-cache" },
  });
  const filteredProductsRequest = Products.findMany(
    `?${searchParamsQueries}&limit=2`
  );

  const [brandsResponse, categoriesResponse, filteredProductsResponse] =
    await Promise.all([
      brandRequest,
      categoriesRequest,
      filteredProductsRequest,
    ]);

  // page data
  const brands = brandsResponse.data.data;
  const categories = categoriesResponse.data.data;
  const filteredProducts = filteredProductsResponse.data;

  return (
    <>
      <Drawer>
        <div className="flex gap-6 ">
          <div className="max-sm:hidden w-72 divide-y pb-6">
            <Sidebar.FiltrationSidebar
              categories={categories}
              brands={brands}
              ratings={Array.from({ length: 5 }, (_, idx) => idx + 1)}
            >
              <Sidebar.Header
                icon={<HugeiconsIcon icon={FilterVerticalIcon} />}
              >
                التصنيف حسب
              </Sidebar.Header>

              <Sidebar.Categories />
              <Sidebar.Brands />
              <Sidebar.Price />
              <Sidebar.RatingFilter />

              <Sidebar.Actions>
                <Sidebar.ApplyButton />
                <Sidebar.ResetButton />
              </Sidebar.Actions>
            </Sidebar.FiltrationSidebar>
          </div>
          <DrawerContent className="h-[90vh]! pb-7 max-h-[90vh]! flex flex-col">
            <ScrollArea className="mx-auto h-full w-full max-w-sm">
              <DrawerHeader>
                <div className="flex justify-between">
                  <DrawerTitle>
                    <Sidebar.Header
                      icon={<HugeiconsIcon icon={FilterVerticalIcon} />}
                    >
                      <span className="ml-2 text-muted-foreground">
                        التصنيف حسب
                      </span>
                    </Sidebar.Header>
                  </DrawerTitle>
                  <span>
                    <DrawerClose asChild>
                      <Button variant="outline">
                        <HugeiconsIcon
                          icon={Close}
                          className="text-muted-foreground"
                        />
                      </Button>
                    </DrawerClose>
                  </span>
                </div>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <Sidebar.FiltrationSidebar
                  categories={categories}
                  brands={brands}
                  ratings={[1, 2, 3, 4, 5]}
                >
                  <Sidebar.Categories />
                  <Sidebar.Brands />
                  <Sidebar.Price />
                  <Sidebar.RatingFilter />

                  <Sidebar.Actions>
                    <Sidebar.ApplyButton />
                    <Sidebar.ResetButton />
                  </Sidebar.Actions>
                </Sidebar.FiltrationSidebar>
              </div>
            </ScrollArea>
          </DrawerContent>
          <div className="w-full">
            <div className="flex mb-4 justify-between">
              <div className="text-2xl md:text-3xl font-bold">{query}</div>
              <span className="text-sm text-muted-foreground md:text-lg">
                <span className="mx-1">الصفحة</span>(
                {arabicNumber(
                  filteredProductsResponse.paginationResult.currentPage,
                  "number"
                )}
                )
              </span>
              <div className="flex gap-2 items-center ">
                <div className="max-sm:hidden">
                  <DropdownFiltration />
                </div>
                <DrawerTrigger className="sm:hidden" asChild>
                  <Button variant="outline">
                    <HugeiconsIcon
                      icon={FilterVerticalIcon}
                      className="text-muted-foreground"
                    />
                  </Button>
                </DrawerTrigger>
              </div>
            </div>
            <EmptyMessage isActive={!filteredProducts.length} />
            <ProductsGrid
              hidden={!filteredProducts.length}
              className="grid-cols-2! lg:grid-cols-3!"
            >
              {filteredProducts.map((product) => (
                <HomeProductCard key={product.title} product={product} />
              ))}
            </ProductsGrid>
          </div>
        </div>
        <div
          hidden={filteredProductsResponse.paginationResult.numberOfPages <= 1}
        >
          <Pagination
            totalPages={filteredProductsResponse.paginationResult.numberOfPages}
          />
        </div>
      </Drawer>
    </>
  );
};

export default page;
