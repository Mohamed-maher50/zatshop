"use client";
import { FC, HtmlHTMLAttributes, PropsWithChildren } from "react";
import { Button, buttonVariants } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { VariantProps } from "class-variance-authority";

const RestQueryButton: FC<
  PropsWithChildren &
    Omit<HtmlHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> &
    VariantProps<typeof buttonVariants>
> = ({ children, ...props }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  return (
    <Button
      onClick={() => replace(`${pathname}`, { scroll: false })}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RestQueryButton;
