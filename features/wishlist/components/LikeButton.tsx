import { Button } from "@/components/ui/button";
import WithLike, { WithLikeProps } from "./WithLike";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface WishlistButtonProps extends WithLikeProps {
  productId: string;
}
const LikeButton = ({
  isAuthenticated,
  isLikeProcess,
  isLiked,
  toggleLike,
  wishlist,
  productId,
}: WishlistButtonProps) => {
  return (
    <Button
      variant={"outline"}
      hidden={!isAuthenticated}
      onClick={toggleLike.bind(null, productId)}
      size={"lg"}
      disabled={isLikeProcess}
    >
      <HugeiconsIcon
        icon={isLikeProcess ? Loading03Icon : FavouriteIcon}
        size={20}
        data-isliked={isLiked(productId)}
        data-isloading={isLikeProcess}
        className={cn(
          " data-[isliked=true]:fill-red-600!  data-[isliked=true]:text-red-700!   data-[isloading=true]:animate-spin  "
        )}
      />
    </Button>
  );
};

export const WithWishlistButton = WithLike(LikeButton);
export default LikeButton;
