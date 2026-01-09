"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ShippingPageSkeleton() {
  return (
    <div className="space-y-12 p-6 animate-pulse">
      {/* Step Number */}
      <Skeleton className="w-8 h-8 rounded-sm" />

      {/* Title */}
      <Skeleton className="h-8 w-1/3 rounded" />

      {/* Carousel Skeleton */}
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-32 rounded-lg flex-shrink-0" />
        ))}
      </div>

      {/* Shipping Form Skeleton */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        {/* Address Field */}
        <Skeleton className="h-10 w-full rounded" />

        {/* Governorate + City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        {/* Phone + Apartment */}
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-14 w-full rounded mt-6" />
      </div>
    </div>
  );
}
