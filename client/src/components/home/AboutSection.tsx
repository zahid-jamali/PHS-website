import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-neutral-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="/images/khewra-salt-mine-entrance.jpg"
              alt="Authentic Khewra Salt Mine Entrance - Est. 1916" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-white py-3 px-5 rounded-lg shadow-lg">
              <p className="font-heading font-semibold text-secondary text-sm md:text-base">
                Historic Khewra Salt Mine Entrance - Est. 1916
              </p>
              <p className="text-xs text-gray-600 mt-1">
                World's second largest salt mine with over 250 million years of history
              </p>
            </div>
          </div>
          <div>
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Our Story & Heritage</h2>
            <p className="mb-6 text-lg">
              Dr. Abdul PHS was founded with a passion for bringing the purest Pink Himalayan Salt directly from Pakistan to health-conscious consumers worldwide. Our journey began in the ancient salt mines of the Himalayas, where nature has been crafting the perfect salt for millions of years.
            </p>
            <p className="mb-6 text-lg">
              With over 15 years of experience in halotherapy and salt products, Dr. Abdul has dedicated his career to sharing the numerous health benefits of this mineral-rich salt while ensuring sustainable and ethical sourcing practices.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Pure & Natural</h4>
                  <p className="text-sm">Free from additives, pollutants, and chemical processing</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Rich in Minerals</h4>
                  <p className="text-sm">Contains 84+ natural minerals beneficial for health</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Health Certified</h4>
                  <p className="text-sm">Meets international standards for food and therapy</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Ethically Sourced</h4>
                  <p className="text-sm">Supporting local communities in Pakistan</p>
                </div>
              </div>
            </div>
            <Button asChild className="btn-primary mb-4">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>

        {/* Processing & Packing Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Processing & Packing Standards</h2>
            <p className="mb-6 text-lg">
              At Dr. Abdul PHS, we maintain the highest standards in processing and packaging our premium Pink Himalayan Salt products. Our modern facility combines traditional craftsmanship with cutting-edge technology to ensure purity and quality at every step.
            </p>
            <p className="mb-6 text-lg">
              Every product undergoes rigorous quality checks before being carefully packaged to preserve its natural mineral content and delivered to customers worldwide.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Quality Controlled</h4>
                  <p className="text-sm">Rigorous testing at every production stage</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-2xl">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Eco-Friendly</h4>
                  <p className="text-sm">Sustainable packaging and minimal waste</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <ProductImage 
              src="/images/102.webp"
              alt="Salt Processing Worker with Premium Pink Himalayan Salt" 
              className="rounded-lg shadow-lg w-full h-96"
              aspectRatio="landscape"
            />
            <div className="absolute -bottom-4 -right-4 bg-white py-3 px-5 rounded-lg shadow-lg">
              <p className="font-heading font-semibold text-secondary text-sm md:text-base">
                Quality-Controlled Salt Processing
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Expert workers in protective gear ensure premium pink salt purity
              </p>
            </div>
          </div>
        </div>

        {/* Khewra Salt Mine Gallery Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-4">Authentic Khewra Salt Mines</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Journey inside the world-famous Khewra Salt Mines of Pakistan, the source of our premium Pink Himalayan Salt for over 250 million years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/images/crystal-palace-tunnel-108.webp"
                alt="Illuminated Crystal Palace Tunnel in Khewra Salt Mine" 
                className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Crystal Palace Tunnel</h3>
                <p className="text-white/80 text-sm">Breathtaking illuminated salt brick corridor with amber glow</p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/images/KHEWRA SALT MINE IMAGES.jpg"
                alt="Natural Salt Chamber in Khewra Salt Mine" 
                className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Natural Salt Chamber</h3>
                <p className="text-white/80 text-sm">Stunning open chamber with dramatic salt formations</p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/images/KHEWRA SALT MINE.jpg"
                alt="Illuminated Walkway in Khewra Salt Mine" 
                className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Illuminated Walkway</h3>
                <p className="text-white/80 text-sm">Modern walkways with colorful illumination for visitors</p>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-lg group">
              <img 
                src="/images/Khewra-Salt-Mine-1024.jpg"
                alt="Salt Wall Formations in Khewra Salt Mine" 
                className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-heading font-semibold">Layered Salt Formations</h3>
                <p className="text-white/80 text-sm">Ancient salt layers showing millions of years of geological history</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/products">
                Explore Our Salt Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
