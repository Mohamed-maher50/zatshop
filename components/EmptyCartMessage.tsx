import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { ShoppingCartCheckIn02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
const EmptyCartMessage = () => {
  return (
    <Empty className="min-h-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon className="size-6" icon={ShoppingCartCheckIn02Icon} />
        </EmptyMedia>
        <EmptyTitle>العربة فارغة</EmptyTitle>
        <EmptyDescription>
          لا يوجد منتجات في العربة الان .ابد التسوق و اضف المنتجات
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href={"/"}>
          <Button className="w-full sm:w-auto">متابعة التسوق</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyCartMessage;
