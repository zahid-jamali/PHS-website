import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-neutral-charcoal text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-40 z-10"></div>
      
      {/* Background color */}
      <div 
        className="absolute inset-0 w-full h-full bg-neutral-dark"
      ></div>
      
      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Premium Pink Himalayan Salt</h1>
          <h2 className="font-accent text-xl md:text-2xl font-medium mb-8">Direct from Pakistan | Warehouse in the USA</h2>
          <p className="text-lg mb-8 max-w-2xl">Experience the finest quality Pink Himalayan Salt, sourced directly from ancient salt mines. Perfect for wholesale, retail, and halotherapy solutions.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-white font-accent"
            >
              <a href="#products">
                Shop Products <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg" 
              className="border-2 border-white bg-black/30 hover:border-primary hover:text-primary text-white font-accent"
            >
              <a href="#wholesale">
                Wholesale Inquiry <i className="fas fa-warehouse ml-2"></i>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
