"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProfilePageSkeleton() {
  return (
    <div className="space-y-8">
      {/* User Profile Card Skeleton */}
      <Card className="bg-card border-border">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar + buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />

            <div className="space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          {/* Form fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-9 w-32 sm:col-span-2" />
          </div>
        </CardContent>
      </Card>

      {/* Update Password Card Skeleton */}
      <Card className="bg-card border-border">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>

        <CardContent className="space-y-4 max-w-md">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-9 w-40" />
        </CardContent>
      </Card>

      {/* Danger Zone Skeleton */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>

        <CardContent>
          <Skeleton className="h-9 w-32" />
        </CardContent>
      </Card>
    </div>
  );
}
export default ProfilePageSkeleton;
