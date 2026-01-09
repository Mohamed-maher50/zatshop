"use client";
import { deleteItemAction } from "@/app/actions/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";
import { toast } from "sonner";

const DeleteProductCart = ({ title, sku }: { title: string; sku: string }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const DeleteProductFromCart = () => {
    const promise = deleteItemAction(sku);
    toast.promise(promise, {
      loading: "انتظر ثواني",
      success: () => {
        closeRef.current?.click();
        return "تم حذف المنتج";
      },
      error: "حصل مشكلة حاول تاني",
    });
  };
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "ghost" })}>
        <HugeiconsIcon icon={Delete} />
      </DialogTrigger>
      <DialogContent className={"p-10!"}>
        <DialogTitle>هل فعلا عايز تحذف {title}</DialogTitle>
        <DialogDescription> ده هيحذف المنتج بكامل الكمية </DialogDescription>
        <DialogFooter className="gap-2">
          <DialogClose ref={closeRef}>الرجوع</DialogClose>
          <Button variant={"destructive"} onClick={DeleteProductFromCart}>
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductCart;
