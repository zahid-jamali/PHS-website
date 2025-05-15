import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Map, TrendingUp, Clock, Package, Truck, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

interface OrderTrackingDetailsProps {
  orderId: number;
  onBack: () => void;
}

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

export default function OrderTrackingDetails({ orderId, onBack }: OrderTrackingDetailsProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Track order query
  const { data: trackingData, isLoading, isError } = useQuery({
    queryKey: ['/api/orders', orderId, 'tracking'],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${orderId}/tracking`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch tracking information');
      }
      
      return response.json();
    },
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Clock className="h-10 w-10 text-neutral-400 animate-pulse mb-4" />
        <p className="text-neutral-500">{t('Loading tracking information...')}</p>
      </div>
    );
  }
  
  if (isError || !trackingData) {
    return (
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-2 text-red-600 mb-4">
            <AlertTriangle className="h-8 w-8" />
            <h3 className="font-medium text-center">{t('Error Loading Tracking Information')}</h3>
          </div>
          <p className="text-neutral-600 text-center mb-4">
            {t('We encountered an issue while retrieving the tracking details for this order.')}
          </p>
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('Back to Orders')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { order, items, tracking, trackingHistory } = trackingData;
  
  // Status color mapping
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

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="p-2 mr-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t('Track Order')} #{order.id}</h1>
      </div>
      
      {/* Order Details Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{t('Order')} #{order.id}</CardTitle>
              <CardDescription>
                {t('Placed on')} {formatDate(order.createdAt)}
              </CardDescription>
            </div>
            <Badge 
              variant="outline" 
              className={getStatusColor(order.status)}
            >
              {t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Shipping Details */}
          <h3 className="font-medium text-lg mb-2">{t('Shipping Details')}</h3>
          <p className="text-sm text-neutral-600 mb-1">
            <span className="font-medium">{t('Ship To')}:</span> {order.customerName}
          </p>
          <p className="text-sm text-neutral-600 mb-1">
            <span className="font-medium">{t('Address')}:</span> {order.address}, {order.city}, {order.state} {order.zip}, {order.country}
          </p>
          
          {tracking?.carrier && (
            <p className="text-sm text-neutral-600 mb-1">
              <span className="font-medium">{t('Carrier')}:</span> {tracking.carrier}
            </p>
          )}
          
          {tracking?.trackingNumber && (
            <p className="text-sm text-neutral-600">
              <span className="font-medium">{t('Tracking Number')}:</span> {tracking.trackingNumber}
            </p>
          )}
          
          {tracking?.estimatedDelivery && (
            <p className="text-sm text-neutral-600">
              <span className="font-medium">{t('Estimated Delivery')}:</span> {formatDate(tracking.estimatedDelivery)}
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
          <div className="relative pb-8">
            {trackingHistory?.length > 0 ? (
              trackingHistory.map((track: any, index: number) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  <div className="mr-4 relative">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-accent text-white' : 'bg-neutral-100'}`}>
                      {index === 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <StatusIcon status={track.status} />
                      )}
                    </div>
                    {index < trackingHistory.length - 1 && (
                      <div className="absolute top-8 left-3.5 bottom-0 w-1 bg-neutral-200"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{t(track.status)}</p>
                    <p className="text-sm text-neutral-500">{formatDate(track.updatedAt)}</p>
                    {track.locationUpdate && (
                      <div className="mt-1 flex items-start gap-1 text-sm text-neutral-600">
                        <Map className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{track.locationUpdate}</span>
                      </div>
                    )}
                    {track.notes && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {track.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-neutral-500">
                {t('No tracking updates available yet.')}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Order Items')}</CardTitle>
        </CardHeader>
        <CardContent>
          {items?.length > 0 ? (
            <div className="space-y-4">
              {items.map((item: any) => (
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
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="text-center py-8 text-neutral-500">
              {t('No items available for this order.')}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-t flex justify-center py-4">
          <Button variant="ghost" onClick={() => window.print()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer mr-2 h-4 w-4"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            {t('Print Order Details')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}