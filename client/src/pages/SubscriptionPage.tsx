import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Helmet } from 'react-helmet';
import { useCart } from '@/components/cart/CartProvider';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';

// Components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

// Define the form schema for subscription
const subscriptionFormSchema = z.object({
  productId: z.number().positive({ message: 'Please select a product' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }).max(10, { message: 'Maximum quantity is 10' }),
  frequency: z.enum(['weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly'], {
    message: 'Please select a delivery frequency'
  }),
  addressId: z.number().positive({ message: 'Please select a delivery address' }),
});

// Product type adapted for the subscription page
type SubscriptionProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  sale_price?: number | null;
  image_url: string;
  category: string;
  weight: number | null;
};

// Delivery frequency options with readable labels
const frequencyOptions = [
  { value: 'weekly', label: 'Weekly (Every 7 days)', discount: 12 },
  { value: 'biweekly', label: 'Bi-weekly (Every 14 days)', discount: 10 },
  { value: 'monthly', label: 'Monthly (Every 30 days)', discount: 8 },
  { value: 'bimonthly', label: 'Bi-monthly (Every 60 days)', discount: 5 },
  { value: 'quarterly', label: 'Quarterly (Every 90 days)', discount: 3 },
];

export default function SubscriptionPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');

  const [, navigate] = useLocation();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Login Required",
      description: "Please login to create a subscription",
      variant: "destructive",
    });
    navigate('/login');
    return null;
  }

  // Get eligible products for subscription (culinary products)
  const { data: products = [], isLoading: productsLoading } = useQuery<any[]>({
    queryKey: ['/api/products'],
  });

  // Get user addresses
  const { data: addresses = [], isLoading: addressesLoading } = useQuery<any[]>({
    queryKey: ['/api/account/addresses'],
    enabled: isAuthenticated,
  });

  // Filter products for subscription (only culinary products like salt)
  const subscriptionProducts = products?.filter(
    (product) => product.category === 'culinary'
  ).map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    sale_price: product.sale_price,
    image_url: product.image_url,
    category: product.category,
    weight: product.weight,
  })) as SubscriptionProduct[];

  // Get selected product details
  const selectedProduct = subscriptionProducts?.find(
    (product) => product.id === selectedProductId
  );

  // Create subscription form
  const form = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      productId: 0,
      quantity: 1,
      frequency: 'monthly',
      addressId: 0,
    },
  });

  // Calculate subscription price based on frequency discount
  const calculatePrice = (basePrice: number, frequency: string, quantity: number) => {
    const option = frequencyOptions.find(f => f.value === frequency);
    const discountPercent = option?.discount || 0;
    const discountedPrice = basePrice * (1 - discountPercent / 100);
    return (discountedPrice * quantity).toFixed(2);
  };

  // Calculate total price based on selected product, frequency, and quantity
  const calculateTotalPrice = () => {
    if (!selectedProduct) return '0.00';
    const basePrice = selectedProduct.sale_price || selectedProduct.price;
    const quantity = form.getValues().quantity || 1;
    return calculatePrice(basePrice, selectedFrequency, quantity);
  };

  // Create subscription mutation
  const createSubscription = useMutation({
    mutationFn: async (data: z.infer<typeof subscriptionFormSchema>) => {
      return await apiRequest('POST', '/api/subscriptions', data);
    },
    onSuccess: () => {
      toast({
        title: 'Subscription Created',
        description: 'Your salt subscription has been set up successfully!',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/account/subscriptions'] });
      navigate('/account/subscriptions');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof subscriptionFormSchema>) => {
    createSubscription.mutate(data);
  };

  // Update form values when selections change
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    form.setValue('productId', productId);
  };

  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
    form.setValue('frequency', frequency as any);
  };

  // Loading state
  if (productsLoading || addressesLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading subscription options...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Salt Subscription Service | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Subscribe to regular deliveries of premium Pink Himalayan Salt products. Customize your delivery schedule and save with our subscription service."
        />
      </Helmet>

      <div className="container py-10">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Salt Subscription Service</h1>
            <p className="text-muted-foreground mt-2">
              Subscribe to regular deliveries of your favorite Pink Himalayan Salt products and save up to 12%
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Your Salt Product</CardTitle>
                      <CardDescription>
                        Choose from our premium culinary salt products for regular delivery
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="productId"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>Salt Product</FormLabel>
                              <div className="grid gap-4 sm:grid-cols-2">
                                {subscriptionProducts?.map((product) => (
                                  <Card 
                                    key={product.id}
                                    className={`cursor-pointer hover:border-primary transition-colors ${
                                      selectedProductId === product.id ? 'border-primary ring-2 ring-primary/20' : ''
                                    }`}
                                    onClick={() => handleProductSelect(product.id)}
                                  >
                                    <div className="aspect-square w-full overflow-hidden">
                                      <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-all hover:scale-105"
                                      />
                                    </div>
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h3 className="font-medium">{product.name}</h3>
                                          <p className="text-sm text-muted-foreground line-clamp-2">
                                            {product.description.substring(0, 80)}...
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          {product.sale_price ? (
                                            <>
                                              <div className="text-sm line-through opacity-70">
                                                ${product.price.toFixed(2)}
                                              </div>
                                              <div className="font-medium text-primary">
                                                ${product.sale_price.toFixed(2)}
                                              </div>
                                            </>
                                          ) : (
                                            <div className="font-medium">
                                              ${product.price.toFixed(2)}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    {...field}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value);
                                      field.onChange(value);
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Number of items per delivery
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addressId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Delivery Address</FormLabel>
                                <Select
                                  onValueChange={(value) => field.onChange(parseInt(value))}
                                  defaultValue={field.value.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an address" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Your Addresses</SelectLabel>
                                      {addresses.length > 0 ? (
                                        addresses.map((address: any) => (
                                          <SelectItem key={address.id} value={address.id.toString()}>
                                            {address.addressLine1}, {address.city}, {address.zip}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem value="new" disabled>
                                          No addresses found
                                        </SelectItem>
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  <a href="/account/addresses" className="text-primary hover:underline">
                                    Manage addresses
                                  </a>
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Schedule</CardTitle>
                      <CardDescription>
                        Choose how often you'd like to receive your salt delivery
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <div className="grid gap-4">
                              <RadioGroup
                                onValueChange={(value) => handleFrequencyChange(value)}
                                defaultValue={field.value}
                                className="grid gap-4 sm:grid-cols-3"
                              >
                                {frequencyOptions.map((option) => (
                                  <div key={option.value}>
                                    <RadioGroupItem
                                      value={option.value}
                                      id={option.value}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={option.value}
                                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                      <div className="mb-2 rounded-full bg-primary/10 p-1 text-primary">
                                        <Badge variant="secondary" className="text-xs">
                                          Save {option.discount}%
                                        </Badge>
                                      </div>
                                      <div className="text-center">
                                        <h4 className="text-base font-semibold">{option.label.split(' ')[0]}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {option.label.split(' ')[1]}
                                        </p>
                                      </div>
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={createSubscription.isPending || !selectedProductId}
                    >
                      {createSubscription.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Create Subscription'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Subscription Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct ? (
                    <>
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          <img
                            src={selectedProduct.image_url}
                            alt={selectedProduct.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{selectedProduct.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {form.getValues().quantity || 1}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Product price:</span>
                          <span>
                            ${(selectedProduct.sale_price || selectedProduct.price).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery frequency:</span>
                          <span>
                            {frequencyOptions.find(f => f.value === selectedFrequency)?.label.split(' ')[0]}
                          </span>
                        </div>
                        <div className="flex justify-between text-primary">
                          <span>Subscription discount:</span>
                          <span>
                            {frequencyOptions.find(f => f.value === selectedFrequency)?.discount}%
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total per delivery:</span>
                        <span>${calculateTotalPrice()}</span>
                      </div>

                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>
                          Your first delivery will be processed immediately after subscription creation.
                          Subsequent deliveries will follow your selected frequency.
                        </p>
                        <p className="mt-2">
                          You can pause, modify, or cancel your subscription at any time from your account.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Select a product to see subscription details</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    onClick={() => form.handleSubmit(onSubmit)()}
                    disabled={createSubscription.isPending || !selectedProductId}
                  >
                    Create Subscription
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}