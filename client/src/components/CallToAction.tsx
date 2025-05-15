import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <section className="py-16 bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Ready to Experience Premium Pink Himalayan Salt?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">Whether you're looking for wholesale solutions, retail products, or expert consultation for your salt therapy business, we're here to help.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            asChild
            className="bg-accent hover:bg-accent-dark text-white font-accent"
          >
            <a href="#products">
              Shop Now <i className="fas fa-shopping-cart ml-2"></i>
            </a>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-accent"
          >
            <a href="#contact">
              Contact Us <i className="fas fa-envelope ml-2"></i>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
