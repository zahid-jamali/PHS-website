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
import { MapPin, Phone, Mail, MessageSquare, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export default function ContactSection() {
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
    <section id="contact" className="py-16 bg-neutral-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title text-3xl md:text-4xl font-heading font-bold mb-6">Contact Us</h2>
            <p className="mb-8 text-lg">
              Have questions about our products or services? Our team is here to help. Reach out to us through any of the following channels, and we'll get back to you promptly.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-xl bg-white p-3 rounded-full shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Our Locations</h4>
                  <p className="text-sm mb-1">USA: 187 Country Club Drive, Apartment number 8, South San Francisco, California 94080 USA</p>
                  <p className="text-sm">Pakistan: Khewra Salt Mine Road, District Jhelum, Punjab</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-xl bg-white p-3 rounded-full shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Phone Support</h4>
                  <p className="text-sm mb-1">USA: +1 (925) 448-7591</p>
                  <p className="text-sm">Pakistan: +92 300 1234567</p>
                  <p className="text-sm text-gray-500 mt-1">Monday - Friday: 9am - 5pm (EST)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-xl bg-white p-3 rounded-full shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Email</h4>
                  <p className="text-sm mb-1">General Inquiries: info@drabdulphs.com</p>
                  <p className="text-sm mb-1">Wholesale: wholesale@drabdulphs.com</p>
                  <p className="text-sm">Support: support@drabdulphs.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-secondary text-xl bg-white p-3 rounded-full shadow-sm">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">WhatsApp</h4>
                  <p className="text-sm">For quick responses: +1 (925) 448-7591</p>
                  <a href="https://wa.me/19254487591" className="text-secondary text-sm font-medium hover:underline inline-flex items-center mt-1">
                    Chat with us <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-heading font-semibold">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white text-secondary hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition duration-300">
                  <Youtube className="h-5 w-5" />
                </a>
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
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
