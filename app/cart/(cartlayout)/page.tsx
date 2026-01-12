import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Image from "next/image";
import { cart } from "@/features/cart/api/api";
import { arabicNumber } from "@/lib/arabicNumber";
import QuantityInput from "@/features/products/components/QuantityInput";
import { Badge } from "@/components/ui/badge";
import DeleteProductCart from "@/features/cart/components/DeleteProductCart";
import { Fragment } from "react/jsx-runtime";
import { CartResponse } from "@/types/carts";
import EmptyCartMessage from "@/components/EmptyCartMessage";
import { getServerSession } from "next-auth";
import { NextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = async () => {
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/cart`);
  }
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
    <div className="space-y-4">
      <div className="flex items-center  font-semibold text-xl justify-between ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          العربة
        </h3>
        <span className="text-muted-foreground">
          عدد المنتجات {arabicNumber(cartItems.numOfCartItems || 0, "number")}
        </span>
      </div>

      <div className="">
        {cartItems.data.items.map((product) => {
          return (
            <Card
              key={product.variantSku}
              className="  flex! w-full  sm:flex-row!  sm:items-center border-b-primary "
            >
              <CardContent className="flex   grow items-center justify-start  font-semibold text-sm  text-justify">
                <div className="relative min-w-[100px] min-h-[100px]">
                  <Image
                    src={product.image}
                    alt="sdf"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-nowrap">{product.title}</CardTitle>
                  <div className="flex gap-0.5 flex-col  flex-wrap">
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
                </CardHeader>
              </CardContent>
              <div className=" gap-5 px-4  flex items-center justify-between">
                <div>
                  <QuantityInput
                    variantSku={product.variantSku}
                    initialQuantity={product.quantity}
                  />
                </div>
                <div className="text-base text-muted-foreground font-semibold">
                  {arabicNumber(product.price, "price")}
                </div>

                <div className="text-destructive ">
                  <DeleteProductCart
                    sku={product.variantSku}
                    title={product.title}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
