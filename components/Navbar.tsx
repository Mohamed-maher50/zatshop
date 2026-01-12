"use client";
import Link from "next/link";
import { Container } from "./Container";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircleIcon,
  Search01Icon,
  ShoppingCart02Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import Image from "next/image";
import { Fragment, ImgHTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AuthOnly from "./auth/OnlyAuth";
import OnlyLogout from "./auth/OnlyLogout";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { SearchDialog } from "./SearchDialog";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
const NAV_LINKS = [
  {
    id: 1,
    label: "الرئسية",
    href: "/",
  },
  {
    id: 2,
    label: "المنتجات",
    href: "/products",
  },
  {
    id: 3,
    label: "عنا",
    href: "/about",
  },
  {
    id: 4,
    label: "التواصل معنا",
    href: "/contact",
  },
];

type DRAWER_LINKS_TYPE = {
  label: string;
  href: string;
  isProtected?: boolean;
};
const DRAWER_LINKS: DRAWER_LINKS_TYPE[] = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },

  { label: "عربة التسوق", href: "/cart", isProtected: true },
  { label: "الطلبات", href: "/settings/orders", isProtected: true },

  { label: "عناويني", href: "/settings/addresses", isProtected: true },
  { label: "منتجات أعجبتني", href: "/settings/wishlist", isProtected: true },
  { label: "الإعدادات", href: "/settings", isProtected: true },

  { label: "عنا", href: "/about" },
  { label: "التواصل معنا", href: "/contact" },
];
export const Logo = ({
  className,
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height">) => {
  return (
    <Image
      alt="zat logo"
      className={cn("object-cover ", className)}
      src={"/Gemini_Generated_Image_2i3do2i3do2i3do2-removebg-preview.png"}
      width={145}
      height={38}
      {...props}
    />
  );
};
const AppNavbar = ({ cartItems }: { cartItems: number }) => {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={cn(
        " top-0 z-50 duration-300 animate  animate-in slide-in-from-bottom ",
        isSticky
          ? "sticky  bg-background border-b-[#CAC9CF]  border-b "
          : "relative "
      )}
    >
      <Drawer disablePreventScroll={false} modal direction="right">
        <Container>
          <nav className="flex  py-2.5 items-center justify-between">
            <DrawerContent className="px-10 flex-col flex gap-5">
              <DrawerTitle className="py-4 text-xl   flex justify-center font-garamond font-extrabold">
                <Link href={"/"}>
                  <Logo />
                </Link>
              </DrawerTitle>
              <div className="flex flex-col flex-1  gap-6 mt-8">
                {DRAWER_LINKS.map((navLink, idx) => {
                  const ViewController = navLink.isProtected
                    ? AuthOnly
                    : Fragment;
                  return (
                    <ViewController key={idx}>
                      <DrawerClose key={idx} asChild>
                        <Link
                          href={navLink.href}
                          className="text-foreground text-sm capitalize hover:underline"
                        >
                          {navLink.label}
                        </Link>
                      </DrawerClose>
                    </ViewController>
                  );
                })}

                <AuthOnly>
                  <DrawerClose asChild>
                    <Button variant={"outline"} onClick={() => signOut()}>
                      تسجيل الخروج
                    </Button>
                  </DrawerClose>
                </AuthOnly>
                <ButtonGroup
                  orientation={"vertical"}
                  className="w-full gap-1.5"
                >
                  <OnlyLogout>
                    <DrawerClose asChild>
                      <Link
                        className={buttonVariants({ variant: "default" })}
                        href={AUTH_LINKS_ENUM.SIGNIN_PAGE}
                      >
                        تسجيل الدخول
                      </Link>
                    </DrawerClose>
                    <ButtonGroupSeparator
                      orientation="horizontal"
                      className={"bg-primary/10"}
                    />
                    <DrawerClose asChild>
                      <Link
                        className={buttonVariants({ variant: "secondary" })}
                        href={AUTH_LINKS_ENUM.SIGNUP_PAGE}
                      >
                        انشاء حساب
                      </Link>
                    </DrawerClose>
                  </OnlyLogout>
                </ButtonGroup>
              </div>
            </DrawerContent>
            <DrawerTrigger asChild>
              <Button variant={"ghost"} className={"hidden max-md:block"}>
                <HugeiconsIcon
                  icon={Menu01Icon}
                  size={20}
                  className="text-natural-700  "
                />
              </Button>
            </DrawerTrigger>
            <div className="h-9.5 grid place-items-center">
              <Link href={"/"}>
                <Logo />
              </Link>
            </div>
            <div className="justify-between hidden md:flex   gap-x-14.5">
              {NAV_LINKS.map((navLink) => {
                return (
                  <Link
                    href={navLink.href}
                    className="text-foreground text-sm  capitalize"
                    key={navLink.id}
                  >
                    {navLink.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-6">
              <SearchDialog
                isOpen={isSearchDialogOpen}
                onClose={() => setSearchDialogOpen((prev) => !prev)}
              />
              <HugeiconsIcon
                onClick={() => setSearchDialogOpen((prev) => !prev)}
                icon={Search01Icon}
                className="text-natural-700 cursor-pointer max-sm:hidden"
                size={20}
              />
              <AuthOnly>
                <Link href={`/cart`} className="relative isolate">
                  <span
                    hidden={!cartItems}
                    className="absolute -top-1/2 text-xs  -right-1/2 bg-primary text-primary-foreground size-4 rounded-full flex justify-center items-center"
                  >
                    {cartItems}
                  </span>
                  <HugeiconsIcon
                    icon={ShoppingCart02Icon}
                    size={20}
                    className="text-natural-700 "
                  />
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className={"cursor-pointer"}>
                    <HugeiconsIcon
                      icon={UserCircleIcon}
                      size={20}
                      className="text-natural-700  "
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"grid gap-1.5"}>
                    <AuthOnly>
                      <Link href={"/settings"} className="w-full">
                        <DropdownMenuItem
                          className={buttonVariants({
                            variant: "outline",
                            className: " w-full",
                          })}
                        >
                          حسابي
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/cart"} className="w-full">
                        <DropdownMenuItem
                          className={buttonVariants({
                            variant: "outline",
                            className: " w-full sm:hidden",
                          })}
                        >
                          عربة التسوق
                        </DropdownMenuItem>
                      </Link>
                    </AuthOnly>
                    <AuthOnly>
                      <DropdownMenuItem
                        className={buttonVariants({
                          variant: "destructive",
                          className: " w-full",
                        })}
                        onClick={() => signOut()}
                      >
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </AuthOnly>
                  </DropdownMenuContent>
                </DropdownMenu>
              </AuthOnly>
              <OnlyLogout>
                <Link href={AUTH_LINKS_ENUM.SIGNIN_PAGE}>
                  <HugeiconsIcon
                    icon={UserCircleIcon}
                    size={20}
                    className="text-natural-700  "
                  />
                </Link>
              </OnlyLogout>
            </div>
          </nav>
        </Container>
      </Drawer>
    </div>
  );
};

export default AppNavbar;
