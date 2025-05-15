import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { User, ShoppingBag, MapPin, Bell, CreditCard, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/login');
    toast({
      title: 'Authentication Required',
      description: 'Please login to access your account',
      variant: 'destructive',
    });
    return null;
  }

  const menuItems = [
    { 
      label: 'Account Overview', 
      href: '/account', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      label: 'Order History', 
      href: '/account/orders', 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      label: 'Addresses', 
      href: '/account/addresses', 
      icon: <MapPin className="h-5 w-5" /> 
    },
    { 
      label: 'Salt Subscriptions', 
      href: '/account/subscriptions', 
      icon: <CreditCard className="h-5 w-5" /> 
    },
    { 
      label: 'Wishlist', 
      href: '/account/wishlist', 
      icon: <Heart className="h-5 w-5" /> 
    },
    { 
      label: 'Notifications', 
      href: '/account/notifications', 
      icon: <Bell className="h-5 w-5" /> 
    },
    { 
      label: 'Account Settings', 
      href: '/account/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 space-y-6">
          <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14">
                {user?.profileImageUrl ? (
                  <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
                ) : null}
                <AvatarFallback className="bg-primary text-white text-lg">
                  {getInitials(user?.firstName || '', user?.lastName || '')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-heading font-medium text-lg">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <Separator />
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                >
                  <a 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors ${
                      location === item.href ? 'bg-accent/70 text-accent-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </Link>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm font-normal px-3"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Sign Out</span>
              </Button>
            </nav>
          </div>
          
          <div className="bg-secondary/10 p-4 rounded-lg">
            <h3 className="font-medium text-secondary">Need Help?</h3>
            <p className="text-sm mt-2 mb-3">We're here to assist you with your Pink Himalayan Salt needs</p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-[600px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}