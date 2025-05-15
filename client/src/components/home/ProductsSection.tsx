import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, StarHalf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCart } from "../cart/CartProvider";

type Category = "all" | "culinary" | "therapeutic" | "home" | "halotherapy";

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { addToCart } = useCart();

  // Fetch featured products
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const filteredProducts = activeCategory === "all"
    ? products
    : products?.filter(product => product.category === activeCategory);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }
    
    return stars;
  };

  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Our Premium Products</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Explore our range of high-quality Pink Himalayan Salt products for culinary, therapeutic, and decorative uses.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button
              variant={activeCategory === "all" ? "default" : "ghost"}
              className={`px-5 py-2 text-sm font-medium ${activeCategory === "all" ? "bg-primary text-neutral-dark" : "bg-white text-neutral-dark hover:bg-primary"} rounded-l-lg`}
              onClick={() => handleCategoryChange("all")}
            >
              All Products
            </Button>
            <Button
              variant={activeCategory === "culinary" ? "default" : "ghost"}
              className={`px-5 py-2 text-sm font-medium ${activeCategory === "culinary" ? "bg-primary text-neutral-dark" : "bg-white text-neutral-dark hover:bg-primary"}`}
              onClick={() => handleCategoryChange("culinary")}
            >
              Culinary
            </Button>
            <Button
              variant={activeCategory === "therapeutic" ? "default" : "ghost"}
              className={`px-5 py-2 text-sm font-medium ${activeCategory === "therapeutic" ? "bg-primary text-neutral-dark" : "bg-white text-neutral-dark hover:bg-primary"}`}
              onClick={() => handleCategoryChange("therapeutic")}
            >
              Therapeutic
            </Button>
            <Button
              variant={activeCategory === "home" ? "default" : "ghost"}
              className={`px-5 py-2 text-sm font-medium ${activeCategory === "home" ? "bg-primary text-neutral-dark" : "bg-white text-neutral-dark hover:bg-primary"} rounded-r-lg`}
              onClick={() => handleCategoryChange("home")}
            >
              Home & Decor
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                <div className="p-4 bg-white rounded-b-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="flex mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load products. Please try again.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="product-card">
                <Link href={`/products/${product.slug}`} className="block">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Badge variant="secondary" className="text-xs text-secondary font-accent font-semibold uppercase tracking-wider bg-transparent border border-secondary">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Badge>
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-lg font-heading font-semibold mt-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center mt-2">
                    <div className="text-yellow-400 flex">
                      {renderStars(4.5)} {/* Placeholder rating, could be from product data */}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">(42 reviews)</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    {product.salePrice ? (
                      <div>
                        <span className="text-lg font-accent font-semibold">${product.salePrice.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-accent font-semibold">${product.price.toFixed(2)}</span>
                    )}
                    <Button 
                      size="icon" 
                      className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary-dark transition duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" asChild className="btn-outline">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
