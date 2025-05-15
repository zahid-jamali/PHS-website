import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, ArrowLeft, Package, Download, ShoppingCart } from 'lucide-react';
import { Order, OrderItem, Product } from '@shared/schema';

// Status badge colors
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  processing: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  shipped: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
  delivered: 'bg-green-100 text-green-800 hover:bg-green-100',
  cancelled: 'bg-red-100 text-red-800 hover:bg-red-100',
};

// Format date
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

interface OrderDetailProps {
  orderId: number;
}

export default function OrderDetail({ orderId }: OrderDetailProps) {
  // Get order details
  const { 
    data: order, 
    isLoading: orderLoading, 
    error: orderError 
  } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`],
  });

  // Get order items
  const { 
    data: orderItems, 
    isLoading: itemsLoading, 
    error: itemsError 
  } = useQuery<(OrderItem & { product: Product })[]>({
    queryKey: [`/api/orders/${orderId}/items`],
    enabled: !!order,
  });

  // Get order tracking info
  const { 
    data: trackingInfo, 
    isLoading: trackingLoading 
  } = useQuery({
    queryKey: [`/api/orders/${orderId}/tracking`],
    enabled: !!order,
  });

  const isLoading = orderLoading || itemsLoading;
  const error = orderError || itemsError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading order details...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <p className="text-red-700">
          There was an error loading the order details. Please try again later.
        </p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link href="/account/orders">
            <Button variant="link" className="pl-0 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>
          </Link>
          <h1 className="text-2xl font-heading font-semibold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <Link href={`/account/orders/${order.id}/track`}>
              <Package className="h-4 w-4 mr-1" />
              Track Order
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Download className="h-4 w-4 mr-1" />
            Download Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Status</span>
              <Badge 
                variant="secondary"
                className={STATUS_COLORS[order.status as keyof typeof STATUS_COLORS] || 'bg-gray-100'}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Date</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Total</span>
              <span className="font-semibold">${order.total.toFixed(2)}</span>
            </div>

            {trackingInfo && !trackingLoading && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Shipping Information</h4>
                  
                  {trackingInfo.trackingNumber && (
                    <div className="flex justify-between">
                      <span>Tracking Number</span>
                      <span className="font-mono text-sm">{trackingInfo.trackingNumber}</span>
                    </div>
                  )}
                  
                  {trackingInfo.carrier && (
                    <div className="flex justify-between">
                      <span>Carrier</span>
                      <span>{trackingInfo.carrier}</span>
                    </div>
                  )}
                  
                  {trackingInfo.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span>Estimated Delivery</span>
                      <span>{formatDate(trackingInfo.estimatedDelivery)}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Shipping & Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping & Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Shipping Address */}
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <address className="not-italic text-muted-foreground">
                {order.customerName}<br />
                {order.address}<br />
                {order.city}, {order.state} {order.zip}<br />
                {order.country}
              </address>
            </div>
            
            {/* Contact Information */}
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="text-muted-foreground">
                <p>{order.customerEmail}</p>
                {order.customerPhone && <p>{order.customerPhone}</p>}
              </div>
            </div>
            
            {/* Payment Method - For demonstration */}
            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex items-center text-muted-foreground">
                <span className="bg-gray-200 h-8 w-12 rounded-md mr-2 flex items-center justify-center text-xs font-bold">VISA</span>
                <span>•••• •••• •••• 1234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items in Your Order</CardTitle>
          <CardDescription>
            {orderItems?.length || 0} item{orderItems?.length !== 1 ? 's' : ''} in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!orderItems?.length ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No items found for this order.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-16 w-16 rounded overflow-hidden bg-neutral-100 flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.product.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-end pt-4 space-y-2">
          <div className="flex justify-between w-full md:w-72">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${(order.total * 0.9).toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-full md:w-72">
            <span className="text-muted-foreground">Shipping</span>
            <span>${(order.total * 0.1).toFixed(2)}</span>
          </div>
          <Separator className="w-full md:w-72 my-2" />
          <div className="flex justify-between w-full md:w-72 font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </CardFooter>
      </Card>

      {/* Order Actions */}
      <div className="flex flex-wrap gap-3 justify-start mt-8">
        <Button variant="outline" asChild>
          <Link href="/account/orders">Return to Order History</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/contact">Need Help?</Link>
        </Button>
      </div>
    </div>
  );
}