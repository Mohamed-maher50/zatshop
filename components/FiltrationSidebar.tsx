"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterVerticalIcon } from "@hugeicons/core-free-icons";
import { Brand, Category } from "@/types";
import { parseAsString, useQueryStates } from "nuqs";
import RestQueryButton from "./RestQueryButton";
import { cn } from "@/lib/utils";

/* ---------------- constants ---------------- */
const PRICE = { MIN: 0, MAX: 90000, STEP: 100 };

/* ---------------- types ---------------- */
interface FiltrationSidebarProps {
  categories: Category[];
  brands: Brand[];
  ratings: number[];
  children: React.ReactNode;
}

interface FilterContextType {
  filters: Record<string, string | number>;
  setFilters: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  onChange: (key: string, value: string) => void;
  onPriceChange: (key: string, value: string) => void;
  applyFilters: () => void;
  isFiltered: boolean;
  categories: Category[];
  brands: Brand[];
  ratings: number[];
  PRICE: typeof PRICE;
}

/* ---------------- Context ---------------- */
const FilterContext = createContext<FilterContextType | undefined>(undefined);

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Filter components must be used within FiltrationSidebar");
  }
  return context;
};

/* ---------------- Hook ---------------- */
export function useOrdersQuery() {
  return useQueryStates({
    category: parseAsString.withDefault(""),
    brand: parseAsString.withDefault(""),
    ["price[gte]"]: parseAsString.withDefault(`${PRICE.MIN}`),
    ["price[lte]"]: parseAsString.withDefault(`${PRICE.MAX}`),
    rating: parseAsString.withDefault(""),
  });
}

/* ---------------- Main Component ---------------- */
const FiltrationSidebar = ({
  categories,
  brands,
  ratings,
  children,
}: FiltrationSidebarProps) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useOrdersQuery();

  const {
    category,
    brand,
    rating,
    ["price[gte]"]: priceGte,
    ["price[lte]"]: priceLte,
  } = query;

  const [filters, setFilters] = useState<Record<string, string | number>>({
    category,
    brand,
    rating,
    ["price[gte]"]: priceGte || PRICE.MIN,
    ["price[lte]"]: priceLte || PRICE.MAX,
  });

  useEffect(() => {
    setFilters(query);
  }, [query]);

  const applyFilters = () => {
    const s = Object.entries(filters).reduce<Record<string, string | number>>(
      (state, [queryKey, queryValue]) => {
        state[queryKey] = queryValue;
        return state;
      },
      {}
    );
    setQuery(s, { scroll: true, shallow: false });
  };

  const onPriceChange = (key: string, value: string) => {
    setFilters((prev) => {
      if (!prev[key]) return { ...prev, [key]: value };
      else return { ...prev, [key]: value };
    });
  };

  const onChange = (key: string, value: string) => {
    setFilters((prev) => {
      if (!prev[key]) return { ...prev, [key]: value };
      if (prev[key] === value) {
        return { ...prev, [key]: "" };
      } else return { ...prev, [key]: value };
    });
  };

  const isFiltered = !searchParams.toString();

  const contextValue: FilterContextType = {
    filters,
    setFilters,
    onChange,
    onPriceChange,
    applyFilters,
    isFiltered,
    categories,
    brands,
    ratings,
    PRICE,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      <aside className="divide-y pb-6">{children}</aside>
    </FilterContext.Provider>
  );
};

/* ---------------- Compound Components ---------------- */

function Header({
  children,
  icon,
}: {
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between pb-6">
      <h2 className="text-xl font-bold">{children || "فلتر"}</h2>
      {icon || (
        <HugeiconsIcon
          icon={FilterVerticalIcon}
          className="text-muted-foreground"
        />
      )}
    </header>
  );
}

function Categories() {
  const { categories, filters, onChange } = useFilterContext();

  return (
    <FilterSection title="التصنيفات">
      {categories.map((cat) => (
        <Button
          key={cat._id}
          onClick={() => onChange("category", cat._id)}
          variant={filters.category === cat._id ? "outline" : "link"}
          className="justify-start h-auto p-1"
        >
          {cat.name}
        </Button>
      ))}
    </FilterSection>
  );
}

function Brands() {
  const { brands, filters, onChange } = useFilterContext();

  return (
    <FilterSection title="الماركات">
      {brands.map((brand) => (
        <Button
          key={brand._id}
          onClick={() => onChange("brand", brand._id)}
          variant={filters.brand === brand._id ? "outline" : "link"}
          className="justify-start h-auto p-1"
        >
          {brand.name}
        </Button>
      ))}
    </FilterSection>
  );
}

function Price() {
  const { filters, onPriceChange, PRICE } = useFilterContext();

  return (
    <FilterSection title="السعر">
      <Slider
        min={PRICE.MIN}
        max={PRICE.MAX}
        value={[+filters["price[gte]"], +filters["price[lte]"]]}
        dir="rtl"
        step={PRICE.STEP}
        onValueChange={(value) => {
          onPriceChange("price[lte]", value[1].toString());
          onPriceChange("price[gte]", value[0].toString());
        }}
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{filters["price[gte]"].toString()} جنيه</span>
        <span>{filters["price[lte]"].toString()} جنيه</span>
      </div>
    </FilterSection>
  );
}
function RatingFilter() {
  const { ratings, filters, setFilters } = useFilterContext();

  return (
    <FilterSection title="التقييم">
      {ratings?.map((r) => {
        const value = r.toString();
        const checked = filters.rating === value;

        return (
          <label key={r} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              className="border border-primary"
              checked={checked}
              onCheckedChange={() =>
                setFilters((p) => ({
                  ...p,
                  rating: checked ? "" : value,
                }))
              }
            />

            <Rating value={r} readOnly>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingButton key={i} size={16} />
              ))}
            </Rating>

            <span className="text-sm text-muted-foreground">وأعلى</span>
          </label>
        );
      })}
    </FilterSection>
  );
}
function ApplyButton({
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { applyFilters } = useFilterContext();

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={(e) => {
        applyFilters();
        onClick && onClick(e);
      }}
      {...props}
    >
      {children || "تطبيق الفلتر"}
    </Button>
  );
}

const ResetButton = function ResetButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { isFiltered } = useFilterContext();

  if (isFiltered) return null;

  return (
    <RestQueryButton
      hidden={isFiltered}
      size="lg"
      variant="outline"
      className={cn("w-full", className)}
      {...props}
    >
      مسح التصنيف
    </RestQueryButton>
  );
};

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 space-y-2">{children}</div>;
}

/* ---------------- Helper Component ---------------- */
function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion type="single" collapsible defaultValue="open">
      <AccordionItem value="open">
        <AccordionTrigger>
          <span className="text-lg font-bold">{title}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 pt-2">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
export {
  FiltrationSidebar,
  Header,
  ResetButton,
  ApplyButton,
  Brands,
  Price,
  Categories,
  Actions,
  RatingFilter,
};
