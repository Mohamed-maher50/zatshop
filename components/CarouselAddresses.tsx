"use client";
import { Address } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Check, MapPin } from "lucide-react";
import { useAddress } from "@/providers/AddressProvider";
import { useFormContext } from "react-hook-form";
import { ShippingValues } from "@/features/orders/components/CheckoutForm";

const CarouselAddresses = ({ addresses }: { addresses: Address[] }) => {
  const { setSelectedAddress, selectedAddress } = useAddress();
  return (
    <div className="relative z-30 isolate">
      <Carousel dir="ltr" className="w-full pt-5 " hidden={!addresses.length}>
        <CarouselContent dir="ltr" className=" -ml-1  ">
          {addresses.map((address) => (
            <CarouselItem
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAddress((prev) => {
                  return prev?._id == address._id ? null : address;
                });
              }}
              key={address._id}
              className="pl-1 basis-full  sm:basis-1/2 md:basis-full"
            >
              <Label
                key={address._id}
                htmlFor={address._id}
                className={cn(
                  "relative flex cursor-pointer  border-2 bg-card p-4 transition-all hover:border-primary/50",
                  selectedAddress?._id === address._id
                    ? "border-primary ring-2 ring-primary/10"
                    : "border-border"
                )}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      {address.address}
                    </span>
                    {selectedAddress?._id === address._id && (
                      <Check className="size-4 text-primary" />
                    )}
                  </div>
                  <div className="mt-2 flex items-start gap-2">
                    <MapPin className="mt-1 size-4 shrink-0 text-muted-foreground" />
                    <div className="text-sm leading-relaxed">
                      <p className="font-medium">{address.governorate}</p>
                      <p className="text-muted-foreground">
                        {address.city}, {address.apartment} {address.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </Label>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"right-8! left-auto top-0"} />
        <CarouselNext className={"right-0 top-0"} />
      </Carousel>
    </div>
  );
};

export default CarouselAddresses;
