import { arabicNumber } from "@/lib/arabicNumber";
import { Cart, CartResponseItem } from "@/types/carts";

const ShippingSummary = ({
  items,
  cartInfo,
}: {
  items: CartResponseItem[];
  cartInfo: Cart;
}) => {
  return (
    <aside className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="border border-border p-6 bg-background sticky top-32 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 tracking-tight">
          ملخص الطلب
        </h3>

        <div className="divide-y divide-border">
          {items.map((i) => (
            <div key={i.variantSku} className="py-4 space-y-2">
              {/* Title + Price */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-snug">{i.title}</p>

                  {/* Variants */}
                  {Object.keys(i.variant.attributes).length > 0 && (
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
                  )}
                </div>

                {/* Price */}
                <span className="text-sm whitespace-nowrap font-medium">
                  {arabicNumber(i.price, "price")}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>الكمية</span>
                <span>{i.quantity}</span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  المجموع الفرعي
                </span>
                <span className="text-sm font-medium">
                  {arabicNumber(i.subtotal, "price")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-4 border-t border-border space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">المجموع الفرعي</span>
            <span>
              {arabicNumber(
                items.reduce((sum, i) => sum + i.subtotal, 0),
                "price"
              )}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">الشحن</span>
            <span>يتم احتسابه عند إتمام الدفع</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-base font-semibold">الإجمالي</span>
            <span className="text-xl font-bold">
              {arabicNumber(cartInfo.totalPriceAfterDiscount, "price")}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ShippingSummary;
