"use client";

import { Spinner } from "@/components/ui/spinner";

const RootLoading = () => {
  return (
    <div className="absolute z-50 flex items-center justify-center inset-0 bg-secondary min-h-0">
      <Spinner className="animate animate-spain size-10" />
    </div>
  );
};

export default RootLoading;
