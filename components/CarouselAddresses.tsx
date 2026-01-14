"use client";
import { Address } from "@/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Check, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { combineAddressOperationFormValues } from "@/schema/AddressSchema";
import { useEffect, useState } from "react";

const CarouselAddresses = ({ addresses }: { addresses: Address[] }) => {
  const [previousAddress, setPreviousAddress] =
    useState<combineAddressOperationFormValues | null>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const form = useFormContext<combineAddressOperationFormValues>();
  const selectedAddress = form.getValues();
  const onAddressChange = (address: Address) => {
    if (!selectedAddress.isNewAddress) {
      const isSelected = selectedAddress._id == address._id;
      if (isSelected) {
        const jsonPreviousAddress = sessionStorage.getItem("shippingAddress");
        const previousAddress =
          (jsonPreviousAddress && JSON.parse(jsonPreviousAddress)) || {};
        form.reset(
          { ...previousAddress, isNewAddress: true },
          { keepDefaultValues: true }
        );
      } else {
        form.reset(
          { ...address, isNewAddress: false },
          { keepDefaultValues: true }
        );
      }
    } else {
      sessionStorage.setItem(
        "shippingAddress",
        JSON.stringify(form.getValues())
      );
      form.reset(
        { ...form.formState.defaultValues, isNewAddress: false },
        { keepDefaultValues: true }
      );
      form.reset(
        { ...address, isNewAddress: false },
        { keepDefaultValues: true }
      );
    }
  };
  useEffect(() => {
    if (!api) return;
    if (!form.formState.isDirty) {
      const initialIndex = addresses.findIndex(
        (address) =>
          !selectedAddress.isNewAddress && address._id == selectedAddress._id
      );
      api.scrollTo(initialIndex, false); // false = no animation
    }
  }, [api, selectedAddress]);
  useEffect(() => {}, []);
  return (
    <div className="relative z-30 isolate">
      <Carousel
        setApi={setApi}
        dir="ltr"
        className="w-full pt-5 "
        hidden={!addresses.length}
      >
        <CarouselContent dir="ltr" className=" -ml-1  ">
          {addresses.map((address) => {
            const isSelected =
              !selectedAddress.isNewAddress &&
              selectedAddress._id == address._id;
            return (
              <CarouselItem
                onClick={(e) => {
                  e.preventDefault();
                  onAddressChange(address);
                }}
                key={address._id}
                className="pl-1 basis-full  sm:basis-1/2 md:basis-full"
              >
                <Label
                  key={address._id}
                  htmlFor={address._id}
                  className={cn(
                    "relative flex cursor-pointer  border-2 bg-card p-4 transition-all hover:border-primary/50",
                    isSelected
                      ? "border-primary ring-2 ring-primary/10"
                      : "border-border"
                  )}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        {address.address}
                      </span>
                      {isSelected && <Check className="size-4 text-primary" />}
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
            );
          })}
        </CarouselContent>
        <CarouselPrevious className={"right-8! left-auto top-0"} />
        <CarouselNext className={"right-0 top-0"} />
      </Carousel>
    </div>
  );
};

export default CarouselAddresses;
