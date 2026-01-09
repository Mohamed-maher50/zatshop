"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages = 10 }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Read page from URL on mount

    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams.get("page")]);

  const updateURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateURL(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant={1 === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => goToPage(1)}
          className="h-9 w-9"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => goToPage(i)}
          className="h-9 w-9"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }
      pages.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => goToPage(totalPages)}
          className="h-9 w-9"
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 p-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 rtl:rotate-180 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4 rtl:rotate-180 " />
      </Button>
    </div>
  );
};

export default Pagination;
