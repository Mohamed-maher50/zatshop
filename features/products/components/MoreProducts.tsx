"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import HomeProductCard from "./HomeProductCard";
import { Products } from "../api/queries";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface MoreProductsProps {
  initialPage?: number;
  query?: string;
}

const MoreProducts = ({ initialPage = 1, query }: MoreProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);

  const trimmedQuery = (query?.startsWith("?") ? query.slice(1) : query) || "";

  const fetchProducts = async (pageNum: number) => {
    if (!hasMore && pageNum > 1) return;

    try {
      setLoading(true);
      setHasError(false);

      const res = await Products.findMany(`?page=${pageNum}&${trimmedQuery}`);

      // Append new products to existing ones
      setProducts((prev) =>
        pageNum === 1 ? res.data : [...prev, ...res.data]
      );

      // Check if there's more data
      const isLastPage =
        res.paginationResult.currentPage === res.paginationResult.numberOfPages;
      setHasMore(!isLastPage && !!res.paginationResult.nextPage);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setPage(initialPage);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1);
  }, [trimmedQuery]);

  // Fetch next page
  const fetchNext = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  return (
    <>
      {/* Products Grid */}
      {products.map((product) => (
        <HomeProductCard key={product._id} product={product} />
      ))}
      <>
        {/* Loading State */}
        {loading && (
          <div className="flex col-span-full justify-center py-8">
            <Spinner />
          </div>
        )}

        {/* Error State */}
        {hasError && !loading && (
          <div className="text-center col-span-full py-8">
            <p className="text-destructive mb-4">
              حدث خطأ أثناء تحميل المنتجات
            </p>
            <Button onClick={() => fetchProducts(page)} variant="outline">
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && !hasError && products.length > 0 && (
          <div className="flex col-span-full justify-center py-8">
            <Button onClick={fetchNext} variant="ghost" size="lg">
              تحميل المزيد
            </Button>
          </div>
        )}

        {/* End of Results */}
        {!loading && !hasMore && products.length > 0 && (
          <div className="text-center col-span-full py-8 text-muted-foreground">
            تم الوصول لآخر المنتجات
          </div>
        )}

        {/* No Results */}
        {!loading && products.length === 0 && !hasError && (
          <div className="text-center col-span-full py-12 text-muted-foreground">
            لا توجد منتجات
          </div>
        )}
      </>
    </>
  );
};

export default MoreProducts;
