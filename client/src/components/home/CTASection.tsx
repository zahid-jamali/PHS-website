import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-70"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-neutral-dark">Ready to Experience Premium Pink Himalayan Salt?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Whether you're looking for culinary products, therapeutic solutions, or wholesale opportunities, we have the perfect Pink Himalayan Salt for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-primary">
                <Link href="/products">
                  Shop Our Products
                </Link>
              </Button>
              <Button variant="outline" asChild className="btn-outline">
                <Link href="/wholesale">
                  Wholesale Inquiries
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
