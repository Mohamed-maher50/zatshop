"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { updatePasswordSchema } from "@/schema/UpdatePasswordSchema";
import { User } from "@/features/users/api";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import axios from "axios";

const UpdatePasswordForm = () => {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onPasswordSubmit(
    values: z.infer<typeof updatePasswordSchema>
  ) {
    const promise = User.updatePassword(values);
    toast.promise(promise, {
      loading: "يتم التنفيذ",
      success: () => {
        signOut({ callbackUrl: AUTH_LINKS_ENUM.SIGNIN_PAGE });
        return "تم تغيير كلمة السر بنجاح";
      },
      error: (err) => {
        console.log(err);
        if (axios.isAxiosError(err)) {
          if (err.status === 400) {
            return "كلمة السر غير صحيحه";
          }
        }
        return "حصل مشكلة لم يتم التحديث";
      },
    });
  }

  return (
    <Card className="bg-card border-border">
      {/* UpdatePasswordForm */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          تغيير كلمة المرور
        </CardTitle>
        <CardDescription>
          تأكد من أن حسابك يستخدم كلمة مرور قوية وطويلة للحفاظ على الأمان.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onPasswordSubmit)}
            className="space-y-4 max-w-md"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور الحالية</FormLabel>
                  <Input {...field} type="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور الجديدة</FormLabel>
                  <Input {...field} type="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                  <Input {...field} type="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                form.formState.isSubmitting ||
                form.formState.disabled ||
                !form.formState.isDirty
              }
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              تحديث كلمة المرور
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
