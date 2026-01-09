import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Container } from "@/components/Container";
import ShippingSummary from "@/components/ShippingSummary";
import { cart } from "@/features/cart/api/api";
import AddressFormProvider from "@/providers/AddressFormProvider";
import { AddressProvider } from "@/providers/AddressProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const CheckoutLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cartId: string }>;
}) => {
  const { cartId } = await params;
  const session = await getServerSession(NextAuthOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/cart/${cartId}/checkout`);
  }
  const cartRes = await cart.get("", {
    adapter: "fetch",
    fetchOptions: { cache: "force-cache" },
  });
  const cartItems = cartRes.data.data;
  if (!cartItems._id) {
    redirect("/cart");
  }
  return (
    <Container>
      <main className="min-h-screen">
        {/* Hero Section */}

        <section className=" mx-auto  pt-16 pb-8 text-center">
          <h1 className="text-4xl md:text-3xl font-bold tracking-tighter mb-4  duration-700">
            استكمل الطلب
          </h1>
          <p className=" text-lg mx-auto md:text-xl  fill-mode-both">
            يرجى تقديم بيانات الشحن الخاصة بك لاستلام البضائع الحصرية للتذكرة
            والمواد المادية للفعالية.
          </p>
        </section>

        <AddressProvider>
          <AddressFormProvider>
            <section className=" w-full  grid md:grid-cols-2 gap-12">
              {children}
              {/* Sidebar / Summary */}
              <ShippingSummary items={cartItems.items} cartInfo={cartItems} />
            </section>
          </AddressFormProvider>
        </AddressProvider>
        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 mt-12 text-center text-white/20 text-xs tracking-widest uppercase">
          © 2026 Vercel Inc. All rights reserved.
        </footer>
      </main>
    </Container>
  );
};

export default CheckoutLayout;
