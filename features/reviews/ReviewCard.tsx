import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Review } from "@/types/reviews";
import { arabicDate } from "@/lib/arabicNumber";
import { ReviewDialog } from "./ReviewDialog";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteReviewDialog from "./components/DeleteReviewDialog";
import { useSession } from "next-auth/react";

interface ReviewCardProps {
  review: Review;
  loggedUserId?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, loggedUserId }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const isUserOwen = useMemo(() => {
    return loggedUserId === review.user._id;
  }, [loggedUserId]);

  return (
    <div className="w-full isolate grid grid-rows-subgrid row-span-1 relative max-w-2xl mx-auto ">
      <Card className="   ">
        <CardContent className="p-6 h-full">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-4">
            <Rating readOnly defaultValue={review.rating} value={review.rating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} className="text-[#C69B7B]" />
              ))}
            </Rating>
          </div>

          {/* User Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={review.user?.image} alt={review.user?.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                  {review.user.name && getInitials(review.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900">
                  {review.user?.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-primary " />
              </div>
            </div>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                hidden={!isUserOwen}
                className=" absolute left-5 mr-auto block w-fit top-5"
              >
                <MoreHorizontal className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <ReviewDialog productId={review.product} initialValues={review}>
                  <DialogTrigger
                    className={buttonVariants({
                      size: "lg",
                      variant: "ghost",
                      className: `flex w-full  gap-2`,
                    })}
                    hidden={!isUserOwen}
                  >
                    <Pen className="w-5 h-5" />
                    تعديل
                  </DialogTrigger>
                </ReviewDialog>

                <DeleteReviewDialog reviewId={review._id}>
                  <DialogTrigger
                    className={buttonVariants({
                      size: "lg",
                      variant: "ghost",
                      className: `flex w-full grow gap-2`,
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف</span>
                  </DialogTrigger>
                </DeleteReviewDialog>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 absolute top-8 right-8  text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button> */}
          </div>

          {/* Review Text */}
          <p className="text-gray-600 grow leading-relaxed mb-4">
            "{review.review}"
          </p>

          {/* Posted Date */}
          <p className="text-sm text-gray-500">
            تاريخ التقييم {arabicDate.format(new Date(review.createdAt))}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewCard;
