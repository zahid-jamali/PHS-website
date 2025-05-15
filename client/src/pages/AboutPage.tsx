import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Medal, Droplet, Mountain, Heart, ClipboardCheck } from "lucide-react";
import { Helmet } from "react-helmet";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Learn about Dr. Abdul PHS, our story, and our commitment to bringing the purest Pink Himalayan Salt from Pakistan to health-conscious consumers worldwide."
        />
        <meta name="keywords" content="Pink Himalayan Salt, Dr. Abdul, salt history, salt benefits, salt source, Pakistan salt" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/khewra-salt-mine-entrance.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover the journey of Dr. Abdul PHS and our mission to bring the purest Pink Himalayan Salt to the world
          </p>
          <div className="mt-8 inline-block bg-black/30 backdrop-blur-sm py-2 px-4 rounded-md">
            <p className="text-sm md:text-base text-white font-medium italic">
              The Historic Entrance to Khewra Salt Mine, Pakistan — Established 1916
            </p>
          </div>
        </div>
      </div>

      {/* Our Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Our Journey</h2>
              <p className="mb-6 text-lg">
                Dr. Abdul PHS was founded with a passion for bringing the purest Pink Himalayan Salt directly from Pakistan to health-conscious consumers worldwide. Our journey began in the ancient salt mines of the Himalayas, where nature has been crafting the perfect salt for millions of years.
              </p>
              <p className="mb-6 text-lg">
                With over 15 years of experience in halotherapy and salt products, Dr. Abdul has dedicated his career to sharing the numerous health benefits of this mineral-rich salt while ensuring sustainable and ethical sourcing practices.
              </p>
              <p className="mb-6 text-lg">
                Today, we're proud to be one of the leading suppliers of authentic Pink Himalayan Salt in the United States, with a commitment to quality, purity, and customer satisfaction that remains as strong as ever.
              </p>
            </div>
            <div>
              <img 
                src="/images/108.webp" 
                alt="Crystal Palace Tunnel in Khewra Salt Mine" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dr. Abdul Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/images/KSM1.jpg" 
                alt="Illuminated Salt Formation at Khewra Salt Mine" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Meet Dr. Abdul</h2>
              <p className="mb-6 text-lg">
                With a background in nutritional science and a doctorate in natural medicine, Dr. Abdul has been at the forefront of researching and advocating for the therapeutic benefits of Pink Himalayan Salt.
              </p>
              <p className="mb-6 text-lg">
                His journey began in the salt mines of Pakistan, where his family has been involved in salt harvesting for generations. This deep connection to the source has given Dr. Abdul unparalleled knowledge about the purity, quality, and benefits of Pink Himalayan Salt.
              </p>
              <p className="mb-6 text-lg">
                Dr. Abdul is particularly passionate about halotherapy (salt therapy) and has consulted for numerous wellness centers around the world, helping them create effective salt therapy environments that maximize health benefits for their clients.
              </p>
              <div className="flex justify-start">
                <Button asChild className="btn-primary">
                  <Link href="/halotherapy">
                    Learn About Halotherapy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Salt Source Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Our Salt Source</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              The journey of our Pink Himalayan Salt from the ancient mines to your doorstep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-6 text-lg">
                Our Pink Himalayan Salt is sourced exclusively from the renowned Khewra Salt Mine in Pakistan, the second largest salt mine in the world. These ancient salt deposits were formed over 250 million years ago when prehistoric seas evaporated, leaving behind these mineral-rich salt deposits.
              </p>
              <p className="mb-6 text-lg">
                The Khewra mine is known for producing some of the purest salt in the world, with salt that ranges from off-white to deep pink in color, depending on the mineral content. The distinctive pink color comes from the presence of iron oxide and other trace minerals.
              </p>
              <p className="mb-6 text-lg">
                We maintain direct relationships with local mining communities, ensuring ethical working conditions and fair compensation while preserving traditional harvesting techniques that have been passed down through generations.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Hand-Extracted</h4>
                    <p className="text-sm">Traditional methods preserve mineral content</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Quality Tested</h4>
                    <p className="text-sm">Rigorous testing ensures purity and safety</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/images/KHEWRA SALT MINE IMAGES.jpg" 
                alt="Khewra Salt Mine in Pakistan" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Benefits of Pink Himalayan Salt</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Discover why Pink Himalayan Salt is superior to ordinary table salt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Medal className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">Mineral Rich</h3>
              <p>
                Contains 84+ natural minerals and trace elements including potassium, magnesium, and calcium that are essential for bodily functions and overall wellbeing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Droplet className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">Lower Sodium</h3>
              <p>
                Has larger crystals with less sodium per teaspoon compared to table salt, helping you reduce overall sodium intake while enhancing flavor in your dishes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <ClipboardCheck className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">No Additives</h3>
              <p>
                Unlike table salt, our Pink Himalayan Salt is unprocessed and free from anti-caking agents, bleaching chemicals, and other artificial additives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Mountain className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">Natural Purity</h3>
              <p>
                Formed over 250 million years ago in an unpolluted environment, preserving its pristine quality and ensuring you receive the purest salt available.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Heart className="text-secondary h-8 w-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">Improved Hydration</h3>
              <p>
                The mineral content helps your body absorb and use the water you drink more efficiently, promoting better hydration and cellular function.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">Nutrient Absorption</h3>
              <p>
                The balanced mineral composition supports better nutrient absorption in the digestive system, aiding in overall digestive health and function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/KHEWRA SALT MINE.jpg" 
                alt="Entrance of the Khewra Salt Mine" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Our Commitment</h2>
              <p className="mb-6 text-lg">
                At Dr. Abdul PHS, we are committed to bringing you the highest quality Pink Himalayan Salt while maintaining environmentally sustainable and socially responsible business practices.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Quality Assurance</h4>
                    <p>
                      Every batch of our salt undergoes rigorous testing to ensure it meets our strict standards for purity, mineral content, and safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Sustainable Sourcing</h4>
                    <p>
                      We work directly with local communities in Pakistan to ensure responsible mining practices that protect the environment and preserve the salt mines for future generations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Fair Trade</h4>
                    <p>
                      We pay fair prices for our salt and support local communities through employment opportunities and community development initiatives.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-2xl">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">Eco-Friendly Packaging</h4>
                    <p>
                      We are continuously working to reduce our environmental footprint by using recyclable and biodegradable packaging materials whenever possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Board of Directors Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-4">Board of Directors</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Meet the visionary leadership team guiding Dr. Abdul PHS toward excellence in quality, sustainability, and global wellness
            </p>
          </div>
          
          <div className="mb-8">
            {/* Chairman & CEO */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto overflow-hidden bg-neutral-100">
                  <img 
                    src="/assets/8a8a1f0c-913d-44d6-9349-062dd2aefeed.jpeg" 
                    alt="Dr. Abdul" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-bold mb-1">Dr. Abdul</h3>
                  <p className="text-secondary mb-3 font-medium">Chairman & CEO</p>
                  <p className="mb-4">
                    As the founder and visionary behind Dr. Abdul PHS, Dr. Abdul brings decades of expertise in the natural health industry. His commitment to bringing the purest Himalayan salt products to global markets has established our company as a leader in wellness and natural remedies.
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-medium mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Strategic Leadership</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Industry Expertise</span>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">International Business</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-center">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Director 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden bg-neutral-100">
                <img 
                  src="/assets/108.webp" 
                  alt="Rafique Ahmed" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Rafique Ahmed</h3>
                <p className="text-secondary mb-3 font-medium">Chief Executive Officer - Pakistan (Hon)</p>
                <p className="mb-4">
                  With over 25 years of experience in global wellness and natural products, Rafique Ahmed leads our Pakistan operations and strategic initiatives to deliver authentic Pink Himalayan Salt to wellness-conscious consumers worldwide.
                </p>
                <div className="border-t pt-4">
                  <p className="font-medium mb-1">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Business Operations</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Strategic Planning</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Global Markets</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Director 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden bg-neutral-100">
                <img 
                  src="/assets/102.webp" 
                  alt="Mr. Mazhar Hussain" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Mr. Mazhar Hussain</h3>
                <p className="text-secondary mb-3 font-medium">Chief Export Officer</p>
                <p className="mb-4">
                  With extensive experience in international trade and export regulations, Mr. Mazhar Hussain leads our global export operations, ensuring Pink Himalayan Salt products reach customers worldwide while meeting all regulatory and quality standards.
                </p>
                <div className="border-t pt-4">
                  <p className="font-medium mb-1">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">International Trade</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Export Regulations</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Global Logistics</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Director 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden bg-neutral-100">
                <img 
                  src="/assets/105.webp" 
                  alt="Mr. Nadeem Ahmed" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Mr. Nadeem Ahmed</h3>
                <p className="text-secondary mb-3 font-medium">Chief Marketing Officer</p>
                <p className="mb-4">
                  With expertise in global marketing strategies and deep connections to the Khewra Salt Mine region, Mr. Nadeem Ahmed leads our brand development, customer engagement, and market expansion efforts for Pink Himalayan Salt products worldwide.
                </p>
                <div className="border-t pt-4">
                  <p className="font-medium mb-1">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Global Marketing</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Brand Development</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Market Expansion</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Director 4 - CTO */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-64 overflow-hidden bg-neutral-100">
                <img 
                  src="/assets/b-01.webp" 
                  alt="Mr. Abdul Razzaque Buller" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Mr. Abdul Razzaque Buller</h3>
                <p className="text-secondary mb-3 font-medium">Chief Technology Officer</p>
                <p className="mb-4">
                  As our technological innovator, Mr. Abdul Razzaque Buller drives digital transformation and technical advancement across our operations, ensuring our production methods combine traditional knowledge with modern efficiency.
                </p>
                <div className="border-t pt-4">
                  <p className="font-medium mb-1">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Technology Innovation</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Digital Systems</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Process Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="btn-secondary">
              <Link href="/contact">
                Connect With Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Experience the Dr. Abdul PHS Difference</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have made the switch to our premium Pink Himalayan Salt products for their culinary, therapeutic, and wellness needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="/products">
                Shop Our Products
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
