import { Container } from "@/components/Container";
import { ShippingForm } from "@/features/orders/components/CheckoutForm";

const page = () => {
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

        {/* Main Content */}
        <section className=" w-full  grid md:grid-cols-2 gap-12">
          <div className=" space-y-12">
            <span className="shrink-0 w-8 h-8font-mono flex items-center justify-center rounded-sm text-sm font-bold">
              {Number(1).toLocaleString()}
            </span>
            <div className="space-y-6 w-full">
              <h2 className="text-2xl font-bold tracking-tight pt-1">
                عنوان الشحن
              </h2>
              <ShippingForm />
            </div>
          </div>
          {/* Sidebar / Summary */}
          <aside className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000">
            <div className="border p-6 backdrop-blur-sm sticky top-32">
              <h3 className="text-lg font-bold mb-6 tracking-tight">
                ملخص الطلب
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Conference Swag Kit</p>
                    <p className="text-xs ">Limited Edition 2025</p>
                  </div>
                  <p className="text-sm font-mono">$45.00</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center uppercase tracking-widest text-[10px] font-bold text-white/40">
                  <span>Subtotal</span>
                  <span className="text-sm">$45.00</span>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-white/40 bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 mt-12 text-center text-white/20 text-xs tracking-widest uppercase">
          © 2026 Vercel Inc. All rights reserved.
        </footer>
      </main>
    </Container>
  );
};

export default page;
