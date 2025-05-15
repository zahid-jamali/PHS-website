import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf, ShoppingCart, Filter, SlidersHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useCart } from "@/components/cart/CartProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";
import ProductImage from "@/components/ui/ProductImage";

// Create a product adaptation to handle snake_case vs camelCase differences
type ProductWithSnakeCase = Omit<Product, 'salePrice' | 'inStock' | 'imageUrl'> & {
  sale_price: number | null;
  in_stock: boolean | null;
  image_url: string;
};

// Import authentic Khewra salt mine images
import khewraSaltMineImg from "@/assets/khewra-salt-mine.webp";
import khewraMiningImg from "@/assets/khewra-mining.webp";
import khewraTunnelLitImg from "@/assets/khewra-tunnel-lit.jpg";
import khewraEntranceImg from "@/assets/khewra-entrance.jpg";
import khewraCrystalPalaceImg from "@/assets/khewra-crystal-palace.jpg";
import khewraCaveImg from "@/assets/khewra-cave.jpg";
import saltProcessingWorkerImg from "@/assets/salt-processing-worker.webp";
import saltWarehouseImg from "@/assets/salt-warehouse.webp";
import saltLampsImg from "@/assets/salt-lamps.webp";
import saltCulinaryImg from "@/assets/salt-culinary.webp";

