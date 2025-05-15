import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export interface Review {
  id: number;
  productId: number;
  userId: number | null;
  rating: number;
  title: string;
  content: string;
  status: string;
  isVerified: boolean | null;
  createdAt: string | Date;
  userName?: string;
  userImage?: string;
}

interface ReviewListProps {
  productId: number;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const { t } = useTranslation();
  
  const { data: reviews, isLoading, error } = useQuery<Review[]>({
    queryKey: ['/api/products', productId, 'reviews'],
  });

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-4 w-4" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="text-gray-300 h-4 w-4" />
      );
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("reviews.title")}</h3>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{t("reviews.error")}</p>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t("reviews.title")}</h3>
        <p className="text-gray-500">{t("reviews.noReviews")}</p>
      </div>
    );
  }

  // Only show approved reviews
  const approvedReviews = reviews.filter(review => review.status === 'approved');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t("reviews.title")}</h3>
        <span className="text-sm text-gray-500">
          {approvedReviews.length} {t("reviews.count", { count: approvedReviews.length })}
        </span>
      </div>

      {approvedReviews.map((review) => (
        <Card key={review.id} className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.userImage} alt={review.userName || t("reviews.anonymousUser")} />
                <AvatarFallback>
                  {review.userName 
                    ? review.userName.substring(0, 2).toUpperCase() 
                    : t("reviews.anonymousUserInitials")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">
                      {review.userName || t("reviews.anonymousUser")}
                      {review.isVerified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {t("reviews.verifiedPurchase")}
                        </Badge>
                      )}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">{renderStars(review.rating)}</div>
                      <time className="text-xs text-gray-500">
                        {typeof review.createdAt === 'string' 
                          ? format(new Date(review.createdAt), 'MMM dd, yyyy')
                          : format(review.createdAt, 'MMM dd, yyyy')}
                      </time>
                    </div>
                  </div>
                </div>
                
                <h5 className="font-medium mt-2">{review.title}</h5>
                <p className="mt-1 text-gray-700">{review.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}