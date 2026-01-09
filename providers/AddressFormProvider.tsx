"use client";
import React, { ReactNode } from "react";
import { useAddress } from "./AddressProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { addressFormValues, addressSchema } from "@/schema/AddressSchema";
const initialValues: addressFormValues = {
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  governorate: "",
  city: "",
  phone: "",
};

const AddressFormProvider = ({ children }: { children: ReactNode }) => {
  const { selectedAddress } = useAddress();
  const form = useForm<addressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      address: initialValues?.address || "",
      apartment: initialValues?.apartment || "",
      governorate: initialValues?.governorate || "",
      city: initialValues?.city || "",
      phone: initialValues?.phone || "",
    },
    values: selectedAddress || initialValues,
    disabled: !!selectedAddress,
  });
  return <Form {...form}>{children}</Form>;
};

export default AddressFormProvider;
