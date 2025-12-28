"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import WithAuthIllustration from "./WithAuthIllustration";
import {
  resetPasswordFormValues,
  resetPasswordSchema,
} from "@/schema/resetPasswordSchema";

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const form = useForm<resetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: resetPasswordFormValues) => {
    try {
    } finally {
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <WithAuthIllustration url="/Gemini_Generated_Image_mxjuirmxjuirmxju.png">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset Password</h1>
                  <p className="text-balance text-muted-foreground">
                    Create a new password for your account
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <Label htmlFor="password">New Password</Label>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Enter new password"
                          />
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
                            Confirm Password
                          </Label>
                          <Input
                            {...field}
                            id="passwordConfirm"
                            type="password"
                            placeholder="Re-enter password"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      {form.formState.isSubmitting
                        ? "Resetting Password..."
                        : "Reset Password"}
                    </Button>
                  </form>
                </Form>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Your password has been reset successfully. You can now sign
                    in with your new password.
                  </p>
                  <Link
                    href={`/auth/${AUTH_LINKS_ENUM.SIGNIN_PAGE}`}
                    className="underline text-primary text-sm mt-4 inline-block underline-offset-4"
                  >
                    Go to Sign In
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
