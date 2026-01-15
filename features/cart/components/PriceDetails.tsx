import { Button } from "@/components/ui/button";
import Link from "next/link";
import ApplyCouponForm from "./ApplyCouponForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CartResponse } from "@/types/carts";
import { cart } from "../api/api";
import { arabicNumber } from "@/lib/arabicNumber";
import EmptyCartMessage from "@/components/EmptyCartMessage";

const PriceDetails = async () => {
  let cartItems: CartResponse | null = null;
  try {
    const cartRes = await cart.get("", {
      adapter: "fetch",
      fetchOptions: { cache: "no-store" },
    });
    cartItems = cartRes.data;
  } catch (error) {}

  if (!cartItems || cartItems.numOfCartItems == 0) return null;
  return (
    <div className="flex flex-col grow flex-1  gap-4">
      <Card className="bg-primary/2 px-0!  grow animate-in  duration-1000   fade-in   shadow-xs">
        <CardContent className="">
          <CardHeader className="my-2 px-0!">
            <CardTitle className="text-lg font-semibold">
              تطبيق كود الخصم
            </CardTitle>
          </CardHeader>
          <ApplyCouponForm appliedCoupon={cartItems.data.coupon} />
        </CardContent>
      </Card>
      <Card className=" grow px-0! animate-in slide-in-from-left-10 ease-in-out fade-in-50 duration-500 p-14 flex  flex-col bg-primary/2 shadow-xs max-sm:w-full ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold ">
            تفاصيل الفاتورة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex text-base flex-col gap-2">
            <CardContent className="flex items-center font-semibold justify-between">
              <CardHeader>
                <CardTitle className="text-nowrap">
                  المجموع الفرعي
                  <span className="text-xl font-bold mx-2">&#58;</span>
                </CardTitle>
              </CardHeader>

              <CardTitle className="text-base">
                {arabicNumber(cartItems.data.subtotal, "price")}
              </CardTitle>
            </CardContent>

            <CardContent
              // hidden={!cartItems.data.totalPriceAfterDiscount}
              className="flex  items-center font-semibold justify-between"
            >
              <CardHeader>
                <CardTitle className="text-nowrap">
                  اجمالي الخصم
                  <span className="text-xl font-bold mx-2">&#58;</span>
                </CardTitle>
              </CardHeader>
              <CardTitle className="text-base">
                {arabicNumber(
                  cartItems.data.subtotal -
                    cartItems.data.totalPriceAfterDiscount,
                  "price"
                )}
              </CardTitle>
            </CardContent>
            <CardFooter
              hidden={!cartItems.data.totalPriceAfterDiscount}
              className="flex font-semibold justify-between"
            >
              <CardHeader>
                <CardTitle className="text-nowrap">
                  المجموع بعد الخصم
                  <span className="text-xl font-bold mx-2">&#58;</span>
                </CardTitle>
              </CardHeader>
              <CardTitle className="text-base">
                {arabicNumber(cartItems.data.totalPriceAfterDiscount, "price")}
              </CardTitle>
            </CardFooter>
          </div>
        </CardContent>
        <CardFooter>
          <Link className="grow" href={`/cart/${cartItems.data._id}/checkout`}>
            <Button
              variant={"default"}
              className={"text-sm  grow   w-full font-semibold"}
              size={"lg"}
            >
              تأكيد الطلب
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PriceDetails;
