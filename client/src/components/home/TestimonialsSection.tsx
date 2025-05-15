import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Michael Roberts",
    role: "Health Food Store Owner",
    image: "/assets/salt-lamps/PHS ARABIAN HORSE LAMP.webp",
    text: "We've been sourcing our salt products from Dr. Abdul PHS for over two years now. The quality is consistently excellent, and their wholesale prices allow us to maintain healthy margins.",
    rating: 5
  },
  {
    id: 2,
    name: "Jennifer Chang",
    role: "Spa Owner",
    image: "/assets/salt-lamps/logo.webp",
    text: "The halotherapy consultation service was invaluable for our spa. Dr. Abdul helped us create a beautiful salt room that has become our most popular feature. Our revenue has increased by 30%!",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Mendez",
    role: "Executive Chef",
    image: "/assets/salt-lamps/KHEWRA SM 02.jpeg",
    text: "I switched to Dr. Abdul's culinary salt for my restaurants, and the difference in taste is remarkable. Customers notice the improved flavor, and I appreciate the direct sourcing and sustainability aspects.",
    rating: 4.5
  }
];

const clientLogos = [
  "/assets/salt-lamps/logo.webp",
  "/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg",
  "/assets/salt-lamps/KHEWRA SM 02.jpeg",
  "/assets/salt-lamps/PHS CHUNK LAMP.webp",
  "/assets/salt-lamps/PHS ARABIAN HORSE LAMP.webp"
];

export default function TestimonialsSection() {
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
        <svg key="half-star" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
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

  return (
    <section className="py-16 bg-neutral-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">What Our Clients Say</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Hear from businesses and individuals who have experienced the quality and benefits of our Pink Himalayan Salt products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="italic mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-8 justify-center items-center">
          {clientLogos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt="Trusted Client" 
              className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
