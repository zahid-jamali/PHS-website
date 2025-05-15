import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative">
      <div 
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: 'url("/images/salt-tunnel-illuminated.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary-dark/50 via-secondary-dark/30 to-secondary-dark/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Elevate Your Health & Cuisine<br />With Nature's Perfect Salt
          </h1>
          <p className="text-lg md:text-xl text-white mb-3 max-w-2xl mx-auto">
            Experience the luxurious taste and healing benefits of premium Pink Himalayan Salt, harvested from ancient sea beds and pristinely packaged for global delivery.
          </p>
          <p className="text-md italic text-white mb-8 max-w-2xl mx-auto">
            Featured: The illuminated salt tunnel in Khewra Salt Mine, Pakistan — The world's oldest salt mine and authentic source of our premium Pink Himalayan Salt
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-6">
              <Link href="/products">
                Shop Products
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild
              size="lg"
              className="border-2 border-white text-white bg-secondary-dark/30 hover:bg-white hover:text-neutral-dark transition duration-300 text-lg px-8 py-6"
            >
              <Link href="/wholesale">
                Wholesale Inquiries
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
