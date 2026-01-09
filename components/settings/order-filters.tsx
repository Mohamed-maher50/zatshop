"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Filter = {
  label: string;
  key: string;
  value?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  default?: string;
};

const filters: Filter[] = [
  {
    label: "حالة الدفع",
    key: "isPaid",
    default: undefined,
    value: "isPaid",
    placeholder: "حالة الدفع",
    options: [
      { value: "all", label: "الكل" },
      { value: "true", label: "مدفوع" },
      { value: "false", label: "غير مدفوع" },
    ],
  },
  {
    label: "حالة الوصول",
    default: undefined,
    key: "isDelivered",
    value: "isDelivered",
    placeholder: "حالة الوصول",
    options: [
      { value: "all", label: "الكل" },
      { value: "true", label: "تم التوصيل" },
      { value: "false", label: "قيد التوصيل" },
    ],
  },
  {
    label: "ترتيب حسب",
    key: "sort",
    value: "sort",
    default: undefined,
    placeholder: "ترتيب حسب",
    options: [
      { value: "all", label: "الكل" },
      { value: "date", label: "التاريخ" },
      { value: "-createdAt", label: "الاجدث" },
      { value: "createAt", label: "الاقدم" },
    ],
  },
  {
    label: "طريقة الدفع",
    key: "paymentMethodType",
    value: "paymentMethodType",

    default: undefined,
    placeholder: "طريقة الدفع",
    options: [
      { value: "all", label: "الكل" },
      {
        value: "cash",
        label: "نقدي",
      },
      {
        value: "card",
        label: "كارت بنكي",
      },
    ],
  },
];

export function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => router.push(pathname);

  return (
    <div className="w-full">
      <div className="flex items-end gap-3 flex-wrap">
        {/* Payment Status Filter */}
        {filters.map((selectValues) => {
          return (
            <div key={selectValues.key} className="flex flex-col gap-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {/* {selectValues.label} */}
              </label>
              <Select
                value={
                  searchParams.get(selectValues.key) || selectValues.default
                }
                onValueChange={(value) => updateFilter(selectValues.key, value)}
              >
                <SelectTrigger className="w-32 h-9 shadow-none bg-background border border-border/50">
                  <SelectValue placeholder={selectValues.placeholder} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {selectValues.options.map((option) => {
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          );
        })}

        {
          <Button
            onClick={clearFilters}
            variant="outline"
            size="sm"
            disabled={!`${searchParams}`}
            className="h-9 px-3 gap-1 text-xs border-border/50 bg-transparent"
          >
            <X className="w-3 h-3" />
            مسح الفلتر
          </Button>
        }
      </div>
    </div>
  );
}
