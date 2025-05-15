import { Helmet } from 'react-helmet';
import { SiShopify } from "react-icons/si";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductImage from "@/components/ui/ProductImage";

// Import product images
import saltLampImg from "@/assets/salt-lamps.webp";
import saltCulinaryImg from "@/assets/salt-culinary.webp";
import saltMineImg from "@/assets/khewra-mining.webp";

export default function ShopifyPage() {
  return (
    <>
      <Helmet>
        <title>Shopify Store - Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Shop Dr. Abdul's premium Pink Himalayan Salt products on our official Shopify store. Browse the full collection of culinary, therapeutic, and home decor salt products."
        />
      </Helmet>

      <div className="bg-neutral-beige py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <SiShopify className="text-7xl text-[#7AB55C]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Official Shopify Store</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Browse our complete collection of premium Pink Himalayan Salt products on our official Shopify store.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">Why Shop on Our Shopify Store?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Complete Product Range</h3>
                  <p>Access our entire collection including exclusive items not available on other platforms.</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Special Discounts</h3>
                  <p>Enjoy exclusive discounts, bundle offers, and loyalty rewards only available on our official store.</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Direct Support</h3>
                  <p>Get direct customer service and product consultation from our team of experts.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="btn-primary">
                <a href="https://dradbulphs.myshopify.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <SiShopify className="mr-2" />
                  Visit Our Shopify Store
                </a>
              </Button>
              <p className="mt-4 text-sm text-gray-500">You will be redirected to our secure Shopify store</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-center">Featured Products on Our Shopify Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltCulinaryImg}
                  alt="Premium Cooking Salt Collection"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Premium Cooking Salt Collection</h3>
                  <p className="text-gray-500 mb-2">From $14.99</p>
                  <p className="text-gray-600 mb-4">Our finest culinary salt collection for professional chefs and home cooking enthusiasts.</p>
                  <Button className="w-full bg-[#95BF47] hover:bg-[#95BF47]/80 text-white">
                    <a href="https://dradbulphs.myshopify.com" target="_blank" rel="noopener noreferrer">
                      View on Shopify
                    </a>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltLampImg}
                  alt="Signature Salt Lamp Collection"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Signature Salt Lamp Collection</h3>
                  <p className="text-gray-500 mb-2">From $29.99</p>
                  <p className="text-gray-600 mb-4">Handcrafted salt lamps in various sizes and designs to enhance your home's atmosphere.</p>
                  <Button className="w-full bg-[#95BF47] hover:bg-[#95BF47]/80 text-white">
                    <a href="https://dradbulphs.myshopify.com" target="_blank" rel="noopener noreferrer">
                      View on Shopify
                    </a>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltMineImg}
                  alt="Interior of Khewra Salt Mine in Pakistan"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Salt Mine Exclusive Collection</h3>
                  <p className="text-gray-500 mb-2">From $24.99</p>
                  <p className="text-gray-600 mb-4">Limited edition products crafted inside the 250-million-year-old Khewra Salt Mines, with unique mineral content.</p>
                  <Button className="w-full bg-[#95BF47] hover:bg-[#95BF47]/80 text-white">
                    <a href="https://dradbulphs.myshopify.com" target="_blank" rel="noopener noreferrer">
                      View on Shopify
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold mb-6">Explore Other Marketplaces</h2>
            <p className="mb-8">
              Dr. Abdul PHS products are available on multiple online platforms for your convenience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button variant="outline" asChild>
                <Link href="/amazon">Amazon</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/walmart">Walmart</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/ebay">eBay</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/etsy">Etsy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/marketplaces">All Marketplaces</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}