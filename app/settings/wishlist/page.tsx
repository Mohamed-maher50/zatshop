import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import HomeProductCard from "@/features/products/components/HomeProductCard";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { WishList } from "@/features/wishlist/api/api";
import {
  ContainerTruck02Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const WishlistPage = async () => {
  const { data } = await WishList.get();
  return (
    <div className="mt-10">
      <Empty hidden={!!data.data.length} className="min-h-96">
        <EmptyHeader>
          <EmptyMedia variant="default">
            <HugeiconsIcon className="size-8 md:size-10" icon={FavouriteIcon} />
          </EmptyMedia>
          <EmptyTitle>قائمة المفضلة فارغة</EmptyTitle>
          <EmptyDescription>
            لم تقم بإضافة أي منتجات إلى المفضلة بعد. تصفّح المنتجات واضغط على
            أيقونة القلب لحفظها هنا.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <ProductsGrid>
        {data.data.map((product) => {
          return <HomeProductCard product={product} key={product._id} />;
        })}
      </ProductsGrid>
    </div>
  );
};

export default WishlistPage;
