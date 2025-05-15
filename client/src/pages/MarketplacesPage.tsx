import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiShopify, SiAmazon, SiWalmart, SiEbay, SiEtsy, SiTarget, SiInstacart } from "react-icons/si";
import { FaStoreAlt } from "react-icons/fa";
import ProductImage from "@/components/ui/ProductImage";

// Import image assets
import saltLampImg from "@/assets/salt-lamps.webp";
import himalayaImg from "@/assets/himalayan-salt.webp";

export default function MarketplacesPage() {
  const marketplaces = [
    {
      name: "Shopify",
      icon: <SiShopify className="text-4xl mb-3 text-[#7AB55C]" />,
      description: "Our official store with our complete product lineup and exclusive offers.",
      link: "/shopify",
      color: "bg-[#7AB55C]/10",
      buttonColor: "border-[#7AB55C] text-[#7AB55C] hover:bg-[#7AB55C] hover:text-white"
    },
    {
      name: "Amazon",
      icon: <SiAmazon className="text-4xl mb-3 text-[#FF9900]" />,
      description: "Shop with Prime benefits including fast shipping and easy returns.",
      link: "/amazon",
      color: "bg-[#FF9900]/10",
      buttonColor: "border-[#FF9900] text-[#FF9900] hover:bg-[#FF9900] hover:text-white"
    },
    {
      name: "Walmart",
      icon: <SiWalmart className="text-4xl mb-3 text-[#0071CE]" />,
      description: "Available online and in select Walmart stores for pickup.",
      link: "/walmart",
      color: "bg-[#0071CE]/10",
      buttonColor: "border-[#0071CE] text-[#0071CE] hover:bg-[#0071CE] hover:text-white"
    },
    {
      name: "eBay",
      icon: <SiEbay className="text-4xl mb-3 text-[#E53238]" />,
      description: "Special deals and promotions, with buyer protection.",
      link: "/ebay",
      color: "bg-[#E53238]/10",
      buttonColor: "border-[#E53238] text-[#E53238] hover:bg-[#E53238] hover:text-white"
    },
    {
      name: "Etsy",
      icon: <SiEtsy className="text-4xl mb-3 text-[#F56400]" />,
      description: "Handcrafted and artisanal salt products and gift collections.",
      link: "/etsy",
      color: "bg-[#F56400]/10",
      buttonColor: "border-[#F56400] text-[#F56400] hover:bg-[#F56400] hover:text-white"
    },
    {
      name: "Target",
      icon: <SiTarget className="text-4xl mb-3 text-[#CC0000]" />,
      description: "Coming soon to Target.com and select Target locations.",
      link: "/target",
      color: "bg-[#CC0000]/10",
      buttonColor: "border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white"
    },
    {
      name: "Costco",
      icon: <FaStoreAlt className="text-4xl mb-3 text-[#005DAA]" />,
      description: "Bulk sizes and special member pricing at select Costco warehouses.",
      link: "/costco",
      color: "bg-[#005DAA]/10",
      buttonColor: "border-[#005DAA] text-[#005DAA] hover:bg-[#005DAA] hover:text-white"
    },
    {
      name: "Instacart",
      icon: <SiInstacart className="text-4xl mb-3 text-[#43B02A]" />,
      description: "Same-day delivery available in select areas through Instacart.",
      link: "/instacart",
      color: "bg-[#43B02A]/10",
      buttonColor: "border-[#43B02A] text-[#43B02A] hover:bg-[#43B02A] hover:text-white"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Online Marketplaces - Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Purchase Dr. Abdul's Pink Himalayan Salt products across all major online marketplaces including Shopify, Amazon, Walmart, eBay, and more."
        />
      </Helmet>

      {/* Hero Banner with Background Image */}
      <div className="relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ProductImage 
            src={himalayaImg} 
            alt="Himalayan Salt Mountains"
            className="w-full h-full object-cover"
            aspectRatio="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/80"></div>
        </div>
        <div className="relative z-10 py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Shop Our Products Everywhere
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Dr. Abdul PHS products are available on all major online marketplaces, giving you the flexibility to shop from your preferred platform.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Global Marketplace Presence</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Choose your preferred online marketplace to purchase our premium Pink Himalayan Salt products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {marketplaces.map((marketplace, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md ${marketplace.color}`}>
                <div className="flex flex-col items-center">
                  {marketplace.icon}
                  <h3 className="font-heading font-semibold text-xl mb-2">{marketplace.name}</h3>
                  <p className="text-center mb-6">{marketplace.description}</p>
                  <Button 
                    variant="outline" 
                    asChild 
                    className={`w-full ${marketplace.buttonColor}`}
                  >
                    <Link href={marketplace.link}>Visit Store</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">Why We're Available Everywhere</h2>
              <p className="max-w-3xl mx-auto">
                We're committed to making our premium Pink Himalayan Salt products accessible to everyone, regardless of where you prefer to shop online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-center font-heading font-semibold mb-2">Customer Convenience</h3>
                <p className="text-center">Shop where you already have accounts, saved payment methods, and shipping preferences.</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-center font-heading font-semibold mb-2">Platform Protection</h3>
                <p className="text-center">Enjoy the security features and customer protections of your trusted marketplace.</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-center font-heading font-semibold mb-2">Shipping Options</h3>
                <p className="text-center">Take advantage of Prime, Walmart+, or other expedited shipping services you're subscribed to.</p>
              </div>
            </div>
          </div>

          {/* Featured Products Preview */}
          <div className="bg-white p-8 rounded-lg shadow-lg mt-16 mb-12">
            <h2 className="text-2xl font-heading font-semibold text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltLampImg}
                  alt="Premium Salt Lamps"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Premium Salt Lamps</h3>
                  <p className="text-gray-600 mb-4">Our signature handcrafted Himalayan salt lamps, available in various sizes and designs.</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Link href="/salt-lamps">View Collection</Link>
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={himalayaImg}
                  alt="Culinary Salt Products"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Culinary Salt Products</h3>
                  <p className="text-gray-600 mb-4">Premium Himalayan salt for cooking, including grinders, blocks, and specialty seasonings.</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Link href="/products">View Collection</Link>
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <ProductImage
                  src={saltLampImg}
                  alt="Wholesale Solutions"
                  className="h-64"
                  aspectRatio="landscape"
                />
                <div className="p-4">
                  <h3 className="font-heading font-semibold">Wholesale Solutions</h3>
                  <p className="text-gray-600 mb-4">Bulk pricing and wholesale options for retailers, spas, and wellness centers.</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                    <Link href="/wholesale">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/products">Shop Our Products Directly</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}