"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import RestQueryButton from "../RestQueryButton";

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

const MobileOrdersFiltration = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // State لحفظ القيم المختارة مؤقتاً
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  // تحميل القيم الحالية من URL عند فتح الـ Sheet
  useEffect(() => {
    if (isOpen) {
      const currentFilters: Record<string, string> = {};
      filters.forEach((filter) => {
        const value = searchParams.get(filter.key);
        currentFilters[filter.key] = value || "all";
      });
      setSelectedFilters(currentFilters);
    }
  }, [isOpen, searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-fit">
          <Filter className="mr-2 h-4 w-4" />
          فلترة حسب
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh] px-4 pt-10">
        <SheetHeader>
          <SheetTitle>فلترة حسب </SheetTitle>
          <SheetDescription>اختار حسب احتياجك</SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-6 space-y-8 h-96 max-h-96 pb-4">
          {filters.map((field) => {
            return (
              <div key={field.key} className="space-y-4 mb-6">
                <h3 className="font-semibold text-base">{field.label}</h3>
                <RadioGroup
                  value={selectedFilters[field.key] || "all"}
                  onValueChange={(value) =>
                    handleFilterChange(field.key, value as string)
                  }
                >
                  {field.options.map((option) => {
                    return (
                      <div
                        key={option.value}
                        className="flex items-center gap-1.5 space-x-3 space-x-reverse py-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${field.key}-${option.value}`}
                        />
                        <Label
                          htmlFor={`${field.key}-${option.value}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            );
          })}
        </ScrollArea>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t flex gap-3">
          <SheetClose asChild>
            <RestQueryButton variant="outline" className="flex-1">
              اعادة الضبط
            </RestQueryButton>
          </SheetClose>
          <Button onClick={applyFilters} className="flex-1">
            تطبيق الفلاتر
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileOrdersFiltration;
