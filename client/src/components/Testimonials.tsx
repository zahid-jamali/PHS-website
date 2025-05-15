import ClientAvatar from './ui/ClientAvatar';

interface Testimonial {
  name: string;
  role: string;
  variant: 'primary' | 'secondary' | 'accent';
  content: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Wellness Spa Owner, Denver",
      variant: "primary",
      content: "Dr. Abdul helped us set up our salt therapy room with expert advice and premium salt products. Our clients love the results, and we appreciate the consistent quality and reliable supply."
    },
    {
      name: "Michael Rodriguez",
      role: "Gourmet Store Owner, Chicago",
      variant: "secondary",
      content: "We've been sourcing our culinary salt products from Dr. Abdul PHS for over two years. The quality is consistently excellent, and their wholesale prices allow us to maintain healthy margins."
    },
    {
      name: "Jennifer Park",
      role: "Respiratory Center Director, Boston",
      variant: "accent",
      content: "The pharmaceutical-grade salt we purchase for our halotherapy rooms is exceptional. Dr. Abdul's expertise in salt therapy has been invaluable for our center's success and our patients' satisfaction."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary-light to-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-lg text-neutral-brown">See what businesses and individuals have to say about our premium Pink Himalayan Salt products and services.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white rounded-xl p-8 shadow-sm">
              <div className="mb-6">
                <ClientAvatar 
                  name={testimonial.name} 
                  role={testimonial.role}
                  variant={testimonial.variant}
                />
              </div>
              <div className="mb-4 text-accent">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="italic text-neutral-brown">{testimonial.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white inline-block rounded-xl px-8 py-6 shadow-sm">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <h3 className="text-lg font-semibold w-full mb-4">Available on These Marketplaces</h3>
              <span className="text-neutral-800 text-lg font-bold">Amazon</span>
              <span className="text-neutral-800 text-lg font-bold">eBay</span>
              <span className="text-neutral-800 text-lg font-bold">Etsy</span>
              <span className="text-neutral-800 text-lg font-bold">Alibaba</span>
              <span className="text-neutral-800 text-lg font-bold">Shopify</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
