"use client";
import AuthOnly from "@/components/auth/OnlyAuth";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { useBayProduct } from "@/providers/BayProductProvider";
import { FavouriteIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import WithLike from "@/features/wishlist/components/WithLike";
import LikeButton, {
  WithWishlistButton,
} from "@/features/wishlist/components/LikeButton";

const ProductSelector = () => {
  const { updateQuantity, quantity, addItem } = useBayProduct();
  const [isRequiredLogin, setIsRequiredLogin] = useState(false);
  const { productId, slug } = useParams();
  const searchParams = useSearchParams();
  const queryPrams = searchParams.toString() ? `?${searchParams}` : "";
  const { status } = useSession({
    required: isRequiredLogin,
    onUnauthenticated() {
      redirect(
        `/auth/signin?callbackUrl=/products/${productId}/${slug}${queryPrams}`
      );
    },
  });

  return (
    <>
      <div className="flex gap-2.5 items-center">
        <ButtonGroup dir="ltr">
          <Button
            disabled={quantity === 0 || status == "loading"}
            onClick={() => {
              updateQuantity(Math.max(0, quantity - 1));
            }}
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
          disabled={status === "loading"}
          onClick={() => {
            if (status === "unauthenticated") {
              setIsRequiredLogin(true);
            } else {
              addItem();
            }
          }}
          className={"grow"}
          size={"lg"}
        >
          اضافة للعربة
        </Button>
        <WithWishlistButton productId={productId as string} />
      </div>
    </>
  );
};

export default ProductSelector;
