import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  customerEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  customerPhone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "ZIP code must be at least 5 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const shipping = subtotal >= 99 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare order data
      const orderData = {
        ...data,
        total,
        status: "pending",
      };
      
      // Prepare order items data
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      
      // Submit order
      await apiRequest("POST", "/api/orders", {
        ...orderData,
        items: orderItems,
      });
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. We will process it shortly.",
      });
      
      clearCart();
      setLocation("/checkout/success");
    } catch (error) {
      toast({
        title: "Order submission failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If cart is empty redirect to products page
  if (cartItems.length === 0 && location.pathname !== "/checkout/success") {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">Add some products to your cart before proceeding to checkout.</p>
        <Button asChild className="btn-primary">
          <Link href="/products">
            Shop Now
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Complete your purchase of premium Pink Himalayan Salt products from Dr. Abdul PHS. Secure checkout with multiple payment options available."
        />
      </Helmet>

      <div className="bg-neutral-beige py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Checkout</h1>
          <p className="text-lg mb-8">
            Complete your order by providing your shipping and payment details
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-heading font-semibold mb-6">Shipping Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Street address, apt, suite, etc."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province*</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP/Postal Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="ZIP Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="MX">Mexico</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-6">
                    <h2 className="text-xl font-heading font-semibold mb-6">Payment Information</h2>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        This is a demo checkout. No actual payment will be processed.
                      </p>
                      <div className="flex items-center space-x-4">
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-visa-3-226460.png" alt="Visa" className="h-8" />
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3-226462.png" alt="Mastercard" className="h-8" />
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-american-express-51-675784.png" alt="American Express" className="h-8" />
                        <img src="https://cdn.iconscout.com/icon/free/png-256/free-paypal-54-675727.png" alt="PayPal" className="h-8" />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Complete Order - $${total.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  By completing your purchase, you agree to our{" "}
                  <Link href="/terms">
                    <a className="text-secondary hover:underline">Terms of Service</a>
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy">
                    <a className="text-secondary hover:underline">Privacy Policy</a>
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
