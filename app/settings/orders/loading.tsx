"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function OrdersPageSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <Skeleton className="h-7 w-40" />

      <div className="grid gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </CardHeader>

            {/* Items */}
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="p-4 flex gap-4 items-center">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-4 grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>

                <div className="rounded-lg p-4 space-y-3 bg-muted/20">
                  {Array.from({ length: 4 }).map((_, k) => (
                    <div key={k} className="flex justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                  <Skeleton className="h-px w-full my-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default OrdersPageSkeleton;
