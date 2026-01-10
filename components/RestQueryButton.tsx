"use client";
import { FC, HtmlHTMLAttributes, PropsWithChildren } from "react";
import { Button, buttonVariants } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { VariantProps } from "class-variance-authority";

const RestQueryButton: FC<
  PropsWithChildren &
    Omit<HtmlHTMLAttributes<HTMLButtonElement>, "children"> &
    VariantProps<typeof buttonVariants>
> = ({ children, onClick, ...props }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <Button
      onClick={(e) => {
        replace(`${pathname}`, { scroll: false });
        onClick?.call(null, e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RestQueryButton;
