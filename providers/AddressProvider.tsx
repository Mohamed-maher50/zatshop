"use client";

export interface AddressContextType {
  selectedAddress: Address | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}
import { Address } from "@/types";
import React, { createContext, useContext, useState } from "react";

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <AddressContext.Provider
      value={{
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// 5. Custom Hook for easy usage
export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
