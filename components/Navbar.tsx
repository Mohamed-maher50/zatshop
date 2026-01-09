"use client";
import Link from "next/link";
import { Container } from "./Container";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircleIcon,
  Search01Icon,
  ShoppingCart02Icon,
  Menu03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import Image from "next/image";
import { ImgHTMLAttributes, useState } from "react";
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
const NAV_LINKS = [
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
  {
    id: 2,
    label: "المنتجات",
    href: "/products",
  },
  {
    id: 1,
    label: "الرئسية",
    href: "/",
  },
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
const AppNavbar = () => {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  return (
    <div className="border-b border-b-[#CAC9CF]" dir="ltr">
      <Drawer disablePreventScroll={false} modal direction="left">
        <Container>
          <nav className="flex  py-2.5 items-center justify-between">
            <DrawerContent className="px-10 flex-col flex gap-5">
              <DrawerTitle className="py-4 text-xl font-garamond font-extrabold">
                <Logo />
              </DrawerTitle>
              <div className="flex flex-col flex-1  gap-6 mt-8">
                {NAV_LINKS.map((navLink) => {
                  return (
                    <Link
                      href={navLink.href}
                      className="text-foreground text-sm capitalize hover:underline"
                      key={navLink.id}
                    >
                      {navLink.label}
                    </Link>
                  );
                })}
              </div>
            </DrawerContent>
            <DrawerTrigger asChild>
              <Button variant={"ghost"} className={"hidden max-sm:block"}>
                <HugeiconsIcon
                  icon={Menu03Icon}
                  size={20}
                  className="text-natural-700  "
                />
              </Button>
            </DrawerTrigger>
            <div className="h-9.5 grid place-items-center">
              <Logo />
            </div>
            <div className="justify-between hidden sm:flex   gap-x-14.5">
              {NAV_LINKS.map((navLink) => {
                return (
                  <Link
                    href={navLink.href}
                    className="text-foreground text-sm bg-background capitalize"
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
                className="text-natural-700 max-sm:hidden"
                size={20}
              />
              <AuthOnly>
                <DropdownMenu>
                  <DropdownMenuTrigger className={"cursor-pointer"}>
                    <HugeiconsIcon
                      icon={UserCircleIcon}
                      size={20}
                      className="text-natural-700  max-sm:hidden"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"py-1"}>
                    <DropdownMenuItem className={"py-0.5"}>
                      <AuthOnly>
                        <Link href={"/settings"} className="w-full">
                          <Button className={"w-full"} variant={"outline"}>
                            حسابي
                          </Button>
                        </Link>
                      </AuthOnly>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={"py-0.5"}>
                      <AuthOnly>
                        <Button
                          onClick={() => signOut()}
                          className={"w-full"}
                          variant={"outline"}
                        >
                          تسجيل الخروج
                        </Button>
                      </AuthOnly>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link href={`/cart`}>
                  <HugeiconsIcon
                    icon={ShoppingCart02Icon}
                    size={20}
                    className="text-natural-700 "
                  />
                </Link>
              </AuthOnly>
              <OnlyLogout>
                <Button variant={"outline"}>
                  <Link href={AUTH_LINKS_ENUM.SIGNIN_PAGE}>تسجيل الدخول</Link>
                </Button>
              </OnlyLogout>
            </div>
          </nav>
        </Container>
      </Drawer>
    </div>
  );
};

export default AppNavbar;
