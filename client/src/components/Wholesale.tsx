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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormValues = z.infer<typeof formSchema>;

export default function Wholesale() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/wholesale-inquiry', data);
      
      toast({
        title: "Inquiry submitted successfully",
        description: "We'll get back to you shortly regarding your wholesale inquiry.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to submit inquiry",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      console.error('Wholesale inquiry submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wholesale" className="py-24 bg-neutral-offwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Wholesale & Bulk Solutions</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            
            <p className="text-lg mb-6">
              Whether you're a retailer, distributor, spa owner, or salt therapy center, we offer competitive wholesale pricing directly from the source. Our warehouse in the USA ensures quick delivery nationwide.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <span>Bulk quantities from 25lbs to container loads</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <span>Custom packaging solutions with your branding</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <span>Special preparations for halotherapy and spa applications</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <span>Consistent supply chain and quality guarantees</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 mr-3">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <span>Expert consultation for salt therapy business setup</span>
              </li>
            </ul>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-heading text-xl font-semibold mb-4">Request Wholesale Pricing</h3>
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
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company" {...field} />
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
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inquiry Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your business and product needs"
                            className="min-h-[100px]"
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
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            {/* Professional storage warehouse with pallets of packaged salt products */}
            <img 
              src="/assets/salt-lamps/KHEWRA SALT MINE IMAGES.jpg" 
              alt="Our USA warehouse facility" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Close-up of workers packaging salt products in a clean facility */}
              <img 
                src="/assets/salt-lamps/KHEWRA SM 02.jpeg" 
                alt="Pink salt packaging process" 
                className="rounded-xl shadow-md w-full h-24 object-cover" 
              />
              
              {/* Pink salt in various grain sizes in professional packaging */}
              <img 
                src="/assets/salt-lamps/CARVED SALT LAMPS 2.webp" 
                alt="Various salt grain sizes" 
                className="rounded-xl shadow-md w-full h-24 object-cover" 
              />
              
              {/* Shipping containers being loaded with salt products */}
              <img 
                src="/assets/salt-lamps/102.webp" 
                alt="Global shipping logistics" 
                className="rounded-xl shadow-md w-full h-24 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
