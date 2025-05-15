import { Medal, Truck, UserRound } from "lucide-react";

export default function USPSection() {
  return (
    <section className="py-12 bg-neutral-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-4 text-secondary text-3xl flex justify-center">
              <Medal className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">100% Authentic</h3>
            <p className="text-sm text-neutral-dark">
              Directly sourced from the ancient Khewra Salt Mine in Pakistan, ensuring the highest quality and purity.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-4 text-secondary text-3xl flex justify-center">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Direct Supply Chain</h3>
            <p className="text-sm text-neutral-dark">
              From industry to customer with our warehouse in the USA for fast delivery and competitive pricing.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="mb-4 text-secondary text-3xl flex justify-center">
              <UserRound className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Expert Guidance</h3>
            <p className="text-sm text-neutral-dark">
              Dr. Abdul's expertise in halotherapy ensures you receive the best salt products for therapeutic needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
