import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Factory, Truck, Package2, BadgeCheck, Check, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  businessType: z.string({
    required_error: "Please select your business type.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one product of interest.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      interests: [],
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/wholesale", data);
      
      toast({
        title: "Inquiry submitted successfully!",
        description: "Thank you for your wholesale inquiry. Our team will contact you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    { id: "culinary", label: "Culinary Salt" },
    { id: "blocks", label: "Salt Blocks/Slabs" },
    { id: "lamps", label: "Salt Lamps" },
    { id: "bath", label: "Bath & Spa Products" },
    { id: "therapy", label: "Halotherapy Products" },
    { id: "custom", label: "Custom/Private Label" },
  ];

  return (
    <>
      <Helmet>
        <title>Wholesale Solutions | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Premium Pink Himalayan Salt wholesale solutions for businesses. Direct sourcing from Pakistan, competitive pricing, flexible packaging options, and reliable delivery."
        />
        <meta name="keywords" content="wholesale Himalayan salt, bulk salt supplier, pink salt distributor, business salt supply, private label salt" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://pixabay.com/get/g2b4d9c1b9fec9d2d8e8af63df5cc48b1ae8634cca66af3a44e0ce3c4a83e5c2b3a1d5c00b602ff7f0dcb9301c981577e75df33d1d2e8a4fb6a3d25b4f8de6b85_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">Wholesale Solutions</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Premium Pink Himalayan Salt direct from source to your business with competitive pricing and flexible options
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
                <BreadcrumbPage>Wholesale</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Wholesale Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Premium Salt, Wholesale Prices</h2>
              <p className="mb-6 text-lg">
                We provide premium Pink Himalayan Salt directly from source to businesses worldwide. Our wholesale program offers competitive pricing, flexible packaging options, and reliable delivery to meet your specific business needs.
              </p>
              <p className="mb-6 text-lg">
                With direct sourcing from the Khewra Salt Mine in Pakistan and a distribution warehouse in the USA, we eliminate middlemen to offer you the highest quality salt at industry-leading prices.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Perfect For:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <span>Health Food Stores & Retail Chains</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <span>Restaurants & Culinary Businesses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <span>Spas & Wellness Centers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <span>Halotherapy & Salt Therapy Rooms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <span>Private Label & White Label Services</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <img 
                src="https://pixabay.com/get/g02251f1e433c5f962edd3e68023dadd6374a04e076d93063a818cddd1be2338eae6a215c9502efa0c5d1713bdc84957508d8c5183ef43ebe1e85e7f93ba76b37_1280.jpg" 
                alt="Pink Himalayan Salt Wholesale" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Advantages Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Our Wholesale Advantages</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Why businesses choose Dr. Abdul PHS as their premium salt supplier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Factory className="text-secondary mr-3 h-10 w-10" />
                <h4 className="font-heading font-semibold text-lg">Direct Sourcing</h4>
              </div>
              <p>Straight from Pakistan mines to your business, eliminating middlemen and unnecessary markups. Our direct relationships with salt miners ensure consistent quality and competitive pricing.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Truck className="text-secondary mr-3 h-10 w-10" />
                <h4 className="font-heading font-semibold text-lg">US Warehouse</h4>
              </div>
              <p>Fast shipping for US-based businesses from our Salt Lake City distribution center. Bulk orders are delivered quickly and reliably, reducing your lead times and inventory carrying costs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Package2 className="text-secondary mr-3 h-10 w-10" />
                <h4 className="font-heading font-semibold text-lg">Custom Packaging</h4>
              </div>
              <p>Tailored solutions for your brand needs, from private labeling to custom sizes and packaging materials. Our flexible manufacturing processes can accommodate your unique requirements.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <BadgeCheck className="text-secondary mr-3 h-10 w-10" />
                <h4 className="font-heading font-semibold text-lg">Quality Assurance</h4>
              </div>
              <p>All products tested and certified for purity and safety. Our rigorous quality control processes ensure that every shipment meets our exacting standards for color, mineral content, and particle size.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Wholesale Products</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Explore our range of Pink Himalayan Salt products available for wholesale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img 
                src="https://pixabay.com/get/g2b4d9c1b9fec9d2d8e8af63df5cc48b1ae8634cca66af3a44e0ce3c4a83e5c2b3a1d5c00b602ff7f0dcb9301c981577e75df33d1d2e8a4fb6a3d25b4f8de6b85_1280.jpg" 
                alt="Bulk Culinary Salt" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-3">Culinary Salt Products</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Fine Ground Salt (Various Grind Sizes)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Coarse Salt Crystals</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Salt Grinders & Refills</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Seasoned & Flavored Salt Blends</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">Available in bulk packaging from 5lb bags to 2000lb super sacks.</p>
                <Link href="#wholesale-inquiry" className="text-secondary font-accent text-sm font-semibold hover:underline inline-flex items-center">
                  Request Wholesale Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img 
                src="https://pixabay.com/get/g81f9c288126cb3736b7ea675ddf9d814be5f0cb435d0ceece921209668222083ce55a1b6417a591a8d127c38ee9f7bb79b3e222d96a614f9f49bf007c621b672_1280.jpg" 
                alt="Salt Lamps & Decor" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-3">Salt Lamps & Home Décor</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Natural Salt Lamps (Various Sizes)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Shaped Salt Lamps (Pyramids, Spheres, etc.)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>USB & Electric Salt Lamps</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Decorative Salt Bowls & Candle Holders</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">Bulk orders available with custom packaging options.</p>
                <Link href="#wholesale-inquiry" className="text-secondary font-accent text-sm font-semibold hover:underline inline-flex items-center">
                  Request Wholesale Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md bg-white">
              <img 
                src="https://pixabay.com/get/g5342cea08a53b04b6c2881f60fd6e51c7844b63abb79c5a2946b20c6724d7fb63e6a6f674a6cb4cc7f1f5d54681f95cac52e790b62f9121fc6ec6f3feae1128c_1280.jpg" 
                alt="Halotherapy Products" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-3">Therapeutic & Halotherapy</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Pharmaceutical-Grade Halotherapy Salt</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Bath & Spa Salts (Plain & Scented)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Salt Tiles & Bricks for Salt Rooms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-secondary mr-2 h-4 w-4" />
                    <span>Salt Inhalers & Therapy Equipment</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">Specialized products for wellness centers and spas with volume discounts.</p>
                <Link href="#wholesale-inquiry" className="text-secondary font-accent text-sm font-semibold hover:underline inline-flex items-center">
                  Request Wholesale Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Label Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc" 
                alt="Private Label Salt Products" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Private Label Solutions</h2>
              <p className="mb-6 text-lg">
                Launch your own branded line of Pink Himalayan Salt products with our comprehensive private label program. We handle everything from product formulation to packaging design, allowing you to focus on selling.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Custom Packaging Options</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Choose from a variety of packaging options including glass jars, kraft paper bags, recyclable pouches, wooden boxes, and more. We can customize the size, material, and design to match your brand identity.
                    </p>
                    <p>
                      Our design team can assist with label design or work with your existing brand guidelines to create cohesive packaging that stands out on the shelf.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Minimum Order Quantities</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Our private label program has surprisingly accessible minimum order quantities (MOQs) to accommodate businesses of all sizes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Culinary salt products: Starting at 100 units</li>
                      <li>Bath and spa products: Starting at 200 units</li>
                      <li>Salt lamps and décor: Starting at 50 units</li>
                      <li>Custom formulations: Starting at 300 units</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Custom Formulations</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Beyond standard products, we can create custom formulations exclusively for your brand:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      <li>Flavored and seasoned salt blends</li>
                      <li>Scented bath salts with essential oils</li>
                      <li>Specialized therapeutic blends</li>
                      <li>Unique salt grain sizes or textures</li>
                    </ul>
                    <p>
                      Our product development team works closely with you to create formulations that meet your specific requirements and market positioning.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Production Timeline</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Typical private label production timelines range from 2-6 weeks depending on the complexity of the product and packaging. Standard products with simple customizations can be ready in as little as 2 weeks, while complex custom formulations with specialized packaging may take 4-6 weeks. Rush orders can be accommodated for an additional fee, subject to production capacity.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-6">
                <Button asChild className="btn-primary">
                  <Link href="#wholesale-inquiry">
                    Discuss Private Label Options
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="wholesale-inquiry" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Get Wholesale Pricing</h2>
              <p className="mb-6 text-lg">
                Fill out the form below to receive our wholesale catalog and pricing information. Our dedicated wholesale team will contact you within 24 hours to discuss your specific requirements.
              </p>
              
              <div className="bg-neutral-beige p-6 rounded-lg mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Partner With Us</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <span className="font-semibold">Competitive Pricing:</span>
                      <p className="text-sm">Direct sourcing means we offer prices that keep your margins healthy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <span className="font-semibold">Consistent Quality:</span>
                      <p className="text-sm">Rigorous quality control ensures your customers get the best product every time</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <span className="font-semibold">Flexible Terms:</span>
                      <p className="text-sm">Volume discounts, payment terms, and shipping options tailored to your needs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-secondary mt-1 mr-3 h-5 w-5" />
                    <div>
                      <span className="font-semibold">Dedicated Support:</span>
                      <p className="text-sm">Assigned account manager for seamless ordering and customer service</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-primary p-6 rounded-lg">
                <h3 className="text-xl font-heading font-semibold mb-4">Testimonial</h3>
                <p className="italic mb-4">
                  "We've been sourcing our salt products from Dr. Abdul PHS for over two years now. The quality is consistently excellent, and their wholesale prices allow us to maintain healthy margins. Their customer service is exceptional, and they're always willing to work with us on custom packaging solutions."
                </p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="Michael Roberts" className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-3">
                    <p className="font-semibold">Michael Roberts</p>
                    <p className="text-sm text-gray-600">Health Food Store Owner</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-heading font-semibold mb-6">Wholesale Inquiry</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="wellness">Wellness/Spa Center</SelectItem>
                            <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                            <SelectItem value="halotherapy">Halotherapy Center</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Products of Interest*</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {interests.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your specific needs, estimated quantities, or any questions you have"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Frequently Asked Questions</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              Common questions about our wholesale program
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are the minimum order quantities?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our minimum order quantities vary by product type:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Culinary Salt: 50 lbs (22.7 kg)</li>
                    <li>Salt Lamps: 24 units</li>
                    <li>Bath & Spa Products: 48 units</li>
                    <li>Halotherapy Salt: 100 lbs (45.4 kg)</li>
                    <li>Custom/Private Label: Varies by product (typically 100-500 units)</li>
                  </ul>
                  <p className="mt-2">
                    We're flexible with these minimums for new partners and can discuss your specific needs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What are your shipping and delivery terms?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We ship from our warehouse in Salt Lake City, Utah for US orders, and directly from Pakistan for international bulk orders. Standard shipping times are:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>US domestic: 3-5 business days</li>
                    <li>Canada: 5-10 business days</li>
                    <li>International: 2-4 weeks</li>
                  </ul>
                  <p className="mt-2">
                    Expedited shipping options are available. We offer FOB, CIF, and DDP terms depending on your preference. Volume discounts on shipping are available for larger orders.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What payment terms do you offer?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    For new wholesale customers, we typically require a 50% deposit to initiate the order, with the remaining balance due before shipping. Established customers may qualify for Net 30 terms after a successful payment history.
                  </p>
                  <p className="mt-2">
                    We accept payments via wire transfer, ACH, check, and major credit cards. International orders typically require wire transfer. A 3% processing fee applies to credit card payments for wholesale orders.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Do you provide samples before ordering?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Yes, we offer a wholesale sample program to qualified businesses. Sample kits include small quantities of our most popular products and are available at a nominal cost, which is credited back to your account on your first wholesale order.
                  </p>
                  <p className="mt-2">
                    To request a sample kit, please complete our wholesale inquiry form and specify which products you're interested in sampling.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What certifications do your products have?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our Pink Himalayan Salt products are certified for quality and purity. We maintain the following certifications:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>ISO 22000 (Food Safety Management)</li>
                    <li>HACCP Certified</li>
                    <li>Non-GMO Verified</li>
                    <li>Kosher Certified</li>
                    <li>Halal Certified</li>
                  </ul>
                  <p className="mt-2">
                    Testing documentation is available upon request for wholesale partners.
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-neutral-dark">Ready to Grow Your Business?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Partner with Dr. Abdul PHS for premium Pink Himalayan Salt products at competitive wholesale prices.
          </p>
          <Button asChild className="btn-primary">
            <Link href="#wholesale-inquiry">
              Request Wholesale Pricing
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
