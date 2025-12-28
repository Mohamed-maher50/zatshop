"use client";

import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SignupFormValues, signupSchema } from "@/schema/signupSchema";
import WithAuthIllustration from "./WithAuthIllustration";
import { AUTH_LINKS_ENUM } from "@/constants/Links";

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
    },
  });

  const handleEmailBlur = async (email: string) => {
    if (!email || !form.formState.errors.email) {
      setEmailError("");
      return;
    }

    try {
    } catch (error) {
      console.error("Error checking email:", error);
      setEmailError("");
    }
  };

  const handleSubmit = async (data: SignupFormValues) => {
    if (emailError) {
      return;
    }

    setIsLoading(true);
    try {
    } finally {
      setIsLoading(false);
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
                  <h1 className="text-2xl font-bold">Create Account</h1>
                  <p className="text-balance text-muted-foreground">
                    Sign up to get started
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-6"
                  >
                    {/* Full Name Field */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            {...field}
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            disabled={isLoading}
                          />
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
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            disabled={isLoading}
                            onBlur={(e) => {
                              field.onBlur();
                              handleEmailBlur(e.target.value);
                            }}
                          />
                          {emailError ? (
                            <p className="text-sm font-medium text-destructive">
                              {emailError}
                            </p>
                          ) : (
                            <FormMessage />
                          )}
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            disabled={isLoading}
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
                            disabled={isLoading}
                          />
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
                            Phone Number{" "}
                            <span className="text-muted-foreground">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            {...field}
                            id="phone"
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            disabled={isLoading}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !!emailError}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  Already have an account?
                  <Link
                    href={`/auth/${AUTH_LINKS_ENUM.SIGNIN_PAGE}`}
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
        By continuing, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
