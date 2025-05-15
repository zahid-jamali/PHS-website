import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { Package, TrendingUp, Clock, Map, Truck, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import TrackingTimeline, { TrackingItem, TrackingStatus } from '@/components/order/TrackingTimeline';

// Form schema
const trackOrderSchema = z.object({
  orderNumber: z.string().min(1, { message: 'Order number is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' })
});

type TrackOrderFormValues = z.infer<typeof trackOrderSchema>;

export default function TrackOrderPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form
  const form = useForm<TrackOrderFormValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderNumber: '',
      email: ''
    }
  });
  
  // Handle form submission
  const onSubmit = async (values: TrackOrderFormValues) => {
    setIsLoading(true);
    setError(null);
    setTrackingData(null);
    
    try {
      const queryParams = new URLSearchParams({
        orderNumber: values.orderNumber,
        email: values.email
      });
      
      const response = await fetch(`/api/track-order?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to track order');
      }
      
      const data = await response.json();
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while tracking your order');
      toast({
        title: 'Error',
        description: err.message || 'Failed to track order',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'out for delivery':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const StatusIcon = ({ status }: { status: string }) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500" />;
      case 'out for delivery':
        return <Truck className="h-6 w-6 text-indigo-500" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'pending':
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Track your Pink Himalayan Salt product order with real-time updates on shipping and delivery status."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('Track Your Order')}</h1>
            <p className="text-neutral-600">
              {t('Enter your order number and email address to track your order status and shipping updates.')}
            </p>
          </div>
          
          {/* Search Form */}
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>{t('Order Tracking')}</CardTitle>
              <CardDescription>
                {t('Enter the details from your order confirmation email')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="orderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Order Number')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ORD-12345"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t('Found in your order confirmation email')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Email Address')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t('Email used for your order')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('Tracking...')}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t('Track Order')}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Tracking Results */}
          {error && (
            <Card className="border-red-200 mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-2 text-red-600 mb-4">
                  <AlertTriangle className="h-8 w-8" />
                  <h3 className="font-medium text-center">{t('Order Not Found')}</h3>
                </div>
                <p className="text-neutral-600 text-center">
                  {error}
                </p>
                <p className="text-neutral-600 text-center mt-2">
                  {t('Please check your order number and email address and try again.')}
                </p>
              </CardContent>
            </Card>
          )}
          
          {trackingData && (
            <div className="space-y-8">
              {/* Order Details */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{t('Order')} #{trackingData.order.id}</CardTitle>
                      <CardDescription>
                        {t('Placed on')} {formatDate(trackingData.order.createdAt)}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(trackingData.order.status)}
                    >
                      {t(trackingData.order.status.charAt(0).toUpperCase() + trackingData.order.status.slice(1))}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Shipping Details */}
                  <h3 className="font-medium text-lg mb-2">{t('Shipping Details')}</h3>
                  <p className="text-sm text-neutral-600 mb-1">
                    <span className="font-medium">{t('Ship To')}:</span> {trackingData.order.customerName}
                  </p>
                  <p className="text-sm text-neutral-600 mb-1">
                    <span className="font-medium">{t('Address')}:</span> {trackingData.order.address}, {trackingData.order.city}, {trackingData.order.state} {trackingData.order.zip}, {trackingData.order.country}
                  </p>
                  
                  {trackingData.tracking?.carrier && (
                    <p className="text-sm text-neutral-600 mb-1">
                      <span className="font-medium">{t('Carrier')}:</span> {trackingData.tracking.carrier}
                    </p>
                  )}
                  
                  {trackingData.tracking?.trackingNumber && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">{t('Tracking Number')}:</span> {trackingData.tracking.trackingNumber}
                    </p>
                  )}
                  
                  {trackingData.tracking?.estimatedDelivery && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">{t('Estimated Delivery')}:</span> {formatDate(trackingData.tracking.estimatedDelivery)}
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('Tracking Timeline')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {trackingData.trackingHistory?.length > 0 ? (
                    <TrackingTimeline 
                      trackingHistory={trackingData.trackingHistory.map((track: any) => ({
                        id: track.id,
                        status: track.status as TrackingStatus,
                        orderId: track.orderId,
                        updatedAt: track.updatedAt,
                        trackingNumber: track.trackingNumber,
                        carrier: track.carrier,
                        estimatedDelivery: track.estimatedDelivery,
                        actualDelivery: track.actualDelivery,
                        locationUpdate: track.locationUpdate,
                        notes: track.notes
                      }))}
                      currentStatus={trackingData.order.status as TrackingStatus}
                    />
                  ) : (
                    <p className="text-center py-8 text-neutral-500">
                      {t('No tracking updates available yet.')}
                    </p>
                  )}
                </CardContent>
              </Card>
              
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('Order Items')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {trackingData.items?.length > 0 ? (
                    <div className="space-y-4">
                      {trackingData.items.map((item: any) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-neutral-100 rounded flex-shrink-0 overflow-hidden">
                            {item.product?.imageUrl && (
                              <img 
                                src={item.product.imageUrl} 
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{item.product?.name || 'Product'}</p>
                            <p className="text-sm text-neutral-500">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold">
                        <span>{t('Total')}</span>
                        <span>${trackingData.order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-center py-8 text-neutral-500">
                      {t('No items available for this order.')}
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <div className="text-center">
                <p className="text-neutral-600 mb-4">
                  {t('Need help with your order?')}
                </p>
                <Button asChild>
                  <a href="/contact">
                    {t('Contact Customer Support')}
                  </a>
                </Button>
              </div>
            </div>
          )}
          
          {!trackingData && !error && (
            <div className="text-center mt-10 space-y-4">
              <p className="text-neutral-600">
                {t('If you don\'t have your order number, you can find it in your order confirmation email.')}
              </p>
              <p className="text-neutral-600">
                {t('For any issues with tracking your order, please')} <a href="/contact" className="text-primary hover:underline">{t('contact us')}</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}