import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import ReviewsManagement from "@/components/admin/ReviewsManagement";
import { AdminLayout } from "@/components/layouts";

export default function ReviewsPage() {
  const { t } = useTranslation();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if user is not admin
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
      return;
    }

    if (!isLoading && isAuthenticated && user?.role !== "admin") {
      setLocation("/");
    }
  }, [isLoading, isAuthenticated, user, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null; // Will be redirected by the useEffect
  }

  return (
    <>
      <Helmet>
        <title>{t("admin.reviews.pageTitle")} | Dr. Abdul PHS</title>
        <meta name="description" content={t("admin.reviews.pageDescription")} />
      </Helmet>

      <AdminLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">{t("admin.reviews.title")}</h1>
          <ReviewsManagement />
        </div>
      </AdminLayout>
    </>
  );
}