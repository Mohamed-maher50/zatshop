"use client";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@/features/users/api";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const DeleteAddressDialog = ({ addressId }: { addressId: string }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteAddress = async () => {
    setIsDeleting(true);
    try {
      await User.deleteAddress(addressId);
      toast.success("تم حذف العنوان");
      closeRef.current?.click();
      router.refresh();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogContent className={"p-10"}>
        <DialogTitle>هل انت متاكد من انك تريد حذف العنوان</DialogTitle>
        <DialogFooter className="flex gap-2.5">
          <DialogClose
            ref={closeRef}
            className={buttonVariants({ variant: "secondary" })}
          >
            لا
          </DialogClose>
          <Button
            variant={"destructive"}
            disabled={isDeleting}
            onClick={deleteAddress}
          >
            حذف العنوان
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>

      <DialogTrigger
        className={buttonVariants({
          variant: "destructive",
          className: "flex items-center gap-2",
        })}
      >
        <Trash2 className="w-4 h-4" />
      </DialogTrigger>
    </Dialog>
  );
};

export default DeleteAddressDialog;
