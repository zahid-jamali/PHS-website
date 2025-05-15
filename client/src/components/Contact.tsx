import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(1, { message: 'Please select a subject' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            
            <p className="text-lg mb-8">Have questions about our products, wholesale options, or halotherapy consultation? We're here to help. Reach out using the contact form or through our direct support channels.</p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-1">Our Locations</h3>
                  <p className="text-neutral-brown">USA Warehouse & Office: 187 Country Club Drive, Apartment number 8, South San Francisco, California 94080 USA</p>
                  <p className="text-neutral-brown">Pakistan Office: 45 Salt Mine Road, Khewra, Punjab, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Phone className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-1">Phone Support</h3>
                  <p className="text-neutral-brown">USA: +1 (925) 448-7591</p>
                  <p className="text-neutral-brown">International: +92 300 1234567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Mail className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-1">Email Us</h3>
                  <p className="text-neutral-brown">General Inquiries: info@drabdulphs.com</p>
                  <p className="text-neutral-brown">Wholesale: wholesale@drabdulphs.com</p>
                  <p className="text-neutral-brown">Dr. Abdul (Consultation): dr.abdul@drabdulphs.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://wa.me/923001234567" className="w-10 h-10 bg-accent hover:bg-accent-dark text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <div className="bg-neutral-offwhite p-8 rounded-xl shadow-sm">
              <h3 className="font-heading text-2xl font-semibold mb-6">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
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
                        <FormLabel>Subject</FormLabel>
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-accent"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
