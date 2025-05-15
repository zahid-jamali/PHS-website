import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

// Define lamp data with direct paths to assets folder
const saltLamps = [
  {
    id: 1,
    name: "Firebowl Salt Lamp",
    image: "/images/FIREBOWL SALT.jpg",
    description: "Natural salt chunks in a beautiful metal bowl design, creating a warm, relaxing glow."
  },
  {
    id: 2,
    name: "Arabian Horse Salt Lamp",
    image: "/images/PHS ARABIAN HORSE LAMP.webp",
    description: "Elegantly carved horse sculpture salt lamp, perfect as a decorative piece for any room."
  },
  {
    id: 3,
    name: "Wooden Chunk Salt Lamp",
    image: "/images/PHS CHUNK LAMP.webp",
    description: "Salt chunks in a handcrafted wooden frame, combining natural elements for a rustic look."
  },
  {
    id: 4,
    name: "Carved Salt Lamp",
    image: "/images/CARVED SALT LAMPS 2.webp",
    description: "Artistically carved salt lamp that adds charm and positive energy to your space."
  },
  {
    id: 5,
    name: "Swan Salt Lamp",
    image: "/images/SWAN CARVED SALT LAMP.png",
    description: "Elegant swan carved from pink Himalayan salt, a symbol of grace and natural beauty."
  },
  {
    id: 6,
    name: "USB Salt Lamp",
    image: "/images/Salt-Lamp USB POWERED.jpg",
    description: "Compact USB-powered salt lamp, perfect for desks, offices, and small spaces."
  },
  {
    id: 7,
    name: "Chuck Salt Lamp",
    image: "/images/CHUCK LAMPS.webp",
    description: "Natural salt chunks in a premium metal basket, providing a soothing ambiance for any room."
  }
];

export default function SaltLampsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === saltLamps.length - 3 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? saltLamps.length - 3 : prevIndex - 1
    );
  };

  // Visible lamps based on current index (showing 3 at a time)
  const visibleLamps = [
    saltLamps[currentIndex],
    saltLamps[(currentIndex + 1) % saltLamps.length],
    saltLamps[(currentIndex + 2) % saltLamps.length]
  ];

  return (
    <section className="py-16 bg-neutral-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">
            Artisan Salt Lamps Collection
          </h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Discover our handcrafted salt lamps, each uniquely designed to create a warm ambiance 
            while providing natural air purification benefits.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-secondary-dark rounded-full p-2 shadow-md -ml-4 md:ml-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-secondary-dark rounded-full p-2 shadow-md -mr-4 md:mr-0"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Salt Lamps Carousel */}
          <div className="overflow-hidden">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleLamps.map((lamp) => (
                  <motion.div
                    key={lamp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-lg"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <ProductImage 
                        src={lamp.image} 
                        alt={lamp.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold mb-2">{lamp.name}</h3>
                      <p className="text-gray-600 mb-4 min-h-[3rem]">{lamp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button asChild className="btn-primary bg-secondary hover:bg-secondary-dark text-white">
            <Link href="/salt-lamps-gallery">
              Explore Salt Lamps Gallery
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}