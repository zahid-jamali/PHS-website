import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import HalotherapyPage from "./pages/HalotherapyPage";
import WholesalePage from "./pages/WholesalePage";
import ResearchPage from "./pages/ResearchPage";
import SpaMassagePage from "./pages/SpaMassagePage";
import SaltLampsPage from "./pages/SaltLampsPage";
import SaltLampsGalleryPage from "./pages/SaltLampsGalleryPage";
import SaltBricksPage from "./pages/SaltBricksPage";
import ShopifyPage from "./pages/ShopifyPage";
import AmazonPage from "./pages/AmazonPage";
import MarketplacesPage from "./pages/MarketplacesPage";
import CarbonCalculatorPage from "./pages/CarbonCalculatorPage";
import FlavorMatcherPage from "./pages/FlavorMatcherPage";
import TestPage from "./pages/TestPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import AccountSubscriptionPage from "./pages/AccountSubscriptionPage";
import NotFound from "@/pages/not-found";
import { CartProvider } from "./components/cart/CartProvider";
import { AuthProvider } from "./context/AuthContext";
import ChatWidget from "./components/chat/ChatWidget";
import { useTranslation } from 'react-i18next';

// Knowledge Center Pages
import KnowledgeCenterPage from "./pages/KnowledgeCenterPage";
import HistoryOfPHSPage from "./pages/knowledge/HistoryOfPHSPage";

// Admin pages
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import ReviewsPage from "./pages/admin/ReviewsPage";

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[50vh]">Loading...</div>;
  }
  
  return isAuthenticated ? <Component {...rest} /> : <Redirect to="/login" />;
};

// Import useAuth and Redirect
import { useAuth } from "./context/AuthContext";
import { Redirect } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={ProductPage} />
      <Route path="/products/:slug" component={ProductDetailPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/halotherapy" component={HalotherapyPage} />
      <Route path="/wholesale" component={WholesalePage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/spa-massage" component={SpaMassagePage} />
      <Route path="/salt-lamps" component={SaltLampsPage} />
      <Route path="/salt-lamps-gallery" component={SaltLampsGalleryPage} />
      <Route path="/salt-bricks" component={SaltBricksPage} />
      <Route path="/carbon-calculator" component={CarbonCalculatorPage} />
      <Route path="/flavor-matcher" component={FlavorMatcherPage} />
      <Route path="/knowledge" component={KnowledgeCenterPage} />
      <Route path="/knowledge/history-of-pink-himalayan-salt" component={HistoryOfPHSPage} />
      <Route path="/shopify" component={ShopifyPage} />
      <Route path="/amazon" component={AmazonPage} />
      <Route path="/marketplaces" component={MarketplacesPage} />
      <Route path="/test-images" component={TestPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/track-order" component={TrackOrderPage} />
      <Route path="/subscribe" component={SubscriptionPage} />
      <Route path="/account">
        {(params) => <ProtectedRoute component={AccountPage} params={params} />}
      </Route>
      <Route path="/account/subscriptions">
        {(params) => <ProtectedRoute component={AccountSubscriptionPage} params={params} />}
      </Route>
      
      {/* Admin routes */}
      <Route path="/admin">
        {(params) => <ProtectedRoute component={DashboardPage} params={params} />}
      </Route>
      <Route path="/admin/products">
        {(params) => <ProtectedRoute component={ProductsPage} params={params} />}
      </Route>
      <Route path="/admin/users">
        {(params) => <ProtectedRoute component={UsersPage} params={params} />}
      </Route>
      <Route path="/admin/reviews">
        {(params) => <ProtectedRoute component={ReviewsPage} params={params} />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Helmet>
              <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
              <title>{t('seo.default.title', 'Premium Pink Himalayan Salt Products | Dr. Abdul PHS')}</title>
              <meta name="description" content={t('seo.default.description', 'Discover premium Pink Himalayan Salt products directly from Pakistan. Natural salt lamps, spa items, bricks, and tiles with worldwide shipping.')} />
              <meta name="keywords" content={t('seo.default.keywords', 'pink himalayan salt, salt lamp, salt bricks, halotherapy, natural salt, salt tiles, wholesale salt')} />
              
              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content={window.location.href} />
              <meta property="og:title" content={t('seo.default.title', 'Premium Pink Himalayan Salt Products | Dr. Abdul PHS')} />
              <meta property="og:description" content={t('seo.default.description', 'Discover premium Pink Himalayan Salt products directly from Pakistan. Natural salt lamps, spa items, bricks, and tiles with worldwide shipping.')} />
              <meta property="og:image" content="/og-image.jpg" />
              
              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content={window.location.href} />
              <meta property="twitter:title" content={t('seo.default.title', 'Premium Pink Himalayan Salt Products | Dr. Abdul PHS')} />
              <meta property="twitter:description" content={t('seo.default.description', 'Discover premium Pink Himalayan Salt products directly from Pakistan. Natural salt lamps, spa items, bricks, and tiles with worldwide shipping.')} />
              <meta property="twitter:image" content="/og-image.jpg" />
              
              {/* Canonical URL */}
              <link rel="canonical" href={window.location.href} />
            </Helmet>
            
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
              <ChatWidget />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
