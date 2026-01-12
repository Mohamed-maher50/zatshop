import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import MobileOrdersFiltration from "@/components/settings/MobileOrdersFiltration";
import { OrderFilters } from "@/components/settings/order-filters";
import { Orders } from "@/features/orders/api/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Package, Truck, CreditCard, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { arabicDate, arabicNumber } from "@/lib/arabicNumber";

import { HugeiconsIcon } from "@hugeicons/react";
import { ContainerTruck02Icon } from "@hugeicons/core-free-icons";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import RestQueryButton from "@/components/RestQueryButton";
import { cn } from "@/lib/utils";

const arabicPaymentMethods = {
  cash: "نقداً",
  card: "كارت بنكي",
};
const page = async ({ searchParams }: { searchParams: Promise<string> }) => {
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/settings/orders`);
  }
  const searchParamsFields = await searchParams;
  const search = new URLSearchParams(searchParamsFields);
  const ordersResponse = await Orders.getAll(`?${search}`);
  let orders = ordersResponse.data.data;
  return (
    <>
      <div className="hidden md:block">
        <OrderFilters />
      </div>
      <div className="md:hidden">
        <MobileOrdersFiltration />
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">سجل الطلبات</h2>
        <Empty hidden={!!orders.length} className="min-h-96">
          <EmptyHeader>
            <EmptyMedia variant="default">
              <HugeiconsIcon className="size-8" icon={ContainerTruck02Icon} />
            </EmptyMedia>
            <EmptyTitle hidden={!search.toString()}> لا توجد نتائج</EmptyTitle>
            <EmptyTitle hidden={!!search.toString()}>
              لا توجد طلبات حتى الآن
            </EmptyTitle>
            <EmptyDescription hidden={!search.toString()}>
              لا توجد طلبات مطابقة للفلاتر المحددة. جرّب تعديل الفلاتر أو إعادة
              تعيينها.
            </EmptyDescription>
            <EmptyDescription hidden={!!search.toString()}>
              لم تقم بإنشاء أي طلبات بعد. ستظهر طلباتك هنا فور إتمام أول عملية
              شراء.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <RestQueryButton variant={"outline"} hidden={!search.toString()}>
              مسح الفلتر
            </RestQueryButton>
          </EmptyContent>
        </Empty>
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="bg-card border-border overflow-hidden"
            >
              <CardHeader className=" pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        رقم الطلب
                      </span>
                      <span className="text-sm font-bold font-mono">
                        {order._id}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      تاريخ الانشاء
                      {arabicDate.format(new Date(order.createdAt))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={order.isDelivered ? "default" : "secondary"}
                      className="px-3"
                    >
                      {order.isDelivered ? (
                        <Package className="w-3 h-3 mr-1" />
                      ) : (
                        <Truck className="w-3 h-3 mr-1" />
                      )}
                      {order.isDelivered ? "تم التوصيل" : "قيد الوصول"}
                    </Badge>
                    <Badge variant="outline" className="px-3">
                      {arabicPaymentMethods[order.paymentMethodType]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {order.cartItems.map((item) => (
                    <div
                      key={item.variantSku}
                      className="p-4 flex gap-4 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          الكمية: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-sm">
                        {arabicNumber(item.subtotal, "price")}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="p-4 grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> عنوان الشحن
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {order.shippingAddress.address}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                        <CreditCard className="w-3 h-3" /> طريقة الدفع
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {arabicPaymentMethods[order.paymentMethodType]}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                    {/* <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${order..toFixed(2)}</span>
                  </div> */}
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>الضرائب</span>
                      <span>{arabicNumber(order.taxPrice, "price")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span> تكلفة الشحن</span>
                      <span>
                        {order.shippingPrice === 0
                          ? "مجاني"
                          : `${arabicNumber(
                              +order.shippingPrice.toFixed(2),
                              "price"
                            )}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span> الاجمالي</span>
                      <span
                        className={cn(
                          order.totalOrderPrice != order.subtotal &&
                            "text-red-400"
                        )}
                      >
                        {order.subtotal === 0
                          ? "مجاني"
                          : `${arabicNumber(
                              +order.subtotal?.toFixed(2),
                              "price"
                            )}`}
                      </span>
                    </div>
                    <div
                      hidden={order.totalOrderPrice === order.subtotal}
                      className="flex justify-between text-xs text-muted-foreground"
                    >
                      <span> الخصم</span>
                      <span className="text-green-500">
                        {`${arabicNumber(
                          order.totalOrderPrice - order.subtotal || 0,
                          "price"
                        )}`}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-green-500 font-bold text-lg">
                      <span>الاجمالي</span>
                      <span>
                        {arabicNumber(order.totalOrderPrice, "price")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 hidden pt-0 bg-card">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto gap-2 text-xs h-9 uppercase font-bold tracking-widest bg-transparent"
                >
                  View Order Details <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
