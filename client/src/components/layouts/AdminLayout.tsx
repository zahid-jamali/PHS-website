import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  MessageSquare,
  Package,
  Star,
  Settings,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
  badge?: string;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { t } = useTranslation();
  const [location] = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: t("admin.nav.dashboard"),
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: t("admin.nav.products"),
      href: "/admin/products",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: t("admin.nav.orders"),
      href: "/admin/orders",
      icon: <Package className="h-5 w-5" />,
      badge: "3",
    },
    {
      title: t("admin.nav.customers"),
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("admin.nav.reviews"),
      href: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
      badge: "5",
    },
    {
      title: t("admin.nav.messages"),
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "2",
    },
    {
      title: t("admin.nav.settings"),
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  // Mobile sidebar
  const MobileSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex h-full flex-col overflow-y-auto pt-6">
          <div className="px-3 mb-6">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold">
                {t("admin.title")}
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex-1 px-3">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive(item.href) && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                    {item.badge && (
                      <Badge variant="default" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Link href="/admin" className="font-bold text-lg">
              {t("admin.title")}
            </Link>
          </div>
          <div className="mt-3 flex-grow flex flex-col px-3">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive(item.href) && "bg-primary text-primary-foreground"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    {item.badge && (
                      <Badge variant="default" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 flex h-16 flex-shrink-0 items-center">
          <div className="flex-1 flex justify-between px-4 md:px-6">
            <div className="flex-1 flex items-center">
              <MobileSidebar />
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl} alt={`${user?.firstName} ${user?.lastName}` || ""} />
                      <AvatarFallback>
                        {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-medium">
                      {user?.firstName || user?.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile">{t("admin.nav.profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">{t("admin.nav.settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/logout" className="text-red-500 flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("auth.logout")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}