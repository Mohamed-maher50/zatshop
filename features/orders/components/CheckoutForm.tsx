"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import shallowequal from "shallowequal";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  citiesByGovernorate,
  governorates,
} from "@/components/settings/forms/AddressDialog";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/features/users/api";
import { toast } from "sonner";
import { combineAddressOperationFormValues } from "@/schema/AddressSchema";

const formSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "اسم العائلة مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  apartment: z.string().optional(),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  phone: z.string().min(11, "رقم الهاتف مطلوب"),
});
export type ShippingValues = z.infer<typeof formSchema>;

export function ShippingForm() {
  useState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useFormContext<combineAddressOperationFormValues>();
  const isPaying = Boolean(true && form.formState.isSubmitting);
  const isSavingAddress = Boolean(true && form.formState.isSubmitting);

  const router = useRouter();
  const params = useParams();
  const isNewAddress = form.watch("isNewAddress");

  const onSubmit = async (data: ShippingValues) => {
    setIsSubmitting(true);
    if (!isNewAddress) {
      router.push(`/cart/${params.cartId}/checkout/method`);
      setIsSubmitting(false);
    } else {
      const newAddressRequest = User.newAddress(data);
      await new Promise((res) => {
        toast.promise(newAddressRequest, {
          success: (res) => {
            const address = res.data.data.find((address) => {
              const { _id, ...otherFields } = address;
              return shallowequal(data, otherFields);
            });
            if (address) {
              sessionStorage.removeItem("shippingAddress");
              form.reset(address);
            }
            return "تم حفظ العنوان";
          },
          error: "حدث خطاء اثناء الحفظ",
          loading: "جرى حفظ العنوان",

          finally() {
            setIsSubmitting(false);
            router.push(`/cart/${params.cartId}/checkout/method`);
            res(true);
          },
        });
      });
    }
  };
  const handleGovernorateChange = async (value: string) => {
    form.setValue("governorate", value);
  };

  const selectedGovernorate = form.watch("governorate");
  const availableCities = citiesByGovernorate[selectedGovernorate];
  const isInputDisabled = !isNewAddress;

  const submitText = isPaying
    ? "جاري الدفع..."
    : isSavingAddress
    ? "جاري حفظ العنوان..."
    : !isNewAddress
    ? "دفع"
    : "حفظ العنوان و متابعة الدفع";
  return (
    <form
      dir="rtl"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 mt-4 h-full min-h-full duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم الأول</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="أحمد"
                  disabled={field.disabled || isInputDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم العائلة</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="محمد"
                  disabled={field.disabled || isInputDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6 ">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[10px] font-bold uppercase tracking-widest">
                عنوان الشارع
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="١٢٣ شارع فيرسيل"
                  className=" transition-all  "
                  {...field}
                  disabled={field.disabled || isInputDisabled}
                />
              </FormControl>
              <FormMessage className="text-[10px] uppercase tracking-tighter" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="governorate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>المحافظة</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={handleGovernorateChange}
                      disabled={field.disabled || isInputDisabled}
                    >
                      <SelectTrigger className="rounded-none shadow-none w-full">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none">
                        {governorates.map((gov) => (
                          <SelectItem
                            className="rounded-none"
                            key={gov}
                            value={gov}
                          >
                            {gov}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {
            <FormField
              name="city"
              key={selectedGovernorate}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدينة</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={field.disabled || isInputDisabled}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none shadow-none w-full">
                        <SelectValue
                          dir="rtl"
                          placeholder="اختر المدينة"
                          className="rounded-none"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
                      {availableCities?.map((city) => (
                        <SelectItem
                          className="rounded-none"
                          key={city}
                          value={city}
                        >
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>رقم الهاتف</FormLabel>

                <FormControl>
                  <Input
                    type="tel"
                    dir="rtl"
                    placeholder="أدخل رقم الهاتف ٠١٢٣٤٥٦٧٨٩"
                    className=" transition-all "
                    {...field}
                    disabled={field.disabled || isInputDisabled}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase tracking-tighter" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>رقم المبنى/الشقة (اختياري)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="عمارة 5، شقة 12"
                    disabled={field.disabled || isInputDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="pt-6 border-t mt-auto border-white/5">
        <Button
          type="submit"
          className="w-full h-14 font-bold uppercase tracking-widest  transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {form.formState.isSubmitting && <Spinner className="animate-spin" />}
          <span className="animate animate-in fade-in">{submitText}</span>
        </Button>
        <p className="text-[10px] text-center mt-4 uppercase tracking-widest">
          بحفظ عنوانك، فإنك توافق على شروط الخدمة الخاصة بنا
        </p>
      </div>
    </form>
  );
}
