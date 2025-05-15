import { Helmet } from 'react-helmet';
import { SiAmazon } from "react-icons/si";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductImage from "@/components/ui/ProductImage";

// Import product images
import saltLampImg from "@/assets/salt-lamps.webp";
import saltCulinaryImg from "@/assets/salt-culinary.webp";
import saltTherapyImg from "@/assets/salt-therapy-spa.webp";

export default function AmazonPage() {
  return (
    <>
      <Helmet>
        <title>Amazon Store - Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Shop Dr. Abdul's premium Pink Himalayan Salt products on Amazon. Enjoy fast shipping with Prime and secure purchasing."
        />
      </Helmet>

      <div className="bg-neutral-beige py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <SiAmazon className="text-7xl text-[#FF9900]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Dr. Abdul PHS on Amazon</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Shop our curated collection of premium Pink Himalayan Salt products with the convenience of Amazon Prime.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">Why Shop on Amazon?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-[#FF9900]/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF9900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Prime Shipping</h3>
                  <p>Get fast, free shipping with Amazon Prime, with options for one-day and same-day delivery in eligible areas.</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-[#FF9900]/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF9900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">A-to-Z Guarantee</h3>
                  <p>Shop with confidence knowing your purchase is protected by Amazon's comprehensive A-to-Z Guarantee.</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto bg-[#FF9900]/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF9900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-semibold mb-2">Verified Reviews</h3>
                  <p>Read authentic customer reviews and see our consistently high ratings from verified buyers.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-[#FF9900] hover:bg-[#FF9900]/80 text-white">
                <a href="https://www.amazon.com/stores/DrAbdulPHS/page/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <SiAmazon className="mr-2" />
                  Visit Our Amazon Store
                </a>
              </Button>
              <p className="mt-4 text-sm text-gray-500">You will be redirected to Amazon.com</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-heading font-semibold mb-6 text-center">Featured Amazon Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltCulinaryImg}
                  alt="Premium Salt Grinder Set"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Premium Salt Grinder Set</h3>
                  <div className="flex text-yellow-400 mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">Our best-selling salt grinder set with adjustable coarseness and premium Himalayan salt.</p>
                  <Button className="w-full bg-[#FF9900] hover:bg-[#FF9900]/80 text-white">
                    <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">
                      View on Amazon
                    </a>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltLampImg}
                  alt="Himalayan Salt Lamp"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Himalayan Salt Lamp (6-8 lbs)</h3>
                  <div className="flex text-yellow-400 mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">Natural Himalayan salt lamp with dimmer switch. Perfect for living rooms and bedrooms.</p>
                  <Button className="w-full bg-[#FF9900] hover:bg-[#FF9900]/80 text-white">
                    <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">
                      View on Amazon
                    </a>
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltTherapyImg}
                  alt="Bath Salt Gift Set"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Bath Salt Gift Set (4-Pack)</h3>
                  <div className="flex text-yellow-400 mt-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">Luxury bath salt gift set with four therapeutic blends, perfect for relaxation and detoxification.</p>
                  <Button className="w-full bg-[#FF9900] hover:bg-[#FF9900]/80 text-white">
                    <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">
                      View on Amazon
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
                <Link href="/shopify">Shopify</Link>
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