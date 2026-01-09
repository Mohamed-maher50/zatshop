import CarouselAddresses from "@/components/CarouselAddresses";
import { ShippingForm } from "@/features/orders/components/CheckoutForm";
import { User } from "@/features/users/api";

const page = async () => {
  const addressesResponse = await User.getAddresses();
  const { data } = addressesResponse;
  return (
    <>
      {/* Main Content */}
      <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
        <span className="shrink-0 w-8 h-8font-mono flex items-center justify-center rounded-sm text-sm font-bold">
          {Number(1).toLocaleString()}
        </span>
        <div className="space-y-6 w-full">
          <h2 className="text-2xl font-bold tracking-tight pt-1">
            عنوان الشحن
          </h2>

          <CarouselAddresses addresses={data.data} />
          <ShippingForm />
        </div>
      </div>
    </>
  );
};

export default page;
