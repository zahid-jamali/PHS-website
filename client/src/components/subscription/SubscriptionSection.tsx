import { useState } from 'react';
import { useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

// Define the frequency options with their discount values
const frequencyOptions = [
  { value: 'weekly', label: 'Weekly (Every 7 days)', discount: 12 },
  { value: 'biweekly', label: 'Bi-weekly (Every 14 days)', discount: 10 },
  { value: 'monthly', label: 'Monthly (Every 30 days)', discount: 8 },
  { value: 'bimonthly', label: 'Bi-monthly (Every 60 days)', discount: 5 },
  { value: 'quarterly', label: 'Quarterly (Every 90 days)', discount: 3 },
];

// Define the form schema
const subscriptionInterestSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  frequency: z.enum(['weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly'], {
    message: "Please select a delivery frequency."
  }),
  saltType: z.enum(['fine', 'coarse', 'chunks', 'mixed'], {
    message: "Please select a preferred salt type."
  }),
  quantity: z.string().min(1, { message: "Please specify quantity." }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof subscriptionInterestSchema>;

// Salt product types with details
const saltProducts = [
  {
    type: 'fine',
    name: 'Fine Ground Pink Salt',
    description: 'Perfect for cooking, baking, and table use. Contains 84+ minerals and elements.',
    benefits: [
      'Enhanced taste in any dish',
      'Better mineral absorption',
      'Superior culinary performance',
      'Ideal for salt grinders',
    ],
    image: '/path/to/fine-salt.jpg'
  },
  {
    type: 'coarse',
    name: 'Coarse Ground Pink Salt',
    description: 'Ideal for salt mills, finishing dishes, and salt rubs. Rich in essential minerals.',
    benefits: [
      'Perfect for salt mills and grinders',
      'Excellent for meat rubs and marinades',
      'Rich, complex flavor profile',
      'Slower dissolving for controlled seasoning',
    ],
    image: '/path/to/coarse-salt.jpg'
  },
  {
    type: 'chunks',
    name: 'Pink Salt Chunks',
    description: 'Large salt pieces perfect for salt baths, DIY salt lamps, and cooking slabs.',
    benefits: [
      'Create DIY salt therapy solutions',
      'Use for natural spa treatments',
      'Make your own salt cooking slabs',
      'Natural air purification properties',
    ],
    image: '/path/to/chunk-salt.jpg'
  },
  {
    type: 'mixed',
    name: 'Mixed Salt Varieties',
    description: 'A combination of fine, coarse, and chunk salt to suit all your salt needs.',
    benefits: [
      'Versatile selection for all uses',
      'Experience different textures and applications',
      'Perfect for households with varied needs',
      'Savings compared to buying separately',
    ],
    image: '/path/to/mixed-salt.jpg'
  }
];

export default function SubscriptionSection() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [selectedSaltType, setSelectedSaltType] = useState('fine');

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(subscriptionInterestSchema),
    defaultValues: {
      name: "",
      email: "",
      frequency: "monthly",
      saltType: "fine",
      quantity: "1",
      notes: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (isAuthenticated) {
      // If authenticated, navigate to the full subscription page
      navigate('/subscription');
    } else {
      // If not authenticated, show a success toast with instruction to register or login
      toast({
        title: "Subscription Interest Received!",
        description: "Thank you for your interest in our salt subscription service. For a personalized subscription, please create an account or log in.",
      });

      // Reset form
      form.reset();
    }
  };

  // Get the selected salt product details
  const selectedProduct = saltProducts.find(p => p.type === selectedSaltType) || saltProducts[0];

  return (
    <section className="py-16 bg-white" id="salt-subscription">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary mb-4 py-1 px-3 text-sm">SAVE UP TO 12%</Badge>
          <h2 className="section-title text-3xl md:text-4xl font-heading font-bold inline-block mx-auto">Pink Himalayan Salt Subscription</h2>
          <p className="text-lg max-w-3xl mx-auto mt-4">
            Experience the health benefits of our premium salt delivered to your door. 
            Mined from the ancient Khewra Salt Mine, our salt is 100% natural and rich in 84+ minerals and trace elements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            {/* Health Benefits Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Health & Wellness Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Rich in Essential Minerals</h4>
                      <p className="text-gray-600">Contains 84+ minerals and trace elements including potassium, magnesium, and calcium that support electrolyte balance and cellular function</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Promotes Balanced pH Levels</h4>
                      <p className="text-gray-600">Helps to maintain a healthy acid-alkaline balance in the body, supporting optimal metabolic function</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Supports Respiratory Health</h4>
                      <p className="text-gray-600">When used in salt inhalers or lamps, can help purify air and support respiratory wellness</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Reduced Sodium Content</h4>
                      <p className="text-gray-600">Contains less sodium per serving than regular table salt, making it a better choice for those monitoring sodium intake</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Benefits */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Subscription Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Premium Quality Guaranteed</h4>
                      <p className="text-gray-600">Each delivery contains our highest-grade Himalayan salt, direct from the Khewra Salt Mine</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Substantial Savings</h4>
                      <p className="text-gray-600">Save up to 12% compared to one-time purchases with our subscription service</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Flexible Delivery Schedule</h4>
                      <p className="text-gray-600">Choose the frequency that works for you with the option to adjust anytime</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Priority Customer Service</h4>
                      <p className="text-gray-600">Subscribers receive dedicated support and first access to new products</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">No Commitment Required</h4>
                      <p className="text-gray-600">Pause, modify or cancel your subscription at any time with no penalties</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Selected Salt Product Info */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Selected Salt Type: {selectedProduct.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{selectedProduct.description}</p>
                <h4 className="font-semibold mb-2">Key Benefits:</h4>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {selectedProduct.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Frequency and Discount Table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Subscription Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended For</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Weekly (Every 7 days)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">12% off</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Professional kitchens, large families</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Bi-weekly (Every 14 days)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">10% off</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Regular home cooks, medium households</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Monthly (Every 30 days)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">8% off</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Small households, everyday use</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Bi-monthly (Every 60 days)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">5% off</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Occasional cooks, smaller households</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Quarterly (Every 90 days)</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-medium">3% off</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Minimal users, specialty purposes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card className="shadow-md border-primary/10">
              <CardHeader className="bg-neutral-beige">
                <CardTitle>Express Interest in Salt Subscription</CardTitle>
                <CardDescription>
                  Fill out this form to get started with your personalized salt subscription from the ancient Khewra Salt Mine
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
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
                              <Input placeholder="your@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="saltType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Salt Type</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedSaltType(value);
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select salt type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fine">Fine Ground Salt (Premium Grade)</SelectItem>
                                <SelectItem value="coarse">Coarse Ground Salt (Culinary Grade)</SelectItem>
                                <SelectItem value="chunks">Salt Chunks (Therapeutic Grade)</SelectItem>
                                <SelectItem value="mixed">Mixed Varieties (Assorted Pack)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Each salt type is 100% natural with no additives or anti-caking agents
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Quantity (lbs)</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select quantity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 lb (Starter)</SelectItem>
                                <SelectItem value="2">2 lbs (Small Household)</SelectItem>
                                <SelectItem value="5">5 lbs (Family Size)</SelectItem>
                                <SelectItem value="10">10 lbs (Bulk Savings)</SelectItem>
                                <SelectItem value="25">25 lbs (Professional)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Larger quantities provide greater savings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Frequency</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedFrequency(value);
                                }}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {frequencyOptions.map((option) => (
                                  <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={option.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex justify-between w-full">
                                      <span>{option.label}</span>
                                      <span className="text-green-600 font-medium">{option.discount}% off</span>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific requirements or health goals you'd like to achieve with our salt?"
                                className="resize-none"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" className="w-full">
                        {isAuthenticated ? "Continue to Full Subscription" : "Express Interest"}
                      </Button>
                      
                      {!isAuthenticated && (
                        <p className="text-center text-sm text-gray-500 mt-4">
                          Already have an account?{" "}
                          <a href="/login" className="text-primary hover:underline">
                            Log in
                          </a>{" "}
                          to set up your complete subscription.
                        </p>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3 bg-neutral-beige/30">
                <p className="text-sm">
                  <span className="font-medium">Research Note:</span> Regular consumption of mineral-rich Himalayan salt may help support electrolyte balance, proper hydration, and cellular function.
                </p>
                <p className="text-sm text-gray-500">
                  Your first delivery will be processed after completing the registration. No payment information is required at this step.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}