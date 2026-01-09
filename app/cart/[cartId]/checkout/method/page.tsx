"use client";
import { refreshCart } from "@/app/actions/cart";
import { PAYMENT_METHODS, PaymentSelector } from "@/components/PaymentsMethods";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Orders } from "@/features/orders/api/api";
import { addressSchema } from "@/schema/AddressSchema";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const ChooseMethodsPage = () => {
  const form = useFormContext();
  const { cartId } = useParams();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  if (!cartId) {
    notFound();
  }
  const onSubmit = async () => {
    try {
      const shippingAddress = addressSchema.parse(form.getValues());
      if (selectedMethod === "cash") {
        const res = await Orders.createCashOrder({
          cartId: cartId as string,
          shippingAddress,
        });
        await refreshCart();
        setSelectedMethod("");
        form.reset({});
        router.push("/");
      }
    } catch (error) {
      toast.error("يانات الشحن غير مكتملة");
    }
  };
  return (
    <div className="flex h-full animate-in fade-in slide-in-from-right-10 duration-700 flex-col">
      <PaymentSelector
        methods={PAYMENT_METHODS}
        onChange={setSelectedMethod}
        value={selectedMethod}
      />
      <div className="flex w-full mt-auto max-md:mt-5 gap-1.5">
        <Button
          size="lg"
          onClick={onSubmit}
          disabled={!selectedMethod || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "جرى الدفع" : "الدفع"}

          <span hidden={!form.formState.isSubmitting}>
            <Spinner className="animate-spin" />
          </span>
        </Button>
        <Button
          onClick={() => router.back()}
          size="lg"
          variant={"secondary"}
          type="button"
        >
          العوده لصفحة العنوان
        </Button>
      </div>
    </div>
  );
};

export default ChooseMethodsPage;
