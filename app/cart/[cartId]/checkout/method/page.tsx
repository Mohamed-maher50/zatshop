"use client";
import { refreshCart } from "@/app/actions/cart";
import { PAYMENT_METHODS, PaymentSelector } from "@/components/PaymentsMethods";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { Orders } from "@/features/orders/api/api";
import {
  addressSchema,
  combineAddressOperationFormValues,
} from "@/schema/AddressSchema";
import { createOrderFormValues, orderSchema } from "@/schema/OrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldErrors, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";

const ChooseMethodsPage = () => {
  const form = useFormContext<combineAddressOperationFormValues>();
  const { cartId } = useParams<{ cartId: string | undefined }>();
  const orderForm = useForm<createOrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      shippingAddress: form.getValues(),
      cardId: cartId,
    },
  });
  useEffect(() => {
    (async () => {
      const isValidAddress = await form.trigger();
      if (!isValidAddress) {
        router.push(`/cart/${cartId}/checkout`);
        form.clearErrors();
      }
    })();
  }, []);
  const router = useRouter();
  if (!cartId) {
    notFound();
  }

  const onSubmit = async (data: createOrderFormValues) => {
    try {
      const shippingAddress = addressSchema.parse(form.getValues());
      if (data.method === "cash") {
        const res = await Orders.createCashOrder({
          cartId: cartId as string,
          shippingAddress,
        });
        await refreshCart();
        form.reset({});
        toast.success("تم انشاء الطلب");
        router.push("/");
      } else {
        const session = await Orders.createCardOrder({
          cartId: cartId,
          shippingAddress,
        });
        console.log(session);
        if (session.data.session.url) router.replace(session.data.session.url);
      }
    } catch (error) {
      console.log(error);
      toast.error("يانات الشحن غير مكتملة");
    }
  };
  const onInValidFields = (fields: FieldErrors<createOrderFormValues>) => {
    if (fields.cardId) toast.error(fields.cardId?.message);
  };
  return (
    <Form {...orderForm}>
      <form
        onSubmit={orderForm.handleSubmit(onSubmit, onInValidFields)}
        className="flex h-full animate-in fade-in slide-in-from-right-10 duration-700 flex-col"
      >
        <FormField
          control={orderForm.control}
          name="method"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <PaymentSelector
                    methods={PAYMENT_METHODS}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex w-full mt-auto max-md:mt-5 gap-1.5">
          <Button
            size="lg"
            type="submit"
            className={"px-12"}
            disabled={orderForm.formState.isSubmitting}
          >
            {orderForm.formState.isSubmitting ? "جرى الدفع" : "تأكيد الشحن "}

            <span hidden={!orderForm.formState.isSubmitting}>
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
      </form>
    </Form>
  );
};

export default ChooseMethodsPage;
