"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  verificationFormValues,
  verificationSchema,
} from "@/schema/verificationSchema";
import { AUTH_LINKS_ENUM } from "@/constants/Links";
import WithAuthIllustration from "./WithAuthIllustration";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface OTPFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const OTPInputSlots = () =>
  Array.from({ length: 6 }, (_, idx) => <InputOTPSlot key={idx} index={idx} />);
export function VerificationForm({ className, ...props }: OTPFormProps) {
  const form = useForm<verificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      resetCode: "",
    },
  });
  const email = "mm2517608@gmail.com";

  const handleSubmit = async (data: verificationFormValues) => {
    try {
    } finally {
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 items-center md:grid-cols-2">
          <WithAuthIllustration url="/verification_otp.jpg">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Verify OTP</h1>
                  <p className="text-balance text-muted-foreground">
                    {email
                      ? `Enter the 6-digit code sent to ${email}`
                      : "Enter the 6-digit code sent to your email"}
                  </p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex items-center flex-col gap-6"
                  >
                    {/* OTP Field */}
                    <FormField
                      control={form.control}
                      name="resetCode"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel className="text-center block w-fit mx-auto">
                            One-Time Password
                          </FormLabel>
                          <InputOTP
                            maxLength={6}
                            {...field}
                            pattern={REGEXP_ONLY_DIGITS}
                          >
                            <InputOTPGroup>
                              <OTPInputSlots />
                            </InputOTPGroup>
                          </InputOTP>
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
                        ? "Verifying..."
                        : "Verify OTP"}
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  Did not receive the code?
                  <Link
                    href={`/auth/${AUTH_LINKS_ENUM.FORGOT_PASSWORD_PAGE}`}
                    className="underline mx-2 underline-offset-4"
                  >
                    Resend
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
