"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Review } from "@/types/reviews";
import { Reviews } from "@/features/reviews/api/api";
import ReviewCard from "@/features/reviews/ReviewCard";
import { Spinner } from "./ui/spinner";
import { useSession } from "next-auth/react";

const MoreReviews = ({
  initialPage = 2,
  query,
}: {
  initialPage: number;
  query: string;
}) => {
  const [Review, setReview] = useState<Review[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { data } = useSession();
  const trimmedQuery = (query?.startsWith("?") ? query.slice(1) : query) || "";

  const fetchReview = async (pageNum: number) => {
    if (!hasMore && pageNum > 1) return;

    try {
      setLoading(true);
      setHasError(false);
      console.log(pageNum);
      const res = await Reviews.findMany(`?page=${pageNum}&${trimmedQuery}`);

      // Append new Review to existing ones
      setReview((prev) =>
        pageNum === 1 ? res.data.data : [...prev, ...res.data.data]
      );

      // Check if there's more data
      const isLastPage =
        res.data.paginationResult.currentPage ===
        res.data.paginationResult.numberOfPages;
      setHasMore(!isLastPage && !!res.data.paginationResult.nextPage);
    } catch (error) {
      console.error("Failed to fetch Review:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setPage(initialPage);
    setReview([]);
    setHasMore(true);
    fetchReview(initialPage);
  }, [trimmedQuery]);

  // Fetch next page
  const fetchNext = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchReview(nextPage);
    }
  };

  return (
    <>
      {/* Review Grid */}
      {Review.map((Review) => (
        <ReviewCard
          key={Review._id}
          review={Review}
          loggedUserId={data?.user?.id}
        />
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
            <Button onClick={() => fetchReview(page)} variant="outline">
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && !hasError && Review.length > 0 && (
          <div className="flex col-span-full justify-center py-8">
            <Button onClick={fetchNext} variant="ghost" size="lg">
              تحميل المزيد
            </Button>
          </div>
        )}

        {/* End of Results */}
        {!loading && !hasMore && Review.length > 0 && (
          <div className="text-center col-span-full py-8 text-muted-foreground">
            تم الوصول لآخر التقييمات
          </div>
        )}

        {/* No Results */}
        {!loading && Review.length === 0 && !hasError && (
          <div className="text-center col-span-full py-12 text-muted-foreground">
            لا توجد تقييمات
          </div>
        )}
      </>
    </>
  );
};

export default MoreReviews;
