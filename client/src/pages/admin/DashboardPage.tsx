import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ShoppingBag,
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ChevronsUp,
  ChevronsDown,
  Minus,
  Eye
} from 'lucide-react';

// Sample data for charts (will be replaced with API data)
const salesData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Apr', total: 4500 },
  { name: 'May', total: 3800 },
  { name: 'Jun', total: 5500 },
  { name: 'Jul', total: 6000 },
];

const visitorsData = [
  { name: 'Mon', value: 500 },
  { name: 'Tue', value: 680 },
  { name: 'Wed', value: 860 },
  { name: 'Thu', value: 790 },
  { name: 'Fri', value: 820 },
  { name: 'Sat', value: 950 },
  { name: 'Sun', value: 780 },
];

const productCategoryData = [
  { name: 'Salt Lamps', value: 45 },
  { name: 'Culinary', value: 28 },
  { name: 'Spa & Bath', value: 17 },
  { name: 'Halotherapy', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const [period, setPeriod] = useState('7d');

  // Fetch statistics from the API
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/statistics', period],
  });

  // Fetch recent orders
  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['/api/admin/orders/recent'],
  });

  // Fetch top selling products
  const { data: topProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['/api/admin/products/top'],
  });

  // Render trend indicator based on percentage change
  const renderTrend = (percentage: number) => {
    if (percentage > 0) {
      return (
        <div className="flex items-center text-green-500">
          <ChevronsUp className="h-4 w-4 mr-1" />
          <span>+{percentage}%</span>
        </div>
      );
    } else if (percentage < 0) {
      return (
        <div className="flex items-center text-red-500">
          <ChevronsDown className="h-4 w-4 mr-1" />
          <span>{percentage}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="h-4 w-4 mr-1" />
          <span>0%</span>
        </div>
      );
    }
  };

  // Format date for recent orders
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard | Dr. Abdul PHS</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to Dr. Abdul PHS admin panel</p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={period}
              onValueChange={setPeriod}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,658.20</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span className="mr-1">vs. previous period:</span>
                {renderTrend(12.5)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">436</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span className="mr-1">vs. previous period:</span>
                {renderTrend(8.2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">583</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span className="mr-1">vs. previous period:</span>
                {renderTrend(5.7)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span className="mr-1">vs. previous period:</span>
                {renderTrend(18.3)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="products">Product Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Showing total sales data for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`$${value}`, 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar 
                      dataKey="total" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Traffic</CardTitle>
                <CardDescription>
                  Website visitor traffic pattern over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Visitors"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Category Distribution</CardTitle>
                <CardDescription>
                  Sales distribution by product category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Orders */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Recent Orders</CardTitle>
              <CardDescription>
                Latest customer orders placed on your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">#{1000 + index}</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>{formatDate(new Date().toISOString())}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={
                            index % 3 === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index % 3 === 1 ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {index % 3 === 0 ? 'Pending' :
                             index % 3 === 1 ? 'Processing' :
                             'Shipped'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/orders/${1000 + index}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <div className="mt-4 text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Top Selling Products</CardTitle>
              <CardDescription>
                Your best performing products based on sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-md"></div>
                            <span className="truncate max-w-[150px]">
                              {index === 0 ? 'Himalayan Salt Lamp' :
                               index === 1 ? 'Pink Salt Coarse Grind' :
                               index === 2 ? 'Salt Inhaler' :
                               index === 3 ? 'Salt Bath Crystals' :
                               'Himalayan Cooking Block'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {index === 0 ? 'Salt Lamps' :
                           index === 1 ? 'Culinary' :
                           index === 2 ? 'Halotherapy' :
                           index === 3 ? 'Spa & Bath' :
                           'Culinary'}
                        </TableCell>
                        <TableCell>{100 - (index * 15)}</TableCell>
                        <TableCell className="text-right">${(1500 - (index * 250)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <div className="mt-4 text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/products">Manage Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities (optional) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Activities</CardTitle>
            <CardDescription>
              Latest actions and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-full">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New customer registered</p>
                  <p className="text-xs text-muted-foreground">John Smith created a new account</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-100 text-green-800 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New order placed</p>
                  <p className="text-xs text-muted-foreground">Order #1234 has been placed</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-800 p-2 rounded-full">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">New subscription started</p>
                  <p className="text-xs text-muted-foreground">Emily Johnson subscribed to monthly Pink Salt delivery</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Product stock alert</p>
                  <p className="text-xs text-muted-foreground">Himalayan Salt Lamp (Large) is running low on stock</p>
                  <p className="text-xs text-muted-foreground">8 hours ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}