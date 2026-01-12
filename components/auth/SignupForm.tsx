"use client";

import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SignupFormValues, signupSchema } from "@/schema/signupSchema";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import WithAuthIllustration from "../WithAuthIllustration";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { User } from "@/features/users/api";
import { useRouter } from "next/navigation";

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
  });

  const router = useRouter();
  const handleSubmit = async (data: SignupFormValues) => {
    try {
      const signupRequest = User.signup(data);
      await new Promise((res) => {
        toast.promise(signupRequest, {
          loading: "برجاء الانتظار",
          success: (s) => {
            router.replace(AUTH_LINKS_ENUM.SIGNIN_PAGE);
            return "تم انشاء الحساب";
          },
          error: (err) => {
            return "خطاء تاكد من كلمة السر او البريد";
          },
          finally: res.bind(null, true),
        });
      });

      // Add your signup logic here
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <WithAuthIllustration>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">إنشاء حساب</h1>
                  <p className="text-balance text-muted-foreground">
                    سجّل الآن للبدء
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col gap-6">
                      {/* Full Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="fullName">الاسم الكامل</Label>
                            <FormControl>
                              <Input
                                {...field}
                                id="fullName"
                                type="text"
                                placeholder="أدخل اسمك الكامل"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <FormControl>
                              <Input
                                {...field}
                                id="email"
                                type="email"
                                className="font-sans"
                                placeholder="m@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <FormControl>
                              <Input
                                {...field}
                                id="password"
                                type="password"
                                placeholder="أدخل كلمة المرور"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Confirmation Field */}
                      <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="passwordConfirm">
                              تأكيد كلمة المرور
                            </Label>
                            <FormControl>
                              <Input
                                {...field}
                                id="passwordConfirm"
                                type="password"
                                placeholder="أعد إدخال كلمة المرور"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone Field */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="phone">
                              رقم الهاتف{" "}
                              <span className="text-muted-foreground">
                                (اختياري)
                              </span>
                            </Label>
                            <FormControl>
                              <Input
                                {...field}
                                id="phone"
                                type="tel"
                                dir="rtl"
                                placeholder="أدخل رقم الهاتف ٠١٢٣٤٥٦٧٨٩"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        className="w-full"
                        type="submit"
                        disabled={
                          form.formState.isSubmitting ||
                          form.formState.isLoading
                        }
                      >
                        <span hidden={!form.formState.isSubmitting}>
                          <Spinner className="animate animate-spin" />
                        </span>
                        {form.formState.isSubmitting
                          ? "جاري إنشاء الحساب..."
                          : "إنشاء حساب"}
                      </Button>
                    </div>
                  </form>
                </Form>

                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div> */}

                <div className="grid items-center justify-center gap-4">
                  {/* <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Apple
                  </Button> */}
                  {/* <Button
                    variant="outline"
                    type="button"
                    size={"lg"}
                    disabled={form.formState.isSubmitting}
                  >
                    Google
                  </Button> */}
                  {/* <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    GitHub
                  </Button> */}
                </div>

                <div className="text-center text-sm">
                  لديك حساب بالفعل؟
                  <Link
                    href={AUTH_LINKS_ENUM.SIGNIN_PAGE}
                    className="underline mx-2 underline-offset-4"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </div>
          </WithAuthIllustration>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        بالمتابعة، أنت توافق على <a href="#">شروط الخدمة</a> و{" "}
        <a href="#">سياسة الخصوصية</a>.
      </div>
    </div>
  );
}
