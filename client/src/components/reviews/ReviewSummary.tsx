import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Review } from "./ReviewList";

interface ReviewSummaryProps {
  productId: number;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: {
    [key: number]: number;
  };
}

export default function ReviewSummary({ productId }: ReviewSummaryProps) {
  const { t } = useTranslation();
  
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/products', productId, 'reviews'],
  });

  // Calculate rating summary
  const calculateRatingSummary = (reviews: Review[]): RatingSummary => {
    // Filter only approved reviews
    const approvedReviews = reviews.filter(review => review.status === 'approved');
    const total = approvedReviews.length;
    
    if (total === 0) {
      return {
        average: 0,
        total: 0,
        distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      };
    }

    // Calculate average rating
    const sum = approvedReviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / total;

    // Calculate distribution
    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    approvedReviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });

    return {
      average,
      total,
      distribution
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-6 w-28" />
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="w-4 text-sm">{rating}</span>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">{t("reviews.noReviewsYet")}</p>
      </div>
    );
  }

  const summary = calculateRatingSummary(reviews);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Star className="fill-yellow-400 text-yellow-400 h-6 w-6 mr-1" />
          <span className="font-bold text-xl">{summary.average.toFixed(1)}</span>
        </div>
        <span className="text-gray-500">
          {t("reviews.outOf5", { count: summary.total })}
        </span>
      </div>
      
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = summary.distribution[rating];
          const percentage = summary.total > 0 ? (count / summary.total) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center space-x-2">
              <span className="w-4 text-sm">{rating}</span>
              <Progress value={percentage} className="h-2 flex-1" />
              <span className="text-xs text-gray-500 w-8 text-right">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}