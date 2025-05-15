import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import saltLampsImg from "../../assets/salt-lamps-new.webp";
import saltCulinaryImg from "../../assets/salt-culinary-new.webp";

export default function ProductsShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">
            Featured Products
          </h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Discover our most popular Pink Himalayan Salt products for culinary, therapeutic, and decorative use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Category 1: Salt Lamps */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg">
            <img 
              src={saltLampsImg} 
              alt="Salt Lamps Collection" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-heading font-semibold mb-2">Salt Lamps & Decor</h3>
              <p className="text-white/90 mb-4 max-w-md">
                Natural air purifiers that create a warm, calming ambiance in any space while releasing negative ions.
              </p>
              <Button 
                variant="outline" 
                asChild 
                className="w-fit text-white border-white bg-black/30 hover:bg-white hover:text-neutral-dark"
              >
                <Link href="/products?category=home">
                  Explore Collection
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Category 2: Culinary Salt */}
          <div className="relative group overflow-hidden rounded-xl shadow-lg">
            <img 
              src={saltCulinaryImg} 
              alt="Culinary Salt Collection" 
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-heading font-semibold mb-2">Culinary Salt Products</h3>
              <p className="text-white/90 mb-4 max-w-md">
                Elevate your cooking with our mineral-rich salt products, from grinders to cooking blocks and gourmet salt flakes.
              </p>
              <Button 
                variant="outline" 
                asChild 
                className="w-fit text-white border-white bg-black/30 hover:bg-white hover:text-neutral-dark"
              >
                <Link href="/products?category=culinary">
                  Explore Collection
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="btn-primary">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}