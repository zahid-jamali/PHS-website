import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Star, StarHalf, Minus, Plus, ShoppingCart, Check, Truck, Package, Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import ProductImage from "@/components/ui/ProductImage";
import ProductReviewsSection from "@/components/products/ProductReviewsSection";

// Import default product images
import saltLampImg from "@/assets/salt-lamps.webp";
import saltCulinaryImg from "@/assets/salt-culinary.webp";

export default function ProductDetailPage() {
  const [match, params] = useRoute<{ slug: string }>("/products/:slug");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: [`/api/products/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      imageUrl: product.imageUrl,
      quantity,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-5 w-5 text-yellow-400" />
      );
    }
    
    return stars;
  };

  // Related products mock - using our local assets for reliability
  const relatedProducts = [
    {
      name: "Himalayan Salt Lamp",
      image: saltLampImg,
      price: 34.99
    },
    {
      name: "Premium Cooking Salt",
      image: saltCulinaryImg,
      price: 24.99
    },
    {
      name: "Salt Decoration Set",
      image: saltLampImg,
      price: 39.99
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex space-x-3 mt-6">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">
            Return to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content={product.description}
        />
        <meta name="keywords" content={`Pink Himalayan Salt, ${product.category}, ${product.name}, Dr. Abdul PHS`} />
      </Helmet>

      <div className="bg-neutral-beige py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ProductImage 
                src={product.imageUrl || (product.category === 'home' ? saltLampImg : saltCulinaryImg)} 
                alt={product.name} 
                className="w-full h-96 rounded-lg"
                aspectRatio="landscape"
              />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <Badge variant="secondary" className="text-xs text-secondary font-accent font-semibold uppercase tracking-wider bg-transparent border border-secondary mb-2">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex">
                {renderStars(4.5)} {/* Placeholder rating */}
              </div>
              <span className="text-sm text-gray-500">(42 Reviews)</span>
            </div>

            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-accent font-semibold">${product.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                  <Badge className="ml-3 bg-green-100 text-green-800 border-0">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </Badge>
                </div>
              ) : (
                <span className="text-2xl font-accent font-semibold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-secondary mr-2" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-secondary mr-2" />
                <span>Secure packaging ensures safe delivery</span>
              </div>
              <div className="flex items-center">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <span>Sustainably and ethically sourced</span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button 
                className="btn-primary"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="btn-outline bg-gray-100/70 text-gray-800 border-gray-300 hover:bg-secondary hover:text-white hover:border-secondary" 
                size="lg" 
                asChild
              >
                <Link href="/wholesale">
                  Wholesale Inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details & Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 bg-white rounded-b-lg shadow-sm mt-2">
              <h3 className="text-xl font-heading font-semibold mb-4">About {product.name}</h3>
              <p className="mb-4">{product.description}</p>
              <p className="mb-4">
                Our Pink Himalayan Salt is sourced directly from the ancient Khewra Salt Mine in Pakistan, 
                ensuring you receive the highest quality and purity. These salt crystals were formed over 
                250 million years ago when ancient seas evaporated, leaving behind these mineral-rich deposits.
              </p>
              <p>
                Unlike processed table salt, our Pink Himalayan Salt contains 84+ natural minerals and elements 
                found in the human body, providing numerous health benefits and a unique taste that enhances any dish.
              </p>
            </TabsContent>
            <TabsContent value="details" className="p-6 bg-white rounded-b-lg shadow-sm mt-2">
              <h3 className="text-xl font-heading font-semibold mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Weight:</span>
                  <span>{product.weight} oz</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Origin:</span>
                  <span>Khewra Salt Mine, Pakistan</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Ingredients:</span>
                  <span>100% Pure Pink Himalayan Salt</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Certifications:</span>
                  <span>FDA Approved, Non-GMO</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Shipping Weight:</span>
                  <span>{(product.weight ? product.weight + 2 : 10)} oz</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-white rounded-b-lg shadow-sm mt-2">
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-6">
                  <h3 className="text-xl font-heading font-semibold">Customer Reviews</h3>
                  <Button>Write a Review</Button>
                </div>
                
                <p className="mb-4">
                  Our customers rate this product highly. You can see highlights of recent reviews below or scroll 
                  down for our complete review section with detailed ratings and customer feedback.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 w-full">
                  <div className="flex items-center space-x-2 text-yellow-500">
                    {renderStars(4.5)}
                    <span className="text-gray-800 font-medium">4.5 out of 5</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Based on customer feedback</p>
                </div>
                
                <div className="mt-4 self-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Scroll to the reviews section
                      const reviewsSection = document.getElementById('product-reviews-section');
                      if (reviewsSection) {
                        reviewsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    View All Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Reviews Section */}
        <div id="product-reviews-section">
          <ProductReviewsSection productId={product.id} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-semibold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <div key={index} className="product-card bg-white rounded-lg overflow-hidden shadow-md">
                <ProductImage 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="w-full h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="text-lg font-heading font-semibold mb-2">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-accent font-semibold">${relatedProduct.price.toFixed(2)}</span>
                    <Button 
                      size="icon" 
                      className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary/90 transition duration-300"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
