"use client";
import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  forgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schema/forgotPasswordSchema";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import { toast } from "sonner";
import { ForgotPassword } from "@/features/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import WithAuthIllustration from "../WithAuthIllustration";

interface ForgotPasswordFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({
  className,
  onSubmit,
  ...props
}: ForgotPasswordFormProps) {
  const form = useForm<forgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const router = useRouter();
  const handleSubmit = async (data: forgotPasswordFormValues) => {
    const req = ForgotPassword(data);
    toast.promise(req, {
      loading: "جارٍ التحقق من البريد الإلكتروني...",
      success: () => {
        form.control._disableForm(true);
        setTimeout(() => {
          router.replace(
            `${AUTH_LINKS_ENUM.FORGOT_VERIFICATION_PAGE}?email=${data.email}`
          );
        }, 500);
        return "تم إرسال رابط إعادة تعيين كلمة المرور";
      },
      error: () => {
        return "البريد الإلكتروني غير مسجل";
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0 min-h-100 ">
        <CardContent className="grid items-center p-0 md:grid-cols-2">
          <WithAuthIllustration>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Forgot Password?</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email to reset your password
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "جري تنفيذ الطلب"
                        : "Send Reset Link"}
                    </Button>
                  </form>
                </Form>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Check your email for a password reset link. It may take a
                    few minutes to arrive.
                  </p>
                </div>

                <div className="text-center text-sm">
                  Remember your password?
                  <Link
                    href={`${AUTH_LINKS_ENUM.SIGNIN_PAGE}`}
                    className="underline mx-2 underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </WithAuthIllustration>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
