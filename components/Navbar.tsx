import Link from "next/link";
import { Container } from "./Container";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircleIcon,
  FavouriteIcon,
  Search01Icon,
  ShoppingCart02Icon,
  Menu03Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import Image from "next/image";
const NAV_LINKS = [
  {
    id: 1,
    label: "home",
    href: "/",
  },
  {
    id: 2,
    label: "shop",
    href: "",
  },
  {
    id: 3,
    label: "about",
    href: "",
  },
  {
    id: 4,
    label: "contact",
    href: "",
  },
];
const Logo = () => {
  return (
    <Image
      alt="zat logo"
      className="object-cover"
      src={"/Gemini_Generated_Image_2i3do2i3do2i3do2.png"}
      width={145}
      height={38}
    />
  );
};
const AppNavbar = () => {
  return (
    <Drawer disablePreventScroll={false} modal direction="left">
      <Container>
        <nav className="flex py-2.5 items-center justify-between">
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
          <div className=" justify-between hidden sm:flex   gap-x-14.5">
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
          <div className="flex gap-6">
            <HugeiconsIcon
              icon={Search01Icon}
              className="text-natural-700 max-sm:hidden"
              size={20}
            />
            <HugeiconsIcon
              icon={UserCircleIcon}
              size={20}
              className="text-natural-700 max-sm:hidden"
            />
            <HugeiconsIcon
              icon={FavouriteIcon}
              size={20}
              className="text-natural-700 max-sm:hidden"
            />
            <HugeiconsIcon
              icon={ShoppingCart02Icon}
              size={20}
              className="text-natural-700 "
            />
          </div>
        </nav>
      </Container>
    </Drawer>
  );
};

export default AppNavbar;
