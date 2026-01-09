"use client";
import { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@/features/users/api";
import { Address } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addressFormValues, addressSchema } from "@/schema/AddressSchema";

interface AddressDialogProps {
  editingAddress?: Address | null;
  initialValues?: Address;
  children?: ReactNode;
}
export const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "الشرقية",
  "القليوبية",
  "كفر الشيخ",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "الإسماعيلية",
  "بورسعيد",
  "السويس",
  "المنيا",
  "بني سويف",
  "الفيوم",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
];
export const citiesByGovernorate: Record<string, string[]> = {
  القاهرة: [
    "مدينة نصر",
    "المعادي",
    "الزمالك",
    "التجمع الخامس",
    "مصر الجديدة",
    "شبرا",
    "العباسية",
  ],
  الجيزة: ["الدقي", "المهندسين", "الهرم", "6 أكتوبر", "الشيخ زايد", "فيصل"],
  الإسكندرية: ["المنتزه", "العجمي", "برج العرب", "سيدي جابر", "محرم بك"],
  الدقهلية: ["المنصورة", "طلخا", "دكرنس", "ميت غمر", "بلقاس"],
  الشرقية: [
    "الزقازيق",
    "بلبيس",
    "العاشر من رمضان",
    "منيا القمح",
    "أبو حماد",
    "كفر صقر",
  ],
};

export function AddressDialog({
  editingAddress,
  initialValues,
  children,
}: AddressDialogProps) {
  const form = useForm<addressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      address: initialValues?.address || "",
      apartment: initialValues?.apartment || "",
      governorate: initialValues?.governorate || "",
      city: initialValues?.city || "",
      phone: initialValues?.phone || "",
    },
  });

  const selectedGovernorate = form.watch("governorate");
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const handleGovernorateChange = async (value: string) => {
    form.setValue("governorate", value);
    form.setValue("city", ""); // reset city when governorate changes
  };
  const onSubmit = async (values: addressFormValues) => {
    const payload = initialValues
      ? { ...values, _id: initialValues._id }
      : values;
    const promise = initialValues
      ? User.updateAddress(payload as Address)
      : User.newAddress(payload);

    const loadingMessage = initialValues
      ? "جر تعديل العنوان"
      : "يتم اضافة العنوان";
    const errorMessage = initialValues
      ? "حصل مشكلة اثناء تعديل العنوان"
      : "حصل مشكلة في اضاقة العنوان";
    const successMessage = initialValues
      ? "تم تعديل العنوان بنجاج"
      : "تم اضافة العنوان بنجاح";
    toast.promise(promise, {
      loading: loadingMessage,
      error: (err) => {
        console.log(err);
        return errorMessage;
      },
      success: (res) => {
        router.refresh();
        form.reset({ ...res.data.data });
        closeRef.current?.click();
        return successMessage;
      },
    });
  };
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[500px] bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
          </DialogTitle>
          <DialogDescription>
            أدخل تفاصيل العنوان للشحن والفواتير.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="شارع، حي، معالم قريبة" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم المبنى/الشقة (اختياري)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="عمارة 5، شقة 12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                        disabled={!selectedGovernorate}
                      >
                        <SelectTrigger className="rounded-none shadow-none w-full">
                          <SelectValue
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

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+20 1234567890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose ref={closeRef} className={"hidden"}></DialogClose>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {initialValues ? "حفظ التعديلات" : "إضافة عنوان"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      {children}
    </Dialog>
  );
}
