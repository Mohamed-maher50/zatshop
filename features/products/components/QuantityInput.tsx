"use client";

import { updateQuantityAction } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useDebounceCallback } from "@/hooks/use-debounce";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const QuantityInput = ({
  initialQuantity = 1,
  variantSku,
}: {
  initialQuantity: number;
  variantSku: string;
}) => {
  const [quantity1, setQuantity1] = useState(initialQuantity);
  const onSubmit = async (quantity: number) => {
    const request = updateQuantityAction({ quantity, sku: variantSku });
    toast.promise(request, {
      loading: "يتم تعديل الكمية",
      success: "تم التعديل",
      error: "فشل التعديل",
    });
  };
  const debounceOnSubmit = useDebounceCallback(onSubmit);
  return (
    <ButtonGroup>
      <Button
        disabled={quantity1 === 1}
        onClick={() => {
          setQuantity1(Math.max(0, quantity1 - 1));
          debounceOnSubmit(quantity1 - 1);
        }}
        size="sm"
        variant="ghost"
      >
        <MinusIcon />
      </Button>
      <ButtonGroupText className="border-none bg-transparent justify-center">
        {quantity1}
      </ButtonGroupText>
      <Button
        onClick={() => {
          setQuantity1(quantity1 + 1);
          debounceOnSubmit(quantity1 + 1);
        }}
        size="sm"
        variant="ghost"
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityInput;
