"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useBayProduct } from "@/providers/BayProductProvider";
import { Product } from "@/types";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusIcon, PlusIcon } from "lucide-react";

const ProductSelector = () => {
  const { updateQuantity, quantity, addItem } = useBayProduct();

  return (
    <>
      <div className="flex gap-2.5 items-center">
        <ButtonGroup dir="ltr">
          <Button
            disabled={quantity === 0}
            onClick={() => updateQuantity(Math.max(0, quantity - 1))}
            size="lg"
            variant="outline"
          >
            <MinusIcon />
          </Button>
          <ButtonGroupText className="min-w-12 justify-center">
            {quantity}
          </ButtonGroupText>
          <Button
            onClick={() => updateQuantity(quantity + 1)}
            size="lg"
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
        <Button
          variant={"default"}
          onClick={() => addItem()}
          className={"grow"}
          size={"lg"}
        >
          اضافة للعربة
        </Button>
        <Button variant={"outline"} className={""} size={"lg"}>
          <HugeiconsIcon icon={FavouriteIcon} size={20} className="" />
        </Button>
      </div>
    </>
  );
};

export default ProductSelector;
