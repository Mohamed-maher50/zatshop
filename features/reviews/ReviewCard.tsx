import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Star, CheckCircle2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";

interface Review {
  _id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    profileImg: string;
  };
  product: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-primary/70 text-primary-foreground"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full isolate grid grid-rows-subgrid row-span-1 relative max-w-2xl mx-auto ">
      <Card className="   ">
        <CardContent className="p-6 h-full">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-4">
            <Rating readOnly defaultValue={review.rating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} className="text-[#C69B7B]" />
              ))}
            </Rating>
          </div>

          {/* User Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={review.user.profileImg}
                  alt={review.user.name}
                />
                <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                  {getInitials(review.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900">
                  {review.user.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-primary " />
              </div>
            </div>

            {/* More Options Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 absolute top-8 right-8  text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Review Text */}
          <p className="text-gray-600 grow leading-relaxed mb-4">
            "{review.review}"
          </p>

          {/* Posted Date */}
          <p className="text-sm text-gray-500">
            Posted on {formatDate(review.createdAt)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewCard;