type CategoryFilter = "all" | "culinary" | "therapeutic" | "home" | "halotherapy" | "salt-lamps";
type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Fetch all products (and handle snake_case in the API response)
  const { data: products, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/products"],
  });

  // Convert products to a format we can use with snake_case properties
  const productsWithSnakeCase = products?.map(product => product as unknown as ProductWithSnakeCase);

  const filteredProducts = activeCategory === "all"
    ? productsWithSnakeCase
    : activeCategory === "salt-lamps"
      ? productsWithSnakeCase?.filter(product => 
          product.name.toLowerCase().includes("salt lamp") || 
          product.description.toLowerCase().includes("salt lamp") ||
          product.slug.includes("lamp"))
      : productsWithSnakeCase?.filter(product => product.category === activeCategory);

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return (a.sale_price || a.price) - (b.sale_price || b.price);
      case "price-desc":
        return (b.sale_price || b.price) - (a.sale_price || a.price);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "featured":
      default:
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    }
  });

  const handleAddToCart = (product: ProductWithSnakeCase) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      imageUrl: product.image_url,
      quantity: 1
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
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

  // Categories for the filter
  const categories = [
    { value: "all", label: "All Products" },
    { value: "salt-lamps", label: "Salt Lamps" },
    { value: "culinary", label: "Culinary" },
    { value: "therapeutic", label: "Therapeutic" },
    { value: "home", label: "Home & Decor" },
    { value: "halotherapy", label: "Halotherapy" }
  ];

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" }
  ];

  return (
    <>
      <Helmet>
        <title>Shop Premium Pink Himalayan Salt Products | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Browse our collection of authentic Pink Himalayan Salt products including culinary salt, cooking blocks, salt lamps, bath products, and halotherapy supplies."
        />
        <meta name="keywords" content="Pink Himalayan Salt, buy salt products, salt lamps, cooking salt, therapeutic salt, halotherapy products" />
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
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Shop Our Products</h1>
          <p className="text-lg mb-8">
            Browse our collection of premium Pink Himalayan Salt products
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Desktop Category Filter */}
            <div className="hidden md:flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? "default" : "outline"}
                  className={activeCategory === category.value ? "bg-primary text-neutral-dark" : ""}
                  onClick={() => setActiveCategory(category.value as CategoryFilter)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            
            {/* Mobile Category Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Categories</SheetTitle>
                  <SheetDescription>
                    Filter products by category
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={activeCategory === category.value ? "default" : "outline"}
                      className={`justify-start ${activeCategory === category.value ? "bg-primary text-neutral-dark" : ""}`}
                      onClick={() => setActiveCategory(category.value as CategoryFilter)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Sort Dropdown */}
            <div className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span className="mr-2">Sort by:</span>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* From Mine to Market: Our Salt Production Process Section */}
        <div className="mb-16 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-heading font-semibold mb-6 text-center">From Mine to Market: Our Salt Production Process</h2>
          <div className="text-center max-w-4xl mx-auto mb-8">
            <p className="mb-4">
              Journey with us through the entire production process of our premium Pink Himalayan Salt, 
              from the historic Khewra Salt Mine in Pakistan to your doorstep. Our meticulous journey ensures 
              the highest quality salt products while preserving the full mineral content that makes this salt so special.
            </p>
            <p>
              Every step in our process is carefully monitored to maintain the salt's purity, nutritional value, 
              and distinctive characteristics that have made it prized for centuries.
            </p>
          </div>
          
          {/* Step 1: The Mine */}
          <div className="mb-10">
            <h3 className="text-xl font-heading font-semibold mb-4 border-b pb-2">STEP 1: THE SOURCE - KHEWRA SALT MINE</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={khewraEntranceImg}
                  alt="Khewra Salt Mine Entrance"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Historic Entrance</h4>
                  <p className="text-gray-600 mt-2">
                    The majestic entrance to the Khewra Salt Mine, the world's second-largest salt mine, located in the 
                    Punjab region of Pakistan. Dating back to 326 BCE when it was discovered by Alexander the Great's army horses, 
                    this mine has been a source of salt through millennia of human history.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={khewraTunnelLitImg}
                  alt="Khewra Mine Tunnels"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Illuminated Salt Tunnels</h4>
                  <p className="text-gray-600 mt-2">
                    The spectacular network of tunnels extends over 40km within the mine, with 19 floors (11 below ground level). 
                    The salt-laden walls glow with an ethereal amber hue when illuminated, revealing the extraordinary mineral 
                    composition that gives Himalayan salt its characteristic pink color and unique properties.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={khewraCrystalPalaceImg}
                  alt="Crystal Palace in Khewra Salt Mine"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Crystal Palace</h4>
                  <p className="text-gray-600 mt-2">
                    The famous Crystal Palace tunnel showcases the beauty of salt bricks illuminated by natural salt lamps. 
                    This stunning formation demonstrates the architectural potential of salt blocks and inspires many of our 
                    decorative products. The mine contains remarkable salt formations with varying hues, from pale pink to deep red.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2: Extraction and Selection */}
          <div className="mb-10">
            <h3 className="text-xl font-heading font-semibold mb-4 border-b pb-2">STEP 2: SUSTAINABLE EXTRACTION & CAREFUL SELECTION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={khewraCaveImg}
                  alt="Interior Mining Chambers"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Mining Chambers</h4>
                  <p className="text-gray-600 mt-2">
                    Our salt is extracted using traditional methods that minimize environmental impact. Unlike industrial mining, 
                    our approach preserves the integrity of both the salt and the mine itself. The elaborate interior chambers showcase 
                    the beauty of untouched salt deposits that have remained pristine for over 250 million years.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={khewraSaltMineImg}
                  alt="Salt Selection Process"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Expert Selection</h4>
                  <p className="text-gray-600 mt-2">
                    Our expert miners carefully select only the highest quality salt deposits for extraction. 
                    Each piece is evaluated for purity, color, and mineral content. This selective harvesting 
                    ensures that only premium-grade salt makes it to the processing stage. Blocks intended for 
                    lamps and cooking stones are specially chosen for their crystalline structure and integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3: Processing and Production */}
          <div className="mb-10">
            <h3 className="text-xl font-heading font-semibold mb-4 border-b pb-2">STEP 3: METICULOUS PROCESSING & CRAFTSMANSHIP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltProcessingWorkerImg}
                  alt="Pink Himalayan Salt Processing"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Artisanal Processing</h4>
                  <p className="text-gray-600 mt-2">
                    Our skilled artisans process the pink salt in clean, controlled environments to maintain its purity 
                    and mineral content. For culinary salts, the crystals are carefully crushed and graded to specific 
                    sizes without using heat or chemical treatments that could alter the salt's natural properties. 
                    For salt lamps and decor items, experienced craftsmen hand-carve each piece to achieve beautiful, 
                    one-of-a-kind designs.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltWarehouseImg}
                  alt="Pink Himalayan Salt Warehousing"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Quality Control & Packaging</h4>
                  <p className="text-gray-600 mt-2">
                    Each product undergoes rigorous quality inspection before being carefully packaged to preserve its 
                    natural properties. Our culinary salts are sealed in moisture-resistant packaging to maintain freshness, 
                    while our salt lamps and decor items are securely packed to prevent damage during shipping. 
                    Our state-of-the-art warehousing facilities ensure all products are stored in optimal conditions 
                    before being distributed to customers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4: Global Distribution */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4 border-b pb-2">STEP 4: FROM OUR WAREHOUSE TO YOUR HOME</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltLampsImg}
                  alt="Salt Lamp Collection"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Global Distribution</h4>
                  <p className="text-gray-600 mt-2">
                    With our warehouse in the USA and international shipping capabilities, we ensure our premium Pink Himalayan Salt 
                    products reach customers worldwide in perfect condition. Our logistics network is designed to provide efficient 
                    delivery while maintaining the integrity of these delicate natural products. From the ancient 
                    Khewra Salt Mine to your doorstep, we maintain the highest standards at every step.
                  </p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltCulinaryImg}
                  alt="Culinary Salt Products"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h4 className="font-heading font-semibold">Premium Final Products</h4>
                  <p className="text-gray-600 mt-2">
                    The culmination of our meticulous process results in a diverse range of premium products - from gourmet culinary salts 
                    that enhance the flavor of your dishes, to therapeutic bath salts for relaxation, to our signature hand-carved salt lamps 
                    that purify your air and create a soothing ambiance. Each product preserves the full spectrum of 84+ minerals and 
                    trace elements naturally present in this ancient salt deposit, bringing the benefits of 250 million years of natural 
                    formation to your home.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="italic text-gray-600">
              "From the ancient depths of the Himalayan mountains to your table, our salt takes an extraordinary journey - preserving its natural purity and mineral richness at every step."
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Failed to load products</h3>
            <p className="text-gray-600 mb-4">There was an error loading the products. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">No products match your current filter. Try changing your filter criteria.</p>
            <Button onClick={() => setActiveCategory("all")}>View All Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="product-card overflow-hidden">
                <Link href={`/products/${product.slug}`} className="block h-64 overflow-hidden">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs text-secondary font-accent font-semibold uppercase tracking-wider bg-transparent border border-secondary mb-2">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Badge>
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-lg font-heading font-semibold hover:text-secondary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mt-2">
                    <div className="text-yellow-400 flex">
                      {renderStars(4.5)} {/* Placeholder rating, could be from product data */}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">(42 reviews)</span>
                  </div>
                  <CardFooter className="flex justify-between items-center mt-4 p-0">
                    {product.sale_price ? (
                      <div>
                        <span className="text-lg font-accent font-semibold">${product.sale_price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-accent font-semibold">${product.price.toFixed(2)}</span>
                    )}
                    <Button 
                      size="icon" 
                      className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary-dark transition duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
