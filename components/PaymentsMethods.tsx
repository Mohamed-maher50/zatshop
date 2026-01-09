"use client";

import { Fragment, useState } from "react";
import { Check, CreditCard, Apple, Wallet, Smartphone } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const iconMap = {
  "credit-card": CreditCard,
  apple: Apple,
  wallet: Wallet,
  smartphone: Smartphone,
};
type PaymentMethodCardProps = {
  id: string;
  name: string;
  description?: string;
  icon?: React.ElementType;
  selectedId?: string;
};

export const PaymentMethodCard = ({
  id,
  name,
  description,
  icon: Icon,
  selectedId,
}: PaymentMethodCardProps) => {
  const isSelected = selectedId === id;

  return (
    <Label
      htmlFor={id}
      className={cn(
        "relative flex cursor-pointer items-center gap-4  border-2 bg-card p-4 transition-all hover:border-primary/50",
        isSelected ? "border-primary ring-2 ring-primary/10" : "border-border"
      )}
    >
      <RadioGroupItem value={id} id={id} className="sr-only" />

      <div className="flex size-12 shrink-0 items-center justify-center bg-muted">
        {Icon && <Icon className="size-6 text-foreground" />}
      </div>

      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {isSelected && <Check className="size-5 shrink-0 text-primary" />}
    </Label>
  );
};
export interface PaymentMethod {
  id: string;
  type: "card" | "apple-pay" | "cash" | "google-pay";
  name: string;
  description: string;
  icon: string;
}
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "كارت بنكي",
    description: "الدفع بستخدام كارت بنكي",
    icon: "credit-card",
  },
  {
    id: "cash",
    type: "cash",
    name: "كاش",
    description: "الدفع عند الاستلام",
    icon: "wallet",
  },
];

type PaymentSelectorProps = {
  value: string;
  onChange: (id: string) => void;
  methods?: typeof PAYMENT_METHODS;
};

export function PaymentSelector({
  value,
  onChange,
  methods = PAYMENT_METHODS,
}: PaymentSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tight">طريقة الدفع</h2>

      {methods.map((method) => {
        const Icon = iconMap[method.icon as keyof typeof iconMap];

        return (
          <div key={method.id} onClick={() => onChange(method.id)}>
            <PaymentMethodCard {...method} icon={Icon} selectedId={value} />
          </div>
        );
      })}
    </div>
  );
}
