"use client";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import { LoginFormValues, loginSchema } from "@/lib/zod/authSchema";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import WithAuthIllustration from "../WithAuthIllustration";
import { Spinner } from "../ui/spinner";

export function SigninForm({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const { status } = useSession();

  const isSessionLoading = status === "loading";
  async function onSubmit(values: LoginFormValues) {
    const loginReq = signIn("credentials", {
      email: values.email,
      password: values.password,
    });

    await new Promise((res) => {
      toast.promise(loginReq, {
        loading: "برجاء الانتظار",
        success: (s) => {
          return "تم التسجيل";
        },
        error: (err) => {
          return "خطاء تاكد من كلمة السر او البريد";
        },
        finally: res.bind(null, true),
      });
    });
  }

  return (
    <div className={cn("flex flex-col   gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <WithAuthIllustration>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">مرحبا بك</h1>
                  <p className="text-balance text-muted-foreground">
                    تسجيل الدخول لحسابك
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <Label htmlFor="email">البريد الالكتروني</Label>
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

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="grid gap-2">
                            <div className="flex items-center">
                              <Label htmlFor="password">كلمة السر</Label>
                            </div>
                            <FormControl>
                              <Input {...field} id="password" type="password" />
                            </FormControl>
                            <Link
                              href={`${AUTH_LINKS_ENUM.FORGOT_PASSWORD_PAGE}`}
                              className="ml-auto mx-1.5 underline text-sm underline-offset-2 hover:underline"
                            >
                              هل نسيت كملة السر ؟
                            </Link>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="rememberMe"
                              />
                            </FormControl>
                            <Label
                              htmlFor="rememberMe"
                              className="text-sm font-normal cursor-pointer"
                            >
                              تذكرني
                            </Label>
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
                          ? "جري التسيجل"
                          : " تسجيل الدخول "}
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={form.formState.isSubmitting || isSessionLoading}
                  >
                    Apple
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={form.formState.isSubmitting || isSessionLoading}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={form.formState.isSubmitting || isSessionLoading}
                  >
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don’t have an account?
                  <Link
                    href={AUTH_LINKS_ENUM.SIGNUP_PAGE}
                    className="underline mx-2 underline-offset-4"
                  >
                    Sign up
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
