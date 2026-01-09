"use client";
import { Heart, MapPin, ShoppingBag, User } from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
const LINKS = [
  {
    label: "اعدادت الحساب",
    value: "settings",
    href: "",
    icon: <User />,
  },
  {
    label: "الطلبات",
    value: "orders",
    href: "/orders",
    icon: <ShoppingBag />,
  },

  {
    label: "العنوانين",
    value: "addresses",
    href: "/addresses",
    icon: <MapPin />,
  },
  {
    label: "منتجات محفوطه",
    value: "wishlist",
    href: "/wishlist",
    icon: <Heart />,
  },
];
const NavigationTabs = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0  z-10  backdrop-blur-md py-4 -mx-4 px-4  sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:border-none">
      <div className="h-auto p-1  w-full sm:w-auto grid grid-cols-2 sm:flex sm:flex-wrap gap-1">
        {LINKS.map((link) => {
          return (
            <Link
              key={link.href}
              href={`/settings${link.href}`}
              className="grow "
            >
              <Button
                variant={
                  `/settings${link.href}` == `${pathname}`
                    ? "secondary"
                    : "ghost"
                }
                className="flex grow w-full h-full items-center gap-2 font-semibold text-sm py-2.5 px-4  tracking-wide uppercase"
              >
                {link.icon}
                <span>{link.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
