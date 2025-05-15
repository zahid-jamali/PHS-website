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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Factory, Truck, Package2, BadgeCheck } from "lucide-react";

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

export default function WholesaleSection() {
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
    <section id="wholesale" className="py-16 bg-neutral-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Wholesale Solutions</h2>
            <p className="mb-6 text-lg">
              We provide premium Pink Himalayan Salt directly from source to businesses worldwide. Our wholesale program offers competitive pricing, flexible packaging options, and reliable delivery.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-heading font-semibold mb-4">Perfect For:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Health Food Stores & Retail Chains</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Restaurants & Culinary Businesses</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Spas & Wellness Centers</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Halotherapy & Salt Therapy Rooms</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary mt-1 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Private Label & White Label Services</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-heading font-semibold mb-4">Our Wholesale Advantages:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Factory className="text-secondary mr-3 h-5 w-5" />
                    <h4 className="font-heading font-semibold">Direct Sourcing</h4>
                  </div>
                  <p className="text-sm">Straight from Pakistan mines to your business</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Truck className="text-secondary mr-3 h-5 w-5" />
                    <h4 className="font-heading font-semibold">US Warehouse</h4>
                  </div>
                  <p className="text-sm">Fast shipping for US-based businesses</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Package2 className="text-secondary mr-3 h-5 w-5" />
                    <h4 className="font-heading font-semibold">Custom Packaging</h4>
                  </div>
                  <p className="text-sm">Tailored solutions for your brand needs</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <BadgeCheck className="text-secondary mr-3 h-5 w-5" />
                    <h4 className="font-heading font-semibold">Quality Assurance</h4>
                  </div>
                  <p className="text-sm">All products tested and certified</p>
                </div>
              </div>
            </div>
            
            <Button asChild className="btn-primary">
              <Link href="#wholesale-inquiry">
                Get Wholesale Pricing
              </Link>
            </Button>
          </div>
          
          <div id="wholesale-inquiry" className="bg-white p-8 rounded-lg shadow-md">
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
                          placeholder="Tell us about your specific needs or any questions you have"
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
  );
}
