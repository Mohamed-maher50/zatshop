"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { applyCouponAction } from "@/app/actions/cart";

// Zod schema
const couponSchema = z.object({
  couponName: z
    .string()
    .min(1, "يرجى إدخال رمز الكوبون")
    .min(3, "رمز الكوبون يجب أن يكون 3 أحرف على الأقل"),
});

type CouponFormValues = z.infer<typeof couponSchema>;

const ApplyCouponForm = ({ appliedCoupon }: { appliedCoupon?: string }) => {
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      couponName: appliedCoupon,
    },
    disabled: !!appliedCoupon,
  });

  const onSubmit = async (values: CouponFormValues) => {
    const promise = applyCouponAction(values.couponName);
    toast.promise(promise, {
      loading: "جاري تطبيق الكوبون...",
      success: "تم تطبيق الكوبون بنجاح",
      error: (err) => " الكوبون غير صالح",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex  gap-2.5">
        <FormField
          control={form.control}
          name="couponName"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  {...field}
                  className="h-full p-2 text-sm! font-semibold ring-0"
                  placeholder="ادخل الكوبون"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className=""
          size="lg"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? "جاري التطبيق..." : "تطبيق الكوبون"}
        </Button>
      </form>
    </Form>
  );
};

export default ApplyCouponForm;
