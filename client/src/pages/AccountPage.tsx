import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, User, Home, Bell, Settings, CreditCard, Clock, TrendingUp, Map, Truck, Loader } from "lucide-react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import OrderTrackingDetails from "@/components/account/OrderTrackingDetails";

// User address data
const addresses = [
  {
    id: 1,
    name: 'Home Address',
    addressLine1: '123 Salt Lane',
    addressLine2: 'Apt 4B',
    city: 'Salt Lake City',
    state: 'Utah',
    zip: '84101',
    country: 'United States',
    isDefault: true
  },
  {
    id: 2,
    name: 'Office Address',
    addressLine1: '456 Mineral Way',
    addressLine2: 'Suite 789',
    city: 'Boulder',
    state: 'Colorado',
    zip: '80302',
    country: 'United States',
    isDefault: false
  }
];

export default function AccountPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  // Fetch user orders
  const { data: userOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['/api/account/orders'],
    queryFn: async () => {
      const response = await fetch('/api/account/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return response.json();
    },
    enabled: !!user // Only fetch if user is authenticated
  });
  
  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setActiveTab('tracking');
  };
  
  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setActiveTab('orders');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>My Account | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content="Manage your account, view order history, track shipments, and update your preferences."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/images/logo.webp" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-neutral-500">john.doe@example.com</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-1">
                <Button
                  variant={activeTab === 'orders' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className="mr-2 h-4 w-4" />
                  {t('Order History')}
                </Button>
                
                <Button
                  variant={activeTab === 'tracking' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('tracking')}
                  disabled={!selectedOrder}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  {t('Order Tracking')}
                </Button>
                
                <Button
                  variant={activeTab === 'profile' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('Profile')}
                </Button>
                
                <Button
                  variant={activeTab === 'addresses' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('addresses')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  {t('Addresses')}
                </Button>
                
                <Button
                  variant={activeTab === 'payment' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t('Payment Methods')}
                </Button>
                
                <Button
                  variant={activeTab === 'notifications' ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {t('Notifications')}
                </Button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Order History */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{t('Order History')}</h1>
                
                {isLoadingOrders ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
                    <p className="text-neutral-600">{t('Loading your orders...')}</p>
                  </div>
                ) : userOrders && userOrders.length > 0 ? (
                  <div className="space-y-4">
                    {userOrders.map((order: any) => (
                      <Card key={order.id} className="transition hover:shadow-md">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{t('Order')} #{order.id}</CardTitle>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(order.status)}
                            >
                              {t(order.status.toUpperCase())}
                            </Badge>
                          </div>
                          <CardDescription>
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })} • ${order.total.toFixed(2)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-4">
                          {order.items && order.items.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-4">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="flex gap-3">
                                  <div className="w-16 h-16 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img
                                      src={item.product?.imageUrl || '/images/placeholder.jpg'}
                                      alt={item.product?.name || 'Product'}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{item.product?.name || 'Product'}</p>
                                    <p className="text-neutral-500 text-sm">
                                      ${item.price.toFixed(2)} × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-neutral-500 text-center py-2">{t('No item details available')}</p>
                          )}
                        </CardContent>
                        <CardFooter className="border-t bg-neutral-50 flex justify-between items-center">
                          <div>
                            {order.trackingNumber && (
                              <p className="text-sm text-neutral-500">
                                <span className="font-medium">{t('Tracking')}:</span> {order.trackingNumber} ({order.carrier || t('Standard')})
                              </p>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => handleOrderClick(order)}
                          >
                            {t('Track Order')}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Package className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                      <p className="text-neutral-500">{t('You have no orders yet.')}</p>
                      <Button className="mt-4" asChild>
                        <a href="/products">{t('Shop Now')}</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {/* Order Tracking */}
            {activeTab === 'tracking' && selectedOrder && (
              <OrderTrackingDetails 
                orderId={selectedOrder.id} 
                onBack={handleBackToOrders} 
              />
            )}
            
            {/* Profile */}
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{t('Profile')}</h1>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>{t('Account Information')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('First Name')}</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t('Last Name')}</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="email">{t('Email')}</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="phone">{t('Phone')}</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="currentPassword">{t('Current Password')}</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="newPassword">{t('New Password')}</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="confirmPassword">{t('Confirm New Password')}</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>{t('Save Changes')}</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{t('Addresses')}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <Card key={address.id} className="relative">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{address.name}</CardTitle>
                          {address.isDefault && (
                            <Badge variant="secondary">{t('Default')}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-600">
                          {address.addressLine1}<br />
                          {address.addressLine2 && <>{address.addressLine2}<br /></>}
                          {address.city}, {address.state} {address.zip}<br />
                          {address.country}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t">
                        <Button variant="ghost" size="sm">{t('Edit')}</Button>
                        {!address.isDefault && (
                          <Button variant="ghost" size="sm">{t('Set as Default')}</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 mb-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      <p className="text-neutral-500">{t('Add a New Address')}</p>
                      <Button variant="ghost" className="mt-2">{t('Add Address')}</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{t('Payment Methods')}</h1>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center py-8 text-neutral-500">
                      {t('Payment methods will be available soon.')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">{t('Notifications')}</h1>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center py-8 text-neutral-500">
                      {t('Notification preferences coming soon.')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}