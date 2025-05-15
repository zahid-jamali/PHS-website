import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth"; // Assuming auth hook exists

import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import ReviewSummary from "./ReviewSummary";

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { t } = useTranslation();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">{t("reviews.customerFeedback")}</h2>
        
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Left column - Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t("reviews.ratingSummary")}</h3>
                <ReviewSummary productId={productId} />
                
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={toggleReviewForm} 
                    className="w-full"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {showReviewForm 
                      ? t("reviews.hideReviewForm") 
                      : t("reviews.writeReview")
                    }
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-xs text-center text-gray-500">
                      {t("reviews.loginToVerify")}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Reviews and Form */}
          <div className="space-y-6">
            {showReviewForm && (
              <div className="mb-8">
                <ReviewForm productId={productId} />
              </div>
            )}
            
            <Tabs defaultValue="all-reviews">
              <TabsList className="mb-4">
                <TabsTrigger value="all-reviews">
                  {t("reviews.allReviews")}
                </TabsTrigger>
                <TabsTrigger value="verified-reviews">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {t("reviews.verifiedOnly")}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-reviews">
                <ReviewList productId={productId} />
              </TabsContent>
              
              <TabsContent value="verified-reviews">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    {t("reviews.verifiedReviewsExplanation")}
                  </p>
                </div>
                {/* We could replace with a verified-only ReviewList, 
                    but for simplicity, we'll just filter in the component */}
                <ReviewList productId={productId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}