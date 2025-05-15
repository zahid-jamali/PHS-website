import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { CheckCircle, XCircle, MoreHorizontal, Search, Trash, Eye } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: number;
  productId: number;
  userId: number | null;
  rating: number;
  title: string;
  content: string;
  status: string;
  isVerified: boolean | null;
  createdAt: string | Date;
  productName?: string;
  userName?: string;
}

export default function ReviewsManagement() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("pending");
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load reviews
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  // Handle status update
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/reviews/${id}/status`, { status });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update review status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: t("admin.reviews.statusUpdated"),
        description: t("admin.reviews.statusUpdateSuccess"),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("admin.reviews.statusUpdateFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle review deletion
  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/reviews/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete review");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: t("admin.reviews.reviewDeleted"),
        description: t("admin.reviews.reviewDeleteSuccess"),
      });
      setReviewToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: t("admin.reviews.reviewDeleteFailed"),
        description: error.message,
        variant: "destructive",
      });
      setReviewToDelete(null);
    },
  });

  const approveReview = (id: number) => {
    updateStatusMutation.mutate({ id, status: "approved" });
  };

  const rejectReview = (id: number) => {
    updateStatusMutation.mutate({ id, status: "rejected" });
  };

  const confirmDelete = (id: number) => {
    setReviewToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete !== null) {
      deleteReviewMutation.mutate(reviewToDelete);
    }
  };

  // Filter and search reviews
  const filterReviews = () => {
    if (!reviews) return [];

    let filtered = reviews;

    // Filter by tab/status
    if (tab !== "all") {
      filtered = filtered.filter(review => review.status === tab);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        review => 
          review.title.toLowerCase().includes(term) || 
          review.content.toLowerCase().includes(term) ||
          review.userName?.toLowerCase().includes(term) ||
          review.productName?.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredReviews = filterReviews();

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">{t("admin.reviews.pending")}</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700">{t("admin.reviews.approved")}</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700">{t("admin.reviews.rejected")}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("admin.reviews.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.reviews.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={t("admin.reviews.searchPlaceholder")}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">{t("admin.reviews.all")}</TabsTrigger>
              <TabsTrigger value="pending">{t("admin.reviews.pending")}</TabsTrigger>
              <TabsTrigger value="approved">{t("admin.reviews.approved")}</TabsTrigger>
              <TabsTrigger value="rejected">{t("admin.reviews.rejected")}</TabsTrigger>
            </TabsList>

            <TabsContent value={tab}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-0 pt-4">
                  {filteredReviews.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">{t("admin.reviews.noReviews")}</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("admin.reviews.product")}</TableHead>
                          <TableHead>{t("admin.reviews.review")}</TableHead>
                          <TableHead>{t("admin.reviews.rating")}</TableHead>
                          <TableHead>{t("admin.reviews.status")}</TableHead>
                          <TableHead>{t("admin.reviews.date")}</TableHead>
                          <TableHead className="text-right">{t("common.actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReviews.map((review) => (
                          <TableRow key={review.id}>
                            <TableCell>
                              <span className="font-medium">
                                {review.productName || `Product #${review.productId}`}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium truncate max-w-xs">{review.title}</p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                  {review.content}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {review.userName || t("reviews.anonymousUser")}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{review.rating}/5</TableCell>
                            <TableCell>{renderStatusBadge(review.status)}</TableCell>
                            <TableCell>
                              {typeof review.createdAt === 'string'
                                ? format(new Date(review.createdAt), 'MMM dd, yyyy')
                                : format(review.createdAt, 'MMM dd, yyyy')}
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end">
                                {review.status === "pending" && (
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-8 text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                                      onClick={() => approveReview(review.id)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      {t("admin.reviews.approve")}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-8 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                      onClick={() => rejectReview(review.id)}
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      {t("admin.reviews.reject")}
                                    </Button>
                                  </div>
                                )}
                                
                                {review.status !== "pending" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem 
                                        className="text-red-500 focus:text-red-500"
                                        onClick={() => confirmDelete(review.id)}
                                      >
                                        <Trash className="h-4 w-4 mr-2" />
                                        {t("common.delete")}
                                      </DropdownMenuItem>
                                      {review.status === "rejected" && (
                                        <DropdownMenuItem onClick={() => approveReview(review.id)}>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          {t("admin.reviews.approve")}
                                        </DropdownMenuItem>
                                      )}
                                      {review.status === "approved" && (
                                        <DropdownMenuItem onClick={() => rejectReview(review.id)}>
                                          <XCircle className="h-4 w-4 mr-2" />
                                          {t("admin.reviews.reject")}
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={reviewToDelete !== null} onOpenChange={(open) => !open && setReviewToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.reviews.confirmDelete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.reviews.deleteWarning")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}