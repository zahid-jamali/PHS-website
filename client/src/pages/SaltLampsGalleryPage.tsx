import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import ProductImage from "@/components/ui/ProductImage";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define lamp data with direct paths to assets folder
const saltLamps = [
  {
    id: 1,
    name: "Firebowl Salt Lamp",
    image: "/assets/salt-lamps/firebowl-salt-lamp.jpg",
    description: "Natural salt chunks in a beautiful metal bowl design, creating a warm, relaxing glow.",
    price: 49.99,
    category: "lamps"
  },
  {
    id: 2,
    name: "Arabian Horse Salt Lamp",
    image: "/assets/salt-lamps/arabian-horse-lamp.webp",
    description: "Elegantly carved horse sculpture salt lamp, perfect as a decorative piece for any room.",
    price: 69.99,
    category: "lamps"
  },
  {
    id: 3,
    name: "Wooden Chunk Salt Lamp",
    image: "/assets/salt-lamps/chunk-lamp-2.webp",
    description: "Salt chunks in a handcrafted wooden frame, combining natural elements for a rustic look.",
    price: 54.99,
    category: "lamps"
  },
  {
    id: 4,
    name: "Carved Salt Lamp",
    image: "/assets/salt-lamps/carved-salt-lamp.webp",
    description: "Artistically carved salt lamp that adds charm and positive energy to your space.",
    price: 59.99,
    category: "lamps"
  },
  {
    id: 5,
    name: "Swan Salt Lamp",
    image: "/assets/salt-lamps/swan-salt-lamp.png",
    description: "Elegant swan carved from pink Himalayan salt, a symbol of grace and natural beauty.",
    price: 59.99,
    category: "lamps"
  },
  {
    id: 6,
    name: "USB Salt Lamp",
    image: "/assets/salt-lamps/usb-salt-lamp.jpg",
    description: "Compact USB-powered salt lamp, perfect for desks, offices, and small spaces.",
    price: 34.99,
    category: "lamps"
  },
  {
    id: 7,
    name: "Chuck Salt Lamp",
    image: "/assets/salt-lamps/chunk-lamp.webp",
    description: "Natural salt chunks in a premium metal basket, providing a soothing ambiance for any room.",
    price: 49.99,
    category: "lamps"
  }
];

export default function SaltLampsGalleryPage() {
  // Add to cart functionality (placeholder)
  const handleAddToCart = (lamp: any) => {
    console.log(`Added ${lamp.name} to cart`);
    // Actual cart functionality would be implemented here
  };

  return (
    <>
      <Helmet>
        <title>Salt Lamps Gallery | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Explore our unique collection of handcrafted Pink Himalayan salt lamps. Each lamp serves as both a beautiful decorative piece and a natural air purifier."
        />
        <meta name="keywords" content="Pink Himalayan Salt Lamps, salt decor, natural air purifier, Dr. Abdul PHS, carved salt lamps" />
      </Helmet>

      <div className="bg-neutral-beige py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Salt Lamps Gallery</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            Salt Lamps Gallery
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">
            Each of our unique salt lamps is hand-selected and crafted to bring natural beauty and wellness to your home.
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-heading font-semibold mb-4">Benefits of Himalayan Salt Lamps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-heading font-semibold mb-2">Air Purification</h3>
                <p className="text-gray-600">
                  Salt lamps naturally attract water molecules from the air, along with allergens, bacteria, and pollutants they carry.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-heading font-semibold mb-2">Negative Ion Generation</h3>
                <p className="text-gray-600">
                  When heated, salt lamps release negative ions that can boost blood flow, improve alertness, and increase energy levels.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-heading font-semibold mb-2">Mood Enhancement</h3>
                <p className="text-gray-600">
                  The warm, amber glow of salt lamps creates a calming atmosphere that can help reduce stress and improve sleep.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
            {saltLamps.map(lamp => (
              <div key={lamp.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <ProductImage 
                    src={lamp.image} 
                    alt={lamp.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2">{lamp.name}</h3>
                  <p className="text-gray-600 mb-4 min-h-[4.5rem]">{lamp.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-secondary">${lamp.price.toFixed(2)}</span>
                    <Button 
                      onClick={() => handleAddToCart(lamp)}
                      className="bg-secondary hover:bg-secondary-dark text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-neutral-beige p-8 rounded-lg">
            <h2 className="text-2xl font-heading font-semibold mb-4">Care Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">How to Use Your Salt Lamp</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Place your lamp on a protective surface as salt can leak moisture</li>
                  <li>Keep your lamp turned on as much as possible to maintain its air-cleansing properties</li>
                  <li>Position lamps in areas where you spend the most time for maximum benefits</li>
                  <li>For USB lamps, connect to any standard USB port or adapter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">Maintenance and Cleaning</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>When lamp is off and cool, wipe with a slightly damp cloth</li>
                  <li>If your lamp becomes wet, dry it immediately with a towel</li>
                  <li>Avoid placing in highly humid areas like bathrooms</li>
                  <li>Replace bulbs as needed with our compatible replacement bulbs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center my-12">
            <h2 className="text-2xl font-heading font-semibold mb-4">Looking for Wholesale Options?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We offer special pricing and custom packaging solutions for retailers, spas, and wellness centers.
            </p>
            <Button asChild className="bg-primary hover:bg-primary-dark text-white">
              <Link href="/wholesale">
                Wholesale Inquiries
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}