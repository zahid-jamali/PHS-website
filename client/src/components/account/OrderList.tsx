import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Eye, Package, ShoppingBag } from 'lucide-react';
import { Order } from '@shared/schema';

// Order status badge colors
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  processing: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  shipped: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
  delivered: 'bg-green-100 text-green-800 hover:bg-green-100',
  cancelled: 'bg-red-100 text-red-800 hover:bg-red-100',
};

// Format date as MMM DD, YYYY
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export default function OrderList() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch orders from the API
  const { data: orders, isLoading, error } = useQuery<(Order & { itemCount: number })[]>({
    queryKey: ['/api/account/orders'],
  });

  // Filter orders based on status and search query
  const filteredOrders = orders?.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      order.id.toString().includes(searchQuery) || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <p className="text-red-700">
          There was an error loading your orders. Please try again later.
        </p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12 space-y-4">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium">No orders found</h3>
        <p className="text-muted-foreground">
          You haven't placed any orders yet. Start shopping to see your orders here.
        </p>
        <Button asChild className="mt-4">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex w-full sm:w-auto">
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search orders..." 
            className="pl-8 w-full sm:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={STATUS_COLORS[order.status as keyof typeof STATUS_COLORS] || 'bg-gray-100'}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link href={`/account/orders/${order.id}/track`}>
                        <Package className="h-4 w-4 mr-1" />
                        Track
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}