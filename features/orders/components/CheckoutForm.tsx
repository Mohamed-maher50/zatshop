"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useAddress } from "@/providers/AddressProvider";
import { Spinner } from "@/components/ui/spinner";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "اسم العائلة مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  apartment: z.string().optional(),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  phone: z.string().min(11, "رقم الهاتف مطلوب"),
});

type ShippingValues = z.infer<typeof formSchema>;

export function ShippingForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { selectedAddress } = useAddress();

  const form = useFormContext<ShippingValues>();
  const selectedGovernorate = form.watch("governorate");
  const isPaying = Boolean(selectedAddress && form.formState.isSubmitting);
  const isSavingAddress = Boolean(
    !selectedAddress && form.formState.isSubmitting
  );
  const router = useRouter();
  const params = useParams();
  React.useEffect(() => {
    return form.setValue("city", selectedAddress?.city || "");
  }, [selectedGovernorate]);

  const onSubmit = async (data: ShippingValues) => {
    if (selectedAddress) {
      router.push(`/cart/${params.cartId}/checkout/method`);
    }
  };
  const handleGovernorateChange = async (value: string) => {
    form.setValue("governorate", value);
    form.setValue("city", ""); // reset city when governorate changes
  };

  const submitText = isPaying
    ? "جاري الدفع..."
    : isSavingAddress
    ? "جاري حفظ العنوان..."
    : selectedAddress
    ? "دفع"
    : "حفظ العنوان و متابعة الدفع";
  return (
    <form
      dir="rtl"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8  duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم الأول</FormLabel>
              <FormControl>
                <Input {...field} placeholder="أحمد" />
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
                <Input {...field} placeholder="محمد" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
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
                />
              </FormControl>
              <FormMessage className="text-[10px] uppercase tracking-tighter" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="governorate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المحافظة</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={handleGovernorateChange}
                    disabled={field.disabled}
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
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المدينة</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedGovernorate || field.disabled}
                  >
                    <SelectTrigger className="rounded-none shadow-none w-full">
                      <SelectValue
                        dir="rtl"
                        placeholder="اختر المدينة"
                        className="rounded-none"
                      />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {selectedGovernorate &&
                        citiesByGovernorate[selectedGovernorate]?.map(
                          (city) => (
                            <SelectItem
                              className="rounded-none"
                              key={city}
                              value={city}
                            >
                              {city}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
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
                  <Input {...field} placeholder="عمارة 5، شقة 12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 font-bold uppercase tracking-widest  transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {form.formState.isSubmitting && <Spinner className="animate-spain" />}
          {submitText}
        </Button>
        <p className="text-[10px] text-center mt-4 uppercase tracking-widest">
          بحفظ عنوانك، فإنك توافق على شروط الخدمة الخاصة بنا
        </p>
      </div>
    </form>
  );
}
