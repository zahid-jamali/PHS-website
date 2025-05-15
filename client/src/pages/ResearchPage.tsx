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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  BookOpen, 
  FileText, 
  Award, 
  Microscope, 
  Heart, 
  Shield,
  CheckCircle
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState("health-benefits");

  return (
    <>
      <Helmet>
        <title>Research & Articles by Dr. Abdul | Pink Himalayan Salt</title>
        <meta 
          name="description" 
          content="Explore Dr. Abdul's scientific research and articles on the health benefits and properties of Pink Himalayan Salt (PHS). Learn about the 84 essential minerals and therapeutic applications."
        />
        <meta name="keywords" content="pink himalayan salt research, Dr. Abdul salt research, salt health benefits, halotherapy research, PHS minerals" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">Research & Articles</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Dr. Abdul's scientific research on Pink Himalayan Salt and its numerous health benefits
          </p>
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
                <BreadcrumbPage>Research & Articles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Research Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-beige p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-secondary mr-2 h-5 w-5" />
                  <h3 className="font-heading font-bold text-xl">Research Topics</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <a href="#pink-himalayan-salt" className="flex items-center hover:text-secondary transition-colors">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>About Pink Himalayan Salt</span>
                    </a>
                  </li>
                  <li>
                    <a href="#key-features" className="flex items-center hover:text-secondary transition-colors">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Key Features of PHS</span>
                    </a>
                  </li>
                  <li>
                    <a href="#global-demand" className="flex items-center hover:text-secondary transition-colors">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Global Demand</span>
                    </a>
                  </li>
                  <li>
                    <a href="#health-benefits" className="flex items-center hover:text-secondary transition-colors">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Health Benefits</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-neutral-beige p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Award className="text-secondary mr-2 h-5 w-5" />
                  <h3 className="font-heading font-bold text-xl">About Dr. Abdul</h3>
                </div>
                <img 
                  src="/assets/salt-lamps/logo.webp" 
                  alt="Dr. Abdul Rasheed" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p className="text-sm mb-4">
                  Dr. Abdul Rasheed is a leading authority on Pink Himalayan Salt and its therapeutic applications. With over 15 years of research experience, he has published numerous papers on the health benefits of PHS.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Link href="/about">
                    Learn More About Dr. Abdul
                  </Link>
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose lg:prose-lg max-w-none">
                <div id="pink-himalayan-salt">
                  <h2 className="font-heading text-3xl font-bold mb-6">Why People Are Crazy About Pink Himalayan Salt (PHS)</h2>
                  <p>
                    Pink Himalayan salt (PHS) has gained immense popularity in recent years due to its natural purity, organic composition, and numerous health benefits. It is considered one of the purest salts available on the whole planet, free from pollution and additives, and containing over 84 natural essential minerals. PHS is extracted in its natural form, ensuring it remains unprocessed and retains its original mineral content.
                  </p>
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img 
                      src="/assets/salt-lamps/KHEWRA SM 02.jpeg" 
                      alt="Pink Himalayan Salt Crystals" 
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                    <img 
                      src="/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg" 
                      alt="Salt Mining in Pakistan" 
                      className="rounded-lg shadow-md w-full h-64 object-cover"
                    />
                  </div>
                </div>

                <div id="key-features">
                  <h2 className="font-heading text-3xl font-bold mb-6">Key Features of Pink Himalayan Salt</h2>
                  
                  <div className="mb-8 bg-neutral-50 p-6 rounded-lg border-l-4 border-secondary">
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center">
                      <Shield className="text-secondary mr-2 h-5 w-5" />
                      Natural and Pure
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>PHS is free from artificial additives, microplastics, and anti-caking agents.</li>
                      <li>It is mined in its natural rock form and requires only minimal cleaning.</li>
                    </ul>
                  </div>

                  <div className="mb-8 bg-neutral-50 p-6 rounded-lg border-l-4 border-secondary">
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center">
                      <Microscope className="text-secondary mr-2 h-5 w-5" />
                      Rich in Essential Minerals
                    </h3>
                    <p>Contains more than 84 minerals, including sodium, chloride, potassium, calcium, phosphorus, chromium, copper, zinc and iron, magnesium and manganese which plays a vital role in our better health.</p>
                    <p className="mt-2">These minerals provide numerous health benefits by synergistically working together.</p>
                  </div>

                  <div className="mb-8 bg-neutral-50 p-6 rounded-lg border-l-4 border-secondary">
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center">
                      <Star className="text-secondary mr-2 h-5 w-5" />
                      Aesthetic Appeal
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Available in beautiful colors ranging from rosy pink to orange, red and white.</li>
                      <li>Used in decorative items such as salt lamps, gift items, and home décor.</li>
                    </ul>
                  </div>

                  <div className="mb-8 bg-neutral-50 p-6 rounded-lg border-l-4 border-secondary">
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center">
                      <FileText className="text-secondary mr-2 h-5 w-5" />
                      Culinary Uses
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provides a unique and delicious taste, making it a preferred choice for cooking.</li>
                      <li>Can be ground into fine powder or used in small, medium and larger crystals.</li>
                    </ul>
                  </div>

                  <div className="mb-8 bg-neutral-50 p-6 rounded-lg border-l-4 border-secondary">
                    <h3 className="font-heading font-semibold text-xl mb-3 flex items-center">
                      <Heart className="text-secondary mr-2 h-5 w-5" />
                      Therapeutic Applications
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Widely used in halotherapy (Salt Therapy) for respiratory and skin benefits.</li>
                      <li>Used in spa treatments, salt baths, and salt soaps.</li>
                    </ul>
                  </div>
                </div>

                <div id="global-demand">
                  <h2 className="font-heading text-3xl font-bold mb-6">Global Demand for Pink Himalayan Salt</h2>
                  <p>
                    The demand for pink Himalayan salt is rising rapidly worldwide due to its great health benefits.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Top importers in the world are USA, China and Brazil.</li>
                    <li>UK, UAE, KSA, Japan, Austria, Australia, Canada and other countries worldwide.</li>
                    <li>Pakistan leads the world in PHS exports, with over 12,300 shipments last year, primarily to the USA, Brazil and China.</li>
                  </ul>

                  <div className="my-8">
                    <img 
                      src="/assets/salt-lamps/PHS ARABIAN HORSE LAMP.webp" 
                      alt="Global shipping of Pink Himalayan Salt" 
                      className="rounded-lg shadow-md w-full object-cover"
                    />
                  </div>
                </div>

                <div id="health-benefits">
                  <h2 className="font-heading text-3xl font-bold mb-6">Health Benefits of Pink Himalayan Salt</h2>
                  
                  <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-8">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="skin-health">Skin Health</TabsTrigger>
                      <TabsTrigger value="respiratory">Respiratory</TabsTrigger>
                      <TabsTrigger value="digestive">Digestive</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="skin-health" className="p-6 bg-white border border-neutral-200 rounded-b-lg mt-1">
                      <h3 className="font-heading font-semibold text-xl mb-4">Skin Health Benefits</h3>
                      <p className="mb-4">
                        Used in beauty products due to its powerful anti-inflammatory, anti-bacterial and powerful detoxifying agent.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Helps in treating acne, eczema, rashes and psoriasis, reduce age processing, look younger than your actual age.</li>
                        <li>Removes toxins and dead cells from the skin and making it soft, smooth and healthy. Your hair get thicker and grow.</li>
                        <li>PHS also work when an insect bite or bee sting bites, PHS relieves pain, rash and swelling.</li>
                      </ul>
                      <img 
                        src="/assets/salt-lamps/CARVED SALT LAMPS 2.webp" 
                        alt="Salt therapy for skin health" 
                        className="mt-6 rounded-lg shadow-md w-full h-48 object-cover"
                      />
                    </TabsContent>
                    
                    <TabsContent value="respiratory" className="p-6 bg-white border border-neutral-200 rounded-b-lg mt-1">
                      <h3 className="font-heading font-semibold text-xl mb-4">Respiratory Health Benefits</h3>
                      <p className="mb-4">
                        Beneficial in relieving respiratory issues through halotherapy.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Helps clear nasal passages and improve breathing.</li>
                        <li>Strong detoxification, purifying the indoor air, seasonal allergies, pollen and dust from your room.</li>
                        <li>Loosens the mucus and helps in phlegm, sinusitis, pharyngitis, tonsillitis, bronchitis, alveolitis, smoker's cough, snoring, dyspnea, asthma, cold, flu, sore throat, and COPD (Chronic Obstructive Pulmonary Diseases) like cystic fibrosis and emphysema.</li>
                      </ul>
                      <img 
                        src="/assets/salt-lamps/102.webp" 
                        alt="Salt therapy for respiratory health" 
                        className="mt-6 rounded-lg shadow-md w-full h-48 object-cover"
                      />
                    </TabsContent>
                    
                    <TabsContent value="digestive" className="p-6 bg-white border border-neutral-200 rounded-b-lg mt-1">
                      <h3 className="font-heading font-semibold text-xl mb-4">Digestive Health Benefits</h3>
                      <p className="mb-4">
                        Enhances digestion and regulates hydration levels in the body.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Acts as natural detoxifier when consumed in a warm water solution Sole (So-LAY).</li>
                        <li>Increase the amount of HCL acid in your intestine, regulates digestive hormones, increase hunger.</li>
                        <li>Enhance dental health, helps in dental and gum infections. Reduce cortisol levels.</li>
                        <li>Stimulates the bowels, relieves the stomach cramps, gas, bloating, constipation, and acid reflux symptoms, excretes pathogens and toxins from your gut.</li>
                      </ul>
                      <img 
                        src="/assets/salt-lamps/105.webp" 
                        alt="Pink Himalayan Salt for digestive health" 
                        className="mt-6 rounded-lg shadow-md w-full h-48 object-cover"
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Experience the Benefits of Pink Himalayan Salt</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Browse our collection of premium Pink Himalayan Salt products and discover their transformative health benefits for yourself.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>
              <Link href="/products">
                Shop Our Products
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/contact">
                Contact Dr. Abdul
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}