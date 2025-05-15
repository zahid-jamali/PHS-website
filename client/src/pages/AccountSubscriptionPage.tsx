import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'wouter';
import { Loader2, Calendar, Package, RefreshCw, AlertTriangle, CheckCircle, PauseCircle, XCircle, Settings } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Frequency options for subscriptions with human-readable labels
const FREQUENCY_LABELS: Record<string, string> = {
  'weekly': 'Weekly (Every 7 days)',
  'biweekly': 'Bi-weekly (Every 14 days)',
  'monthly': 'Monthly (Every 30 days)',
  'bimonthly': 'Bi-monthly (Every 60 days)',
  'quarterly': 'Quarterly (Every 90 days)',
};

// Status badges with appropriate styles
const STATUS_BADGES: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  'active': { label: 'Active', variant: 'default' },
  'paused': { label: 'Paused', variant: 'secondary' },
  'canceled': { label: 'Canceled', variant: 'destructive' },
  'pending': { label: 'Pending', variant: 'outline' },
};

export default function AccountSubscriptionPage() {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [editSubscriptionId, setEditSubscriptionId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editFrequency, setEditFrequency] = useState('monthly');
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);

  const [, navigate] = useLocation();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast({
      title: "Login Required",
      description: "Please login to view your subscriptions",
      variant: "destructive",
    });
    navigate('/login');
    return null;
  }

  // Get user subscriptions
  const { data: subscriptions = [], isLoading: isLoadingSubscriptions } = useQuery<any[]>({
    queryKey: ['/api/account/subscriptions'],
    enabled: isAuthenticated,
  });

  // Get product data
  const { data: products, isLoading: isLoadingProducts } = useQuery<any[]>({
    queryKey: ['/api/products'],
  });

  // Get subscription history
  const { data: history = [], isLoading: isLoadingHistory } = useQuery<any[]>({
    queryKey: ['/api/account/subscription-history'],
    enabled: isAuthenticated,
  });

  // Update subscription mutation
  const updateSubscription = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      return await apiRequest('PATCH', `/api/subscriptions/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: 'Subscription Updated',
        description: 'Your subscription has been updated successfully.',
      });
      setEditSubscriptionId(null);
      queryClient.invalidateQueries({ queryKey: ['/api/account/subscriptions'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Cancel subscription mutation
  const cancelSubscription = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('POST', `/api/subscriptions/${id}/cancel`, {});
    },
    onSuccess: () => {
      toast({
        title: 'Subscription Canceled',
        description: 'Your subscription has been canceled successfully.',
      });
      setConfirmCancelId(null);
      queryClient.invalidateQueries({ queryKey: ['/api/account/subscriptions'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to cancel subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  // Handlers
  const handleSaveChanges = (id: number) => {
    updateSubscription.mutate({
      id,
      data: {
        quantity: editQuantity,
        frequency: editFrequency,
      },
    });
  };

  const handleCancelSubscription = (id: number) => {
    cancelSubscription.mutate(id);
  };

  const handleEditOpen = (subscription: any) => {
    setEditSubscriptionId(subscription.id);
    setEditQuantity(subscription.quantity);
    setEditFrequency(subscription.frequency);
  };

  // Helper to get product details
  const getProductDetails = (productId: number) => {
    return products?.find((product) => product.id === productId);
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Loading state
  if (isLoadingSubscriptions || isLoadingProducts) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading your subscriptions...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Subscriptions | Dr. Abdul PHS</title>
        <meta
          name="description"
          content="Manage your salt subscriptions, view delivery history, and update your preferences."
        />
      </Helmet>

      <div className="container py-10">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Subscriptions</h1>
            <p className="text-muted-foreground mt-2">
              Manage your salt subscriptions and track deliveries
            </p>
          </div>

          {subscriptions?.length === 0 ? (
            <Card className="text-center py-10">
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Package className="h-12 w-12 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold">No Subscriptions Found</h2>
                  <p className="text-muted-foreground">
                    You don't have any active salt subscriptions yet.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/subscribe">Start a Subscription</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {subscriptions?.map((subscription: any) => {
                const product = getProductDetails(subscription.productId);
                return (
                  <Card key={subscription.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{product?.name}</CardTitle>
                          <CardDescription>
                            Subscription #{subscription.id} • Created on {formatDate(subscription.createdAt)}
                          </CardDescription>
                        </div>
                        <Badge variant={STATUS_BADGES[subscription.status]?.variant || 'default'}>
                          {STATUS_BADGES[subscription.status]?.label || subscription.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex space-x-4">
                          <div className="h-24 w-24 overflow-hidden rounded-md">
                            <img
                              src={product?.image_url}
                              alt={product?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{product?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {subscription.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${((product?.sale_price || product?.price) * subscription.quantity).toFixed(2)} per delivery
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Delivery Frequency:</span>
                          </div>
                          <div className="text-sm">
                            {FREQUENCY_LABELS[subscription.frequency] || subscription.frequency}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Next Delivery:</span>
                          </div>
                          <div className="text-sm">
                            {formatDate(subscription.nextDeliveryDate)}
                          </div>
                        </div>
                      </div>

                      {editSubscriptionId === subscription.id && (
                        <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                          <h3 className="text-sm font-medium mb-4">Edit Subscription</h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Quantity:</label>
                              <Input
                                type="number"
                                min={1}
                                max={10}
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(parseInt(e.target.value))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Frequency:</label>
                              <Select
                                value={editFrequency}
                                onValueChange={setEditFrequency}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="weekly">Weekly (Every 7 days)</SelectItem>
                                  <SelectItem value="biweekly">Bi-weekly (Every 14 days)</SelectItem>
                                  <SelectItem value="monthly">Monthly (Every 30 days)</SelectItem>
                                  <SelectItem value="bimonthly">Bi-monthly (Every 60 days)</SelectItem>
                                  <SelectItem value="quarterly">Quarterly (Every 90 days)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditSubscriptionId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveChanges(subscription.id)}
                              disabled={updateSubscription.isPending}
                            >
                              {updateSubscription.isPending ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-secondary/10 px-6 py-3">
                      <div className="flex justify-between items-center w-full">
                        <div className="text-sm text-muted-foreground">
                          {subscription.status === 'active' ? (
                            <span className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                              Active subscription
                            </span>
                          ) : subscription.status === 'paused' ? (
                            <span className="flex items-center">
                              <PauseCircle className="h-4 w-4 mr-1 text-amber-600" />
                              Paused subscription
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <XCircle className="h-4 w-4 mr-1 text-destructive" />
                              Canceled subscription
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {subscription.status === 'active' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditOpen(subscription)}
                              >
                                Edit
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setConfirmCancelId(subscription.id)}
                                  >
                                    Cancel Subscription
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Cancel Subscription</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to cancel this subscription? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <Alert variant="destructive">
                                      <AlertTriangle className="h-4 w-4" />
                                      <AlertTitle>Warning</AlertTitle>
                                      <AlertDescription>
                                        Canceling will stop all future deliveries. 
                                        You can create a new subscription at any time.
                                      </AlertDescription>
                                    </Alert>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setConfirmCancelId(null)}
                                    >
                                      Keep Subscription
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => handleCancelSubscription(subscription.id)}
                                      disabled={cancelSubscription.isPending}
                                    >
                                      {cancelSubscription.isPending ? (
                                        <>
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Canceling...
                                        </>
                                      ) : (
                                        'Yes, Cancel Subscription'
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                          {subscription.status === 'paused' && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => updateSubscription.mutate({
                                id: subscription.id,
                                data: { status: 'active' }
                              })}
                            >
                              Resume Subscription
                            </Button>
                          )}
                          {subscription.status === 'canceled' && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link href="/subscribe">Start New Subscription</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

          {history?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Delivery History</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Past Deliveries</CardTitle>
                  <CardDescription>
                    Track all your previous subscription deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {history.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Delivery for Subscription #{item.subscriptionId}</p>
                            <p className="text-sm text-muted-foreground">
                              Delivered on {formatDate(item.deliveryDate)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Badge variant={item.status === 'delivered' ? 'default' : 'outline'}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-6">
            <Alert>
              <Settings className="h-4 w-4" />
              <AlertTitle>Need help with your subscription?</AlertTitle>
              <AlertDescription>
                Contact our customer support at <a href="mailto:support@drabdulphs.com" className="text-primary hover:underline">support@drabdulphs.com</a> or call us at <a href="tel:+19254487591" className="text-primary hover:underline">+1 (925) 448-7591</a>.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </>
  );
}