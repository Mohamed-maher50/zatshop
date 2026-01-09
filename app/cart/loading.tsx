"use client";

import { Spinner } from "@/components/ui/spinner";

const CartPageSkeleton = () => {
  return (
    <div className="absolute flex items-center justify-center inset-0 bg-white/40  min-h-0">
      <Spinner className="animate animate-spain size-8" />
    </div>
  );
};

export default CartPageSkeleton;
