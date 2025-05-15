import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

// Schema for review form
const reviewSchema = z.object({
  productId: z.number(),
  rating: z.number().min(1, "Please rate this product").max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: number;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productId,
      rating: 0,
      title: "",
      content: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: ReviewFormValues) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      // Clear form
      form.reset({
        productId,
        rating: 0,
        title: "",
        content: "",
      });
      
      // Show success message
      toast({
        title: t("reviews.submitSuccess"),
        description: t("reviews.reviewPendingApproval"),
      });
      
      // Invalidate review queries to refresh list
      queryClient.invalidateQueries({ queryKey: ['/api/products', productId, 'reviews'] });
    },
    onError: (error: Error) => {
      toast({
        title: t("reviews.submitError"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle review submission
  const onSubmit = (data: ReviewFormValues) => {
    reviewMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("reviews.writeReview")}</CardTitle>
        <CardDescription>{t("reviews.shareYourExperience")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Star Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reviews.rating")}</FormLabel>
                  <FormControl>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-8 w-8 cursor-pointer transition-all ${
                            (hoveredRating || field.value) >= rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300"
                          }`}
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => form.setValue("rating", rating)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    {field.value > 0 
                      ? t("reviews.ratingDescription", { rating: field.value }) 
                      : t("reviews.selectRating")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reviews.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("reviews.titlePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reviews.content")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("reviews.contentPlaceholder")}
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register("productId")} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          type="button" 
          onClick={form.handleSubmit(onSubmit)}
          disabled={reviewMutation.isPending}
        >
          {reviewMutation.isPending ? t("common.submitting") : t("reviews.submitReview")}
        </Button>
      </CardFooter>
    </Card>
  );
}