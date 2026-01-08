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
import { ReactNode, useRef, useState } from "react";
import { toast } from "sonner";
import { Reviews } from "../api/api";

const DeleteReviewDialog = ({
  reviewId,
  children,
}: {
  children?: ReactNode;
  reviewId: string;
}) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteReview = async () => {
    setIsDeleting(true);
    try {
      const res = await Reviews.deleteReview(reviewId);
      console.log(res);
      toast.success("تم حذف التقييم");
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
        <DialogTitle>هل انت متاكد من انك تريد حذف التقييم</DialogTitle>
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
            onClick={deleteReview}
          >
            حذف العنوان
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>

      {children}
    </Dialog>
  );
};

export default DeleteReviewDialog;
