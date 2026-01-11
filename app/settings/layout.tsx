import React, { act, ReactNode } from "react";
import NavigationTabs from "@/components/settings/Navigationbar";

const SettingLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4  bg-background/80 ">
          <div className="hidden md:block">
            <NavigationTabs />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
