"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownFiltration = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentSort = searchParams.get("sort") || undefined;
  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("sort", value);
    else params.delete("sort");
    params.delete("page");

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select value={currentSort} onValueChange={handleSort}>
      <SelectTrigger className="min-w-20 !shadow-none">
        <SelectValue placeholder="ترتيب حسب" />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        <SelectItem className="rounded-none" value="-variants.sold">
          الاكثر مبيعاً
        </SelectItem>
        <SelectItem className="rounded-none" value="variants.price">
          السعر من الاقل الي الاعلي
        </SelectItem>
        <SelectItem className="rounded-none" value="-variants.price">
          السعر من الاعلي الي الاقل
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DropdownFiltration;
