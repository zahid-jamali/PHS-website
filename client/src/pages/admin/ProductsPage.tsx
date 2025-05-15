import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  ArrowUpDown,
  Loader2,
} from 'lucide-react';
import { Product } from '@shared/schema';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const itemsPerPage = 10;

  // Fetch products
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', categoryFilter, stockFilter, sortBy],
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (productId: number) => {
      return await apiRequest('DELETE', `/api/admin/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: 'Product deleted',
        description: 'The product has been successfully deleted.',
      });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete the product. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (productIds: number[]) => {
      return await apiRequest('POST', '/api/admin/products/bulk-delete', { ids: productIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: 'Products deleted',
        description: `${selectedProducts.length} products have been successfully deleted.`,
      });
      setSelectedProducts([]);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete products. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Handle product selection
  const toggleProductSelection = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
  };

  // Filter and sort products
  const filteredProducts = products
    ? products
        .filter(product => {
          const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
          
          const matchesStock = stockFilter === 'all' || 
            (stockFilter === 'in-stock' && product.quantity > 0) ||
            (stockFilter === 'low-stock' && product.quantity > 0 && product.quantity < 10) ||
            (stockFilter === 'out-of-stock' && product.quantity === 0);
          
          return matchesSearch && matchesCategory && matchesStock;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'created-asc':
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'created-desc':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
              return 0;
          }
        })
    : [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique categories for filter
  const categories = products
    ? Array.from(new Set(products.map(product => product.category)))
    : [];

  // Handle delete dialog
  const openDeleteDialog = (productId: number) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading products...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Products Management | Dr. Abdul PHS Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and listings
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Link>
          </Button>
        </div>

        {/* Filters and search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={stockFilter}
                  onValueChange={setStockFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock Status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="created-desc">Newest First</SelectItem>
                    <SelectItem value="created-asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Product Inventory</CardTitle>
              {selectedProducts.length > 0 && (
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => bulkDeleteMutation.mutate(selectedProducts)}
                  disabled={bulkDeleteMutation.isPending}
                >
                  {bulkDeleteMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete Selected ({selectedProducts.length})
                </Button>
              )}
            </div>
            <CardDescription>
              {filteredProducts.length} products found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox 
                        checked={
                          filteredProducts.length > 0 && 
                          selectedProducts.length === filteredProducts.length
                        }
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        No products found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                            aria-label={`Select ${product.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                            {product.imageUrl ? (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                No image
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              SKU: {product.sku || 'N/A'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={
                              product.quantity === 0
                                ? 'destructive'
                                : product.quantity < 10
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {product.quantity === 0
                              ? 'Out of stock'
                              : product.quantity < 10
                              ? 'Low stock'
                              : 'In stock'}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            {product.quantity} units
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/products/${product.slug}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Product
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/duplicate`}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => openDeleteDialog(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Product
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      
                      // Show first, last, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              isActive={pageNumber === currentPage}
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Show ellipsis where needed
                      if (
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (productToDelete) {
                  deleteMutation.mutate(productToDelete);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}