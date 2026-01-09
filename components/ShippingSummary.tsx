import { arabicNumber } from "@/lib/arabicNumber";
import { Cart, CartResponse, CartResponseItem } from "@/types/carts";
import { Fragment } from "react/jsx-runtime";

const ShippingSummary = ({
  items,
  cartInfo,
}: {
  items: CartResponseItem[];
  cartInfo: Cart;
}) => {
  return (
    <aside className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="border  p-6 bg-background sticky top-32">
        <h3 className="text-lg font-semibold mb-6 tracking-tight">
          ملخص الطلب
        </h3>

        <div className="divide-y">
          {items.map((i) => (
            <div key={i.variantSku} className="py-4 space-y-2">
              {/* Title + Price */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-snug">{i.title}</p>

                  {/* Variants */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {Object.entries(i.variant.attributes).map(
                      ([variantName, value]) => (
                        <span key={variantName}>
                          {variantName}:{" "}
                          <span className="font-medium">{value}</span>
                        </span>
                      )
                    )}
                  </div>
                </div>

                <span className="text-sm  whitespace-nowrap">
                  {arabicNumber(i.price, "price")}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>الكمية</span>
                <span>{arabicNumber(i.quantity, "number")}</span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  المجموع الفرعي
                </span>
                <span className="text-sm">
                  {arabicNumber(i.subtotal, "price")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-4 border-t flex justify-between items-center">
          <span className="text-base font-semibold">الإجمالي</span>
          <span className="text-xl font-bold text-green-600">
            {arabicNumber(cartInfo.totalPriceAfterDiscount, "price")}
          </span>
        </div>

        {/* Trust badge */}
        {/* <div className="mt-6">
          <div className="flex items-center gap-3 text-xs p-3  border bg-muted/30">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            دفع آمن عبر Stripe
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default ShippingSummary;
