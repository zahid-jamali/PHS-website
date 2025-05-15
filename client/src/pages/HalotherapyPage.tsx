import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Cog, 
  Presentation, 
  Stethoscope, 
  Heart, 
  ShieldCheck,
  CheckCircle 
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function HalotherapyPage() {
  const [activeTab, setActiveTab] = useState("what-is");

  return (
    <>
      <Helmet>
        <title>Halotherapy Solutions | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Expert halotherapy solutions and consultation services from Dr. Abdul PHS. We provide everything you need to create effective salt therapy rooms for spas and wellness centers."
        />
        <meta name="keywords" content="halotherapy, salt therapy, salt room, salt cave, wellness center, spa solutions, respiratory health" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">Halotherapy Solutions</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Specialized salt therapy products and consultation services for wellness centers and spa facilities
          </p>
          <div className="mt-8">
            <Button className="btn-primary" asChild>
              <Link href="#consultation">
                Get a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-neutral-beige py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Halotherapy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* What is Halotherapy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">What is Halotherapy?</h2>
              <p className="mb-6 text-lg">
                Halotherapy (salt therapy) is a natural, non-invasive wellness treatment that reproduces the microclimate of natural salt caves. It involves the therapeutic use of dry salt aerosol, which is dispersed into a controlled environment like a salt room or salt cave.
              </p>
              <p className="mb-6 text-lg">
                Salt therapy has been used for centuries to improve respiratory conditions, skin issues, and overall wellbeing. Modern halotherapy uses specialized equipment called halogenerators to grind pharmaceutical-grade salt into microscopic particles and disperse them into the air.
              </p>
              <p className="mb-6 text-lg">
                As clients relax in the salt room, they inhale these tiny salt particles deep into their lungs, where the salt's natural antibacterial and anti-inflammatory properties go to work. The salt also settles on the skin, providing exfoliating and detoxifying benefits.
              </p>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="what-is">What It Is</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="science">The Science</TabsTrigger>
                </TabsList>
                <TabsContent value="what-is" className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Natural, drug-free therapy using salt microparticles</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Recreates the microclimate of natural salt caves</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Uses halogenerators to grind and disperse salt</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Sessions typically last 30-45 minutes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>No side effects when properly administered</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="benefits" className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Improves respiratory conditions like asthma, bronchitis, and COPD</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Helps with skin conditions including eczema and psoriasis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Reduces stress and promotes relaxation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Strengthens the immune system</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Enhances sports performance and recovery</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="science" className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Salt particles measure 1-5 micrometers for optimal respiratory penetration</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Salt's antibacterial properties help kill pathogens in respiratory system</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Reduces inflammation by drawing water out of swollen tissues</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Negative ions from salt enhance mood and improve sleep patterns</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2" />
                      <span>Consistent sessions provide cumulative health benefits</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <div className="relative">
                <img 
                  src="/src/assets/salt-therapy-room.webp" 
                  alt="Professional Salt Therapy Room Interior with people relaxing" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary rounded-lg shadow-lg p-6 max-w-xs">
                  <p className="text-md italic font-heading text-neutral-dark">
                    "Dr. Abdul's expertise helped us create the perfect salt therapy room for our wellness center. Our clients love it!"
                  </p>
                  <div className="flex items-center mt-4">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                      alt="Sarah Johnson, Wellness Center Director" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold">Sarah Johnson</p>
                      <p className="text-xs text-gray-600">Wellness Center Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Halotherapy Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Benefits of Halotherapy</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Discover the wide-ranging health benefits of salt therapy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Respiratory Health</h4>
              <p>Helps alleviate symptoms of asthma, bronchitis, and other respiratory conditions by reducing inflammation and clearing airways.</p>
              <ul className="mt-4 text-left text-sm space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Clears mucus and improves lung function</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Reduces dependence on inhalers and medications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Helps with allergies and sinus infections</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Stress Reduction</h4>
              <p>Creates a tranquil environment that promotes relaxation, reduces stress, and improves overall mental wellbeing.</p>
              <ul className="mt-4 text-left text-sm space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Releases negative ions that improve mood</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Promotes better sleep patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Creates a meditative, mindful experience</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-secondary text-2xl" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-3">Immune Support</h4>
              <p>Negative ions from salt help strengthen the immune system and improve overall resilience to common illnesses.</p>
              <ul className="mt-4 text-left text-sm space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Kills pathogens and eliminates toxins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Reduces frequency of colds and infections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
                  <span>Supports overall health and vitality</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-heading font-semibold text-lg mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                For Children
              </h4>
              <p className="mb-3">
                Salt therapy is particularly beneficial for children who suffer from respiratory issues like asthma, allergies, and recurring ear infections. It's 100% natural, drug-free, and non-invasive, making it an ideal complementary treatment for children.
              </p>
              <p>
                Many parents report that their children experience fewer sick days, reduced medication needs, and improved sleep after regular halotherapy sessions. Our salt rooms can be designed with child-friendly features to make the experience fun and engaging.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-heading font-semibold text-lg mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
                  <path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v.5" />
                  <path d="M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                  <path d="M6 14v0a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2" />
                  <path d="M18 18v0a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v.5" />
                </svg>
                For Athletes
              </h4>
              <p className="mb-3">
                Athletes increasingly turn to halotherapy to improve performance and recovery. Salt therapy helps enhance lung capacity and oxygen intake, which directly impacts endurance and stamina.
              </p>
              <p>
                The anti-inflammatory properties also support faster recovery after intense training sessions. Many professional sports teams and Olympic athletes incorporate regular halotherapy into their training regimens to gain a competitive edge and reduce downtime due to respiratory illnesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Halotherapy Interior Designs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Halotherapy Interior Designs</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Explore our stunning salt therapy room designs that combine therapeutic efficacy with aesthetic beauty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.pexels.com/photos/3865546/pexels-photo-3865546.jpeg" 
                  alt="Luxury Salt Cave with Loungers" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-heading font-semibold">Luxury Salt Cave</h3>
                  <p className="text-white text-sm">Ideal for high-end spas and resorts</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  This luxury design features comfortable zero-gravity loungers, ambient lighting, and ceiling-to-floor salt coverage for an immersive experience. Capacity: 6-8 clients.
                </p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.pexels.com/photos/3865552/pexels-photo-3865552.jpeg" 
                  alt="Modern Salt Therapy Room" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-heading font-semibold">Modern Salt Room</h3>
                  <p className="text-white text-sm">Clean, contemporary design</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  A modern take on salt therapy featuring sleek design elements, backlit salt panels, and comfortable seating. Perfect for urban wellness centers. Capacity: 4-6 clients.
                </p>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.pexels.com/photos/3865607/pexels-photo-3865607.jpeg" 
                  alt="Family-Friendly Salt Room" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-heading font-semibold">Family Salt Room</h3>
                  <p className="text-white text-sm">Child-friendly environment</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Designed with families in mind, featuring play areas with salt-sand for children and comfortable seating for adults. Ideal for family wellness centers. Capacity: 10-12 clients.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="btn-outline">
              <Link href="#consultation">
                Request a Custom Design Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Our Halotherapy Services Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Our Halotherapy Services</h2>
              <p className="mb-6">
                Dr. Abdul PHS provides comprehensive halotherapy solutions for businesses looking to enhance their wellness offerings. With over 15 years of experience in salt therapy, Dr. Abdul has helped countless wellness centers, spas, and health clinics implement successful halotherapy programs.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-medium mb-4">Our Services Include:</h3>
                <div className="space-y-4">
                  <div className="bg-neutral-beige p-5 rounded-lg">
                    <h5 className="font-heading font-semibold mb-2 flex items-center">
                      <Star className="text-secondary mr-2 h-5 w-5" />
                      Consultation & Design
                    </h5>
                    <p className="text-sm">Expert guidance on creating salt therapy rooms tailored to your space and clientele. We assess your facility, understand your business goals, and design a custom solution that maximizes both therapeutic benefits and ROI.</p>
                  </div>
                  
                  <div className="bg-neutral-beige p-5 rounded-lg">
                    <h5 className="font-heading font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="text-secondary mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                      Premium Halotherapy Salt
                    </h5>
                    <p className="text-sm">Pharmaceutical-grade salt specifically processed for halotherapy applications. Our salt is 99.99% pure sodium chloride with no additives or anti-caking agents, ensuring the safest and most effective therapy experience for your clients.</p>
                  </div>
                  
                  <div className="bg-neutral-beige p-5 rounded-lg">
                    <h5 className="font-heading font-semibold mb-2 flex items-center">
                      <Cog className="text-secondary mr-2 h-5 w-5" />
                      Equipment & Accessories
                    </h5>
                    <p className="text-sm">Halogenerators, salt blocks, panels, and all necessary components for your salt room. We source only the highest quality equipment with proven reliability and performance, backed by comprehensive warranties and ongoing support.</p>
                  </div>
                  
                  <div className="bg-neutral-beige p-5 rounded-lg">
                    <h5 className="font-heading font-semibold mb-2 flex items-center">
                      <Presentation className="text-secondary mr-2 h-5 w-5" />
                      Training & Support
                    </h5>
                    <p className="text-sm">Comprehensive training for your staff on halotherapy benefits and facility management. Our ongoing support ensures your salt therapy offering remains effective, profitable, and differentiated in your market.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4" id="consultation">
                <Button asChild className="btn-primary">
                  <Link href="/contact?subject=halotherapy">
                    Schedule a Consultation
                  </Link>
                </Button>
                <Button variant="outline" asChild className="btn-outline">
                  <a href="/downloads/halotherapy-guide.pdf" download>
                    Download Halotherapy Guide
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Types of Salt Rooms We Can Help You Create</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Traditional Salt Rooms</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          Classic salt rooms feature walls covered with salt blocks or bricks and floors covered with crushed salt. These rooms typically accommodate 4-8 people and include a halogenerator to disperse microscopic salt particles into the air.
                        </p>
                        <p>
                          The ambient lighting (often with color therapy options), comfortable recliners, and soothing music create a relaxing environment for clients during their 30-45 minute sessions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Salt Caves</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          More immersive than traditional salt rooms, salt caves recreate the look and feel of natural salt caves found in Europe. These typically feature more elaborate designs with salt stalactites, curved walls, and special lighting effects.
                        </p>
                        <p>
                          Salt caves can create a premium offering that commands higher prices and provides a unique, Instagram-worthy experience that helps market your business through social media.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Private Salt Booths</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          Individual salt therapy booths are perfect for businesses with limited space or those wanting to offer salt therapy as an add-on service. These compact units still deliver the same therapeutic benefits but in a private setting.
                        </p>
                        <p>
                          Ideal for clients concerned about privacy or those who prefer individual experiences over group sessions. These can also be marketed as premium "express" sessions at a different price point.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>Specialized Salt Therapy Rooms</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-3">
                          We can design specialty rooms that combine salt therapy with other modalities like:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                          <li>Salt yoga studios</li>
                          <li>Salt meditation rooms</li>
                          <li>Salt massage therapy rooms</li>
                          <li>Children's salt playrooms</li>
                        </ul>
                        <p>
                          These hybrid offerings create unique selling propositions and can help your business stand out in competitive markets.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <img 
                src="https://pixabay.com/get/g1f85adce89feb81c55d46a32f3f11a5d1dab834f47e5d5f4d87bd9f9db29bf7e93b80e8f2e41cebbb46bf1339afdd0a1f41e7b9be10b9c7de8e8e6af5d75657b_1280.jpg" 
                alt="Salt Therapy Equipment" 
                className="rounded-lg shadow-lg w-full h-auto"
              />

              <div className="bg-primary p-6 rounded-lg">
                <h4 className="font-heading font-semibold text-lg mb-3">Business Benefits of Adding Halotherapy</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Additional revenue stream with high profit margins</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Differentiate your facility from competitors</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Attract new client demographics</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Low maintenance costs after initial setup</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <span>Creates opportunities for membership packages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Halotherapy Applications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Commercial Applications</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Salt therapy rooms for various business types
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-beige rounded-lg overflow-hidden shadow-md">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/3688756/pexels-photo-3688756.jpeg" 
                  alt="Salt Room for Day Spas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold mb-2">Day Spas</h4>
                <p className="text-sm">
                  Add salt therapy as a premium service to enhance your spa menu and attract new clients seeking respiratory and skin benefits.
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-beige rounded-lg overflow-hidden shadow-md">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/3776144/pexels-photo-3776144.jpeg" 
                  alt="Medical Offices" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold mb-2">Medical Offices</h4>
                <p className="text-sm">
                  Integrate halotherapy as a complementary treatment for patients with respiratory conditions, allergies, and skin issues.
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-beige rounded-lg overflow-hidden shadow-md">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/4498219/pexels-photo-4498219.jpeg" 
                  alt="Fitness Centers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold mb-2">Fitness Centers</h4>
                <p className="text-sm">
                  Help your clients optimize athletic performance and recovery with post-workout salt therapy sessions.
                </p>
              </div>
            </div>
            
            <div className="bg-neutral-beige rounded-lg overflow-hidden shadow-md">
              <div className="h-48">
                <img 
                  src="https://images.pexels.com/photos/3760609/pexels-photo-3760609.jpeg" 
                  alt="Hotels & Resorts" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold mb-2">Hotels & Resorts</h4>
                <p className="text-sm">
                  Differentiate your property with unique wellness amenities that attract health-conscious travelers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-neutral-beige rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-4">Halotherapy ROI Analysis</h3>
                <p className="mb-4">
                  A properly designed and operated salt therapy room can generate significant return on investment. Our analysis shows most businesses recover their investment within 12-18 months.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-2" />
                    <span>Average session charge: $35-65 per person</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-2" />
                    <span>Typical room capacity: 4-8 people per session</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-2" />
                    <span>Low operational costs (salt, electricity, maintenance)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mt-1 mr-2" />
                    <span>Excellent upsell opportunity for membership packages</span>
                  </li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://images.pexels.com/photos/7991653/pexels-photo-7991653.jpeg" 
                  alt="Business owner reviewing halotherapy ROI data" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Success Stories</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Hear from wellness businesses that have implemented our halotherapy solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
              </div>
              <p className="italic mb-6">
                "Working with Dr. Abdul to create our salt cave was an incredible experience. His expertise in both the therapeutic and business aspects of halotherapy was invaluable. Our salt room is now booked solid for weeks in advance!"
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" alt="Jennifer Chang" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <p className="font-semibold">Jennifer Chang</p>
                  <p className="text-sm text-gray-600">Harmony Wellness Spa, California</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
              </div>
              <p className="italic mb-6">
                "As a respiratory therapist, I wanted to add halotherapy to my practice but didn't know where to start. Dr. Abdul provided comprehensive guidance from equipment selection to marketing strategies. Our salt therapy offering has transformed our business."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" alt="Maria Rodriguez" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <p className="font-semibold">Maria Rodriguez, RT</p>
                  <p className="text-sm text-gray-600">Breathe Easy Clinic, Florida</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card bg-white p-8 rounded-lg shadow-md">
              <div className="text-yellow-400 flex mb-4">
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400" />
              </div>
              <p className="italic mb-6">
                "The ROI on our salt room has been exceptional. We converted an underutilized space into what is now our most profitable service. Dr. Abdul's team handled everything from design to installation, and their ongoing support has been outstanding."
              </p>
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="David Patel" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3">
                  <p className="font-semibold">David Patel</p>
                  <p className="text-sm text-gray-600">Rejuvenate Wellness Center, New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Frequently Asked Questions</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Common questions about implementing halotherapy in your business
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How much space do I need for a salt room?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    A standard salt room typically requires between 100-200 square feet (9-18 square meters). However, we've designed effective salt therapy spaces in areas as small as 60 square feet. For salt caves or larger group rooms, 300-500 square feet provides optimal flexibility. We can work with your existing space constraints to create a solution that maximizes both therapeutic benefits and return on investment.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is the typical return on investment for a salt room?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Most of our clients see a complete return on their investment within 6-12 months. A standard salt room that can accommodate 4-6 people simultaneously, charging $30-50 per session, and operating at 60% capacity can generate $50,000-$100,000+ in annual revenue with relatively low ongoing operational costs. The initial investment typically ranges from $15,000 to $40,000 depending on the size and complexity of the installation.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does it take to build a salt room?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    The timeline from initial consultation to completion typically ranges from 4-8 weeks, depending on the complexity of the design and any required modifications to your space. The actual construction and installation usually takes 1-2 weeks. We work closely with you to create a timeline that minimizes disruption to your existing business operations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What ongoing maintenance is required?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Salt rooms require minimal maintenance compared to many other spa modalities. The halogenerator needs regular cleaning (approximately 15 minutes weekly) and periodic salt refills. Salt walls and decorative elements generally need refreshing every 3-5 years, depending on humidity levels and usage. We provide comprehensive training and maintenance schedules, and our support team is always available for questions or troubleshooting.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Is special staffing required to run a salt room?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    No specialized certification is required to operate a salt room. Your existing staff can easily be trained to manage the halogenerator, explain the benefits to clients, and oversee sessions. We provide comprehensive training as part of our service. Many facilities operate their salt rooms with minimal staffing, as clients simply relax during sessions with little intervention needed.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-neutral-dark">Ready to Elevate Your Wellness Offerings?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a free consultation and discover how adding halotherapy can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="btn-primary">
              <Link href="/contact?subject=halotherapy">
                Schedule a Consultation
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
              <Link href="/products?category=halotherapy">
                Browse Halotherapy Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
