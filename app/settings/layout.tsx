import React, { act, ReactNode } from "react";
import NavigationTabs from "@/components/settings/Navigationbar";

const SettingLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter">
            لوحة تحكم الحساب
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            إدارة معلوماتك الشخصية، متابعة الطلبات، وتنظيم قائمة الأمنيات الخاصة
            بك.
          </p>
        </header>
        <div className="space-y-10  bg-background/80 ">
          <NavigationTabs />
          {children}

          {/* <TabsContent
            value="wishlist"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <DynamicWishlistTab />
          </TabsContent>
          <TabsContent
            value="addresses"
            className="mt-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <DynamicAddressesTab />
          </TabsContent> */}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
