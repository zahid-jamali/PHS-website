import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  Settings, 
  Bell, 
  CreditCard, 
  Star, 
  Clipboard,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/login');
    toast({
      title: 'Authentication Required',
      description: 'Please login to access the admin dashboard',
      variant: 'destructive',
    });
    return null;
  }

  // Check if user is admin
  if (user?.role !== 'admin') {
    navigate('/');
    toast({
      title: 'Access Denied',
      description: 'You do not have permission to access the admin dashboard',
      variant: 'destructive',
    });
    return null;
  }

  const menuItems = [
    { 
      label: 'Dashboard', 
      href: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      label: 'Products', 
      href: '/admin/products', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      label: 'Orders', 
      href: '/admin/orders', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      label: 'Customers', 
      href: '/admin/customers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      label: 'Subscriptions', 
      href: '/admin/subscriptions', 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      label: 'Reviews', 
      href: '/admin/reviews', 
      icon: <Star className="h-5 w-5" /> 
    },
    { 
      label: 'Messages', 
      href: '/admin/messages', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      label: 'Inquiries', 
      href: '/admin/inquiries', 
      icon: <Clipboard className="h-5 w-5" /> 
    },
    { 
      label: 'Notifications', 
      href: '/admin/notifications', 
      icon: <Bell className="h-5 w-5" /> 
    },
    { 
      label: 'Settings', 
      href: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Format current date
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="flex flex-col h-full">
                  <div className="p-4 flex items-center justify-between border-b">
                    <div className="font-semibold text-xl">Admin Dashboard</div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="px-2 py-4 overflow-auto">
                    <nav className="space-y-1">
                      {menuItems.map((item) => (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <a 
                            className={`flex items-center pl-3 pr-2 py-2.5 text-sm rounded-md ${
                              location === item.href 
                                ? 'bg-primary text-primary-foreground font-medium' 
                                : 'text-muted-foreground hover:bg-muted'
                            }`}
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <div className="font-heading text-2xl font-bold hidden sm:block">
              <Link href="/admin">
                <a className="flex items-center">
                  <span className="text-primary">Admin</span>
                  <span className="text-muted-foreground ml-1">Panel</span>
                </a>
              </Link>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground hidden md:block">
            {formatDate()}
          </div>
          
          {/* User dropdown */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 relative h-8 overflow-hidden rounded-full"
                >
                  <Avatar>
                    {user.profileImageUrl ? (
                      <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
                    ) : null}
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <a className="flex cursor-pointer w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Settings
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <a className="flex cursor-pointer w-full">
                      <Package className="mr-2 h-4 w-4" />
                      View Store
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r bg-white">
          <div className="p-6">
            <h2 className="text-lg font-medium">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your store</p>
          </div>
          <nav className="flex-1 px-4 pb-6 pt-2">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
              >
                <a 
                  className={`flex items-center py-2.5 px-3 mb-1 rounded-md ${
                    location === item.href 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}