import { Link } from "wouter";
import { SiShopify, SiAmazon, SiWalmart, SiEbay, SiEtsy } from "react-icons/si";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MarketplaceIntegrations() {
  const marketplaces = [
    {
      name: "Amazon",
      icon: <SiAmazon className="text-5xl text-[#FF9900]" />,
      color: "bg-gradient-to-r from-[#FF9900]/10 to-[#FF9900]/5",
      link: "/amazon"
    },
    {
      name: "Shopify",
      icon: <SiShopify className="text-5xl text-[#95BF47]" />,
      color: "bg-gradient-to-r from-[#95BF47]/10 to-[#95BF47]/5",
      link: "/shopify"
    },
    {
      name: "Walmart",
      icon: <SiWalmart className="text-5xl text-[#0071DC]" />,
      color: "bg-gradient-to-r from-[#0071DC]/10 to-[#0071DC]/5",
      link: "/marketplaces"
    },
    {
      name: "eBay",
      icon: <SiEbay className="text-5xl text-[#E53238]" />,
      color: "bg-gradient-to-r from-[#E53238]/10 to-[#E53238]/5",
      link: "/marketplaces"
    },
    {
      name: "Etsy",
      icon: <SiEtsy className="text-5xl text-[#F56400]" />,
      color: "bg-gradient-to-r from-[#F56400]/10 to-[#F56400]/5",
      link: "/marketplaces"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Available on Global Marketplaces</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dr. Abdul PHS products are available on multiple online platforms for your convenience.
            Shop from your preferred marketplace with secure transactions and trusted shipping.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {marketplaces.map((marketplace) => (
            <motion.div
              key={marketplace.name}
              className={`rounded-xl ${marketplace.color} p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow`}
              variants={itemVariants}
            >
              <div className="mb-4">
                {marketplace.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">{marketplace.name}</h3>
              <Link href={marketplace.link}>
                <Button variant="link" className="text-gray-600 hover:text-primary">
                  Shop Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
            <Link href="/marketplaces">View All Marketplaces</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}