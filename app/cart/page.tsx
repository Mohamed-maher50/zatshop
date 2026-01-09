import { Button, buttonVariants } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Cancel } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cart } from "@/features/cart/api/api";
import { arabicNumber } from "@/lib/arabicNumber";
import QuantityInput from "@/features/products/components/QuantityInput";
import ApplyCouponForm from "@/features/cart/components/ApplyCouponForm";
import { Badge } from "@/components/ui/badge";
import DeleteProductCart from "@/features/cart/components/DeleteProductCart";
import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { CartResponse } from "@/types/carts";
import EmptyCartMessage from "@/components/EmptyCartMessage";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = async () => {
  let cartItems: CartResponse | null = null;
  try {
    const cartRes = await cart.get("", {
      adapter: "fetch",
      fetchOptions: { cache: "no-store" },
    });
    cartItems = cartRes.data;
  } catch (error) {}

  if (!cartItems || cartItems.numOfCartItems == 0) return <EmptyCartMessage />;
  return (
    <div className="pt-5">
      <div className="py-12.5">
        <h2 className="text-natural-800 font-semibold text-2xl">
          العربة ( {arabicNumber(cartItems.numOfCartItems || 0, "number")} منتج
          )
        </h2>
        <div className="last:border-b-red-600 sm:hidden last:border">
          {cartItems.data.items.map((product) => {
            return (
              <div
                key={product.variantSku}
                className="flex gap-5   last:border-red-400 relative w-fit  border-b p-10"
              >
                <div>
                  <Image
                    src={product.image}
                    alt=""
                    width={99}
                    height={99}
                    className="w-24.75 h-24.75 "
                  />
                </div>
                <div className="">
                  <DeleteProductCart
                    sku={product.variantSku}
                    title={product.title}
                  />

                  <h1 className="text-base font-bold">{product.title}</h1>
                  <div className="flex gap-1">
                    {Object.entries(product.variant.attributes).map(
                      ([variantName, value]) => {
                        return (
                          <Fragment key={value}>
                            <span className="">{variantName}:</span>
                            <span className="text-muted-foreground">
                              {value}
                            </span>
                          </Fragment>
                        );
                      }
                    )}
                  </div>
                  <div className="flex justify-between mt-3 gap-1">
                    <span className="font-bold text-xl">
                      {arabicNumber(product.price, "price")}
                    </span>
                    <span>
                      <QuantityInput
                        variantSku={product.variantSku}
                        initialQuantity={product.quantity}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="max-sm:hidden">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow className="border-b-primary">
                <TableHead className="text-start">
                  <span
                    className={buttonVariants({
                      variant: "ghost",
                      className: "cursor-default! hover:bg-transparent",
                    })}
                  >
                    <HugeiconsIcon icon={Cancel} />
                  </span>
                </TableHead>
                <TableHead className="text-start">الصوره</TableHead>
                <TableHead className="text-start">المنتج</TableHead>
                <TableHead className="text-start">السعر</TableHead>
                <TableHead className="text-start">الكمية</TableHead>
                <TableHead className="text-start">المجموع الفرعي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm  font-semibold">
              {cartItems.data.items.map((product) => {
                return (
                  <TableRow
                    key={product.variantSku}
                    className="   border-b-primary "
                  >
                    <TableCell className="text-destructive ">
                      <DeleteProductCart
                        sku={product.variantSku}
                        title={product.title}
                      />
                    </TableCell>
                    <TableCell className="relative min-w-30 min-h-35">
                      <Image
                        src={product.image}
                        alt="sdf"
                        width={120}
                        height={140}
                        className="object-cover"
                      />
                    </TableCell>
                    <TableCell className="max-w-full my-auto h-full!  gap-1.5 shrink-0 w-fit text-natural-800 font-semibold text-sm whitespace-pre-wrap text-justify">
                      {product.title}
                      <div className="flex gap-0.5  flex-wrap">
                        {Object.entries(product.variant.attributes).map(
                          ([_, value]) => {
                            return (
                              <Badge key={value} variant={"outline"}>
                                {value}
                              </Badge>
                            );
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {arabicNumber(product.price, "price")}
                    </TableCell>
                    <TableCell>
                      <QuantityInput
                        variantSku={product.variantSku}
                        initialQuantity={product.quantity}
                      />
                    </TableCell>
                    <TableCell className="text-primary">
                      {arabicNumber(product.subtotal, "price")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {cartItems && (
          <ApplyCouponForm appliedCoupon={cartItems.data?.coupon} />
        )}
        <div className=" p-14 flex  flex-col bg-secondary max-sm:w-full sm:w-125">
          <span className="text-natural-800 text-xl font-semibold ">
            اجمالي العربة
          </span>
          <div className="py-10">
            <div className="flex  text-base flex-col gap-2">
              <div className="flex font-semibold justify-between">
                <span className="">المجموع الفرعي :</span>
                <span>{arabicNumber(cartItems.data.subtotal, "price")}</span>
              </div>

              <div
                hidden={!cartItems.data.totalPriceAfterDiscount}
                className="flex font-semibold justify-between"
              >
                <span className="">اجمالي الخصم :</span>
                <span className="text-green-500">
                  {arabicNumber(
                    cartItems.data.subtotal -
                      cartItems.data.totalPriceAfterDiscount,
                    "price"
                  )}
                </span>
              </div>
              <div
                hidden={!cartItems.data.totalPriceAfterDiscount}
                className="flex font-semibold justify-between"
              >
                <span className="text-green-500">الاجمالي بعد الخصم :</span>
                <span className="text-green-500">
                  {arabicNumber(
                    cartItems.data.totalPriceAfterDiscount,
                    "price"
                  )}
                </span>
              </div>
            </div>
          </div>
          <Link href={`/cart/${cartItems.data._id}/checkout`}>
            <Button
              variant={"default"}
              className={"text-sm font-semibold"}
              size={"lg"}
            >
              اطلب
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
