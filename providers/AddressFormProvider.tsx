"use client";
import { ReactNode, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  combineAddressOperationFormValues,
  combineAddressOperationSchema,
} from "@/schema/AddressSchema";
const initialValues: combineAddressOperationFormValues = {
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  governorate: "",
  city: "",
  phone: "",
  isNewAddress: true,
};

const AddressFormProvider = ({ children }: { children: ReactNode }) => {
  const getAddressesDefaultValues = () => {
    const storedIsNewAddress = sessionStorage.getItem("isNewAddress");
    const isNewAddressStatus =
      storedIsNewAddress && JSON.parse(storedIsNewAddress);
    // when there are selected address
    if (!isNewAddressStatus) {
      const storedSelectedAddress = sessionStorage.getItem(
        "selectedAddressValues"
      );
      const selectedAddressValues =
        storedSelectedAddress && JSON.parse(storedSelectedAddress);
      if (selectedAddressValues) selectedAddressValues.isNewAddress = false;
      return selectedAddressValues || initialValues;

      // when there are not selected address
    } else {
      const jsonPreviousAddress = sessionStorage.getItem("shippingAddress");
      const previousAddress =
        jsonPreviousAddress && JSON.parse(jsonPreviousAddress);
      if (previousAddress) {
        previousAddress.isNewAddress = true;
        return previousAddress;
      }
    }
  };
  const form = useForm<combineAddressOperationFormValues>({
    resolver: zodResolver(combineAddressOperationSchema),
    defaultValues: getAddressesDefaultValues(),
  });
  const isNewAddress = form.watch("isNewAddress");
  const addressId = form.watch("_id");
  useEffect(() => {
    sessionStorage.setItem("isNewAddress", `${isNewAddress}`);
  }, [isNewAddress]);
  useEffect(() => {
    console.log(form.formState.defaultValues);
  }, [isNewAddress]);
  useEffect(() => {
    if (!isNewAddress) {
      const selectedAddressValues = form.getValues();
      sessionStorage.setItem(
        "selectedAddressValues",
        JSON.stringify(selectedAddressValues)
      );
    } else {
      const values = form.getValues();
      sessionStorage.setItem("shippingAddress", JSON.stringify(values));
    }
  }, [addressId]);

  return <Form {...form}>{children}</Form>;
};

export default AddressFormProvider;
