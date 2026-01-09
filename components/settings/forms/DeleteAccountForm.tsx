import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import { User } from "@/features/users/api";
import { Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const DeleteAccountForm = () => {
  const deleteAccount = () => {
    const promise = User.deleteAccount();
    toast.promise(promise, {
      loading: "بيتم تنفيذ الحذف",
      success: () => {
        signOut({ callbackUrl: AUTH_LINKS_ENUM.SIGNIN_PAGE });
        return "تم حذف الحساب";
      },
      error: "حصل مشكلة",
    });
  };
  return (
    <Dialog>
      <DialogContent className={"p-10"}>
        <DialogTitle>هل انت متاكد من انك تريد حذف الحساب</DialogTitle>
        <DialogFooter className="flex gap-2.5">
          <DialogClose>
            <Button variant={"secondary"}>اغلاق</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={deleteAccount}>
            حذف الحساب
          </Button>
        </DialogFooter>
      </DialogContent>
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-destructive">
            المنطقة الخطرة
          </CardTitle>
          <CardDescription>
            بمجرد حذف حسابك، لا يمكن التراجع عن ذلك. يرجى التأكد قبل المتابعة.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DialogTrigger
            className={buttonVariants({
              variant: "destructive",
              className: "flex items-center gap-2",
            })}
          >
            <Trash2 className="w-4 h-4" />
            حذف الحساب
          </DialogTrigger>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default DeleteAccountForm;
