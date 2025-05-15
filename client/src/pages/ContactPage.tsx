import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubscriptionSection from "@/components/subscription/SubscriptionSection";
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
import { MapPin, Phone, Mail, MessageSquare, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We will respond within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Message sending failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Get in touch with Dr. Abdul PHS for questions about our Pink Himalayan Salt products, wholesale inquiries, or halotherapy consultation services."
        />
        <meta name="keywords" content="contact salt supplier, pink Himalayan salt inquiries, halotherapy consultation, wholesale salt" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://pixabay.com/get/g4a5066d4534b570440b9655df3f69a7fb7789fbb06b93889405f531b2f806c7a412680cc73519bc3942f141745c80db299d2630b78db3e4e2332695ebb6d8ca3_1280.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-6">
            Have questions or need assistance? We're here to help you with all your Pink Himalayan Salt needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#contact-form" 
              className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md transition duration-300"
            >
              Contact Us
            </a>
            <a 
              href="#salt-subscription" 
              className="bg-white hover:bg-gray-100 text-primary py-3 px-6 rounded-md transition duration-300"
            >
              Salt Subscription Service
            </a>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-beige p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Our Locations</h3>
              <p className="mb-1">USA: 187 Country Club Drive, Apartment number 8, South San Francisco, California 94080 USA</p>
              <p>Pakistan: Khewra Salt Mine Road, District Jhelum, Punjab</p>
            </div>

            <div className="bg-neutral-beige p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Phone className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Phone Support</h3>
              <p className="mb-1">USA: +1 (925) 448-7591</p>
              <p className="mb-1">Pakistan: +92 300 1234567</p>
              <p className="text-sm text-gray-500 mt-2">Monday - Friday: 9am - 5pm (EST)</p>
            </div>

            <div className="bg-neutral-beige p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Mail className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Email</h3>
              <p className="mb-1">General Inquiries: info@drabdulphs.com</p>
              <p className="mb-1">Wholesale: wholesale@drabdulphs.com</p>
              <p>Support: support@drabdulphs.com</p>
            </div>

            <div className="bg-neutral-beige p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">WhatsApp</h3>
              <p>For quick responses: +1 (555) 987-6543</p>
              <a 
                href="https://wa.me/15559876543" 
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-3 transition duration-300"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.38 0-7.94 3.56-7.93 7.93a7.9 7.9 0 0 0 1.07 3.98L4 20l4.2-1.1a7.93 7.93 0 0 0 3.79.96h.04c4.38 0 7.94-3.55 7.94-7.93 0-2.12-.82-4.1-2.32-5.6l.04-.01zM12.05 18.33h-.03a6.59 6.59 0 0 1-3.37-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.59 6.59 0 0 1-1.01-3.49c0-3.64 2.96-6.6 6.61-6.6 1.77 0 3.43.69 4.68 1.94a6.57 6.57 0 0 1 1.94 4.67c0 3.64-2.97 6.6-6.6 6.6l.01-.03zm3.62-4.94c-.2-.1-1.18-.58-1.36-.64-.18-.07-.32-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.52-.99-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.47-.16-.39-.33-.33-.45-.34-.12-.01-.25-.01-.38-.01-.13 0-.34.05-.51.25-.17.2-.66.64-.66 1.57 0 .93.68 1.82.77 1.95.1.13 1.33 2.03 3.22 2.85.45.19.8.31 1.08.4.45.14.86.12 1.19.07.36-.05 1.18-.48 1.35-.95.17-.47.17-.87.12-.95-.05-.1-.19-.15-.4-.25z"/>
                </svg>
                Chat Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-neutral-beige">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Get in Touch</h2>
              <p className="mb-8 text-lg">
                Whether you have questions about our products, need assistance with an order, or want to discuss wholesale opportunities, our team is ready to help. Fill out the form below, and we'll get back to you as soon as possible.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-heading font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM (EST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM (EST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="product">Product Inquiry</SelectItem>
                            <SelectItem value="wholesale">Wholesale Information</SelectItem>
                            <SelectItem value="halotherapy">Halotherapy Consultation</SelectItem>
                            <SelectItem value="order">Order Status</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?"
                            className="resize-none"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-600">
                            I agree to the <Link href="/privacy"><a className="text-secondary hover:underline">Privacy Policy</a></Link> and consent to being contacted regarding my inquiry.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <SubscriptionSection />

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Visit Our Locations</h2>
            <p className="text-lg max-w-3xl mx-auto mt-4">
              We welcome you to visit our warehouse in Salt Lake City or our mining operations in Pakistan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.209280268949!2d-122.44891788433977!3d37.44987607981885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7b6c3d0e2959%3A0xe10a7619cfc92b85!2s187%20Country%20Club%20Dr%2C%20South%20San%20Francisco%2C%20CA%2094080!5e0!3m2!1sen!2sus!4v1686001234567!5m2!1sen!2sus" 
                width="100%" 
                height="400" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="US Location Map"
                className="border-0"
              ></iframe>
              <div className="bg-neutral-beige p-4">
                <h3 className="font-heading font-semibold mb-2">USA Warehouse & Office</h3>
                <p>187 Country Club Drive, Apartment number 8, South San Francisco, California 94080 USA</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.6022294271365!2d73.04040827619192!3d32.64625349398344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f9ade31fb24b7%3A0x5e26da32aa940a8!2sKhewra%20Salt%20Mine!5e0!3m2!1sen!2sus!4v1688572221409!5m2!1sen!2sus" 
                width="100%" 
                height="400" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pakistan Location Map"
                className="border-0"
              ></iframe>
              <div className="bg-neutral-beige p-4">
                <h3 className="font-heading font-semibold mb-2">Pakistan Mining Operations</h3>
                <p>Khewra Salt Mine Road, District Jhelum, Punjab, Pakistan</p>
              </div>
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
              Find answers to our most commonly asked questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-semibold mb-3">How quickly will I receive my order?</h3>
              <p>
                US orders are typically processed within 1-2 business days. Standard shipping takes 3-5 business days, while expedited shipping takes 1-3 business days. International shipping times vary by location.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-semibold mb-3">Do you offer wholesale pricing?</h3>
              <p>
                Yes, we offer competitive wholesale pricing for businesses. Please fill out our wholesale inquiry form or contact our wholesale department directly at wholesale@drabdulphs.com.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-semibold mb-3">What is your return policy?</h3>
              <p>
                We accept returns within 30 days of purchase for unopened products. Please contact our customer service team to initiate a return. Customized and bulk orders may have different return policies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-semibold mb-3">Can Dr. Abdul consult for my salt therapy business?</h3>
              <p>
                Yes, Dr. Abdul offers consultation services for salt therapy centers. He can provide guidance on room design, equipment selection, and protocol development. Contact us for consultation rates and availability.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="mb-4">Still have questions?</p>
            <Button asChild className="btn-primary">
              <a href="mailto:info@drabdulphs.com">
                Email Our Support Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
