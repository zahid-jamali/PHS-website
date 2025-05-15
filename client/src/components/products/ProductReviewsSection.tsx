import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import ProductReviews from "@/components/reviews/ProductReviews";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ProductReviewsSectionProps {
  productId: number;
}

export default function ProductReviewsSection({ productId }: ProductReviewsSectionProps) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [showReviews, setShowReviews] = useState(false);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{t("products.customerReviews")}</h2>
          
          <Button 
            variant="ghost"
            className="flex items-center text-primary"
            onClick={() => setShowReviews(!showReviews)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {showReviews ? t("products.hideReviews") : t("products.showReviews")}
          </Button>
        </div>
        
        {showReviews ? (
          <ProductReviews productId={productId} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">{t("products.reviewsHidden")}</p>
            <Button onClick={() => setShowReviews(true)}>
              {t("products.showReviews")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}