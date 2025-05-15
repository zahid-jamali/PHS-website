import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User, ShoppingCart, Menu, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../cart/CartProvider";
import { useAuth } from "@/context/AuthContext";
import Logo from "../ui/Logo";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../i18n/LanguageSwitcher";

export default function Navbar() {
  const [location] = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Check if window is scrolled to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get translation function
  const { t } = useTranslation();
  
  // Main navigation links
  const mainNavLinks = [
    { href: "/", label: t('navbar.home') },
    { href: "/about", label: t('navbar.about') },
    { href: "/blog", label: t('navbar.blog') },
    { href: "/research", label: t('navbar.research') },
  ];

  // Product category dropdown links
  const productLinks = [
    { href: "/products", label: t('navbar.allProducts') },
    { href: "/salt-lamps", label: t('navbar.saltLamps') },
    { href: "/salt-bricks", label: t('navbar.saltBricks') },
    { href: "/spa-massage", label: t('navbar.spaMassage') },
    { href: "/halotherapy", label: t('navbar.halotherapy') },
    { href: "/flavor-matcher", label: t('navbar.flavorMatcher') },
  ];
  
  // Marketplace dropdown links
  const marketplaceLinks = [
    { href: "/amazon", label: t('navbar.amazonStore') },
    { href: "/shopify", label: t('navbar.shopifyStore') },
    { href: "/marketplaces", label: t('navbar.allMarketplaces') },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-secondary text-white py-2 text-center text-sm font-accent">
        <div className="container mx-auto">
          {t('navbar.announcement')}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center py-2">
              <Logo size="md" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Home Link */}
              <Link 
                href="/" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === '/' ? "text-secondary" : ""
                }`}
              >
                {t('navbar.home')}
              </Link>
              
              {/* About Link */}
              <Link 
                href="/about" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === '/about' ? "text-secondary" : ""
                }`}
              >
                {t('navbar.about')}
              </Link>
              
              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center text-sm font-medium font-accent ${
                    ['/products', '/salt-lamps', '/salt-bricks', '/spa-massage', '/halotherapy'].includes(location) 
                      ? 'text-secondary' : 'text-neutral-dark hover:text-secondary'
                  }`}>
                    {t('navbar.products')} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-52 p-1">
                  {productLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild className="py-2">
                      <Link
                        href={link.href}
                        className={`w-full cursor-pointer ${
                          location === link.href ? 'text-secondary font-medium' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Wholesale Link */}
              <Link 
                href="/wholesale" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === "/wholesale" ? "text-secondary" : ""
                }`}
              >
                {t('navbar.wholesale')}
              </Link>
              
              {/* Marketplaces Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center text-sm font-medium font-accent ${
                    ['/marketplaces', '/amazon', '/shopify'].includes(location) 
                      ? 'text-secondary' : 'text-neutral-dark hover:text-secondary'
                  }`}>
                    {t('navbar.marketplaces')} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-52 p-1">
                  {marketplaceLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild className="py-2">
                      <Link
                        href={link.href}
                        className={`w-full cursor-pointer ${
                          location === link.href ? 'text-secondary font-medium' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Blog Link */}
              <Link 
                href="/blog" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === '/blog' ? "text-secondary" : ""
                }`}
              >
                {t('navbar.blog')}
              </Link>
              
              {/* Research Link */}
              <Link 
                href="/research" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === '/research' ? "text-secondary" : ""
                }`}
              >
                {t('navbar.research')}
              </Link>
              
              {/* Contact Link */}
              <Link 
                href="/contact" 
                className={`text-neutral-dark hover:text-secondary font-accent text-sm font-medium ${
                  location === '/contact' ? "text-secondary" : ""
                }`}
              >
                {t('navbar.contact')}
              </Link>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              <Button variant="ghost" size="icon">
                <Link 
                  href="/search" 
                  className="text-neutral-dark hover:text-secondary"
                >
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAuthenticated ? (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {user?.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          {t('navbar.myAccount')}
                        </Link>
                      </DropdownMenuItem>
                      
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              {t('navbar.adminDashboard')}
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => logout()}
                        className="cursor-pointer text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('navbar.signOut')}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login" className="cursor-pointer">
                          {t('navbar.signIn')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register" className="cursor-pointer">
                          {t('navbar.createAccount')}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-white h-5 w-5 flex items-center justify-center p-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4">
                    <div className="py-4 mb-4 border-b flex justify-between items-center">
                      <Logo size="sm" iconOnly={true} />
                      <LanguageSwitcher />
                    </div>
                    {/* Home Link */}
                    <Link 
                      href="/" 
                      className={`text-lg font-medium ${
                        location === '/' ? "text-secondary" : "text-neutral-dark"
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('navbar.home')}
                    </Link>
                    
                    {/* About Link */}
                    <Link 
                      href="/about" 
                      className={`text-lg font-medium ${
                        location === '/about' ? "text-secondary" : "text-neutral-dark"
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t('navbar.about')}
                    </Link>
                    
                    {/* Mobile Products Section */}
                    <div className="pt-2 mt-2 border-t">
                      <h3 className="text-sm uppercase text-gray-500 font-semibold mb-3">{t('navbar.products')}</h3>
                      {productLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href}
                          className={`block py-2 text-lg font-medium ${
                            location === link.href ? "text-secondary" : "text-neutral-dark"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Wholesale Link */}
                    <div className="pt-2 pb-1">
                      <Link 
                        href="/wholesale" 
                        className={`block py-2 text-lg font-medium ${
                          location === "/wholesale" ? "text-secondary" : "text-neutral-dark"
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {t('navbar.wholesale')}
                      </Link>
                    </div>
                    
                    {/* Mobile Marketplaces Section */}
                    <div className="pt-2 mt-2 border-t">
                      <h3 className="text-sm uppercase text-gray-500 font-semibold mb-3">{t('navbar.marketplaces')}</h3>
                      {marketplaceLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          href={link.href}
                          className={`block py-2 text-lg font-medium ${
                            location === link.href ? "text-secondary" : "text-neutral-dark"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Blog Link */}
                    <div className="pt-2 mt-2 border-t">
                      <Link 
                        href="/blog" 
                        className={`block py-2 text-lg font-medium ${
                          location === '/blog' ? "text-secondary" : "text-neutral-dark"
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {t('navbar.blog')}
                      </Link>
                    </div>
                    
                    {/* Research Link */}
                    <div>
                      <Link 
                        href="/research" 
                        className={`block py-2 text-lg font-medium ${
                          location === '/research' ? "text-secondary" : "text-neutral-dark"
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {t('navbar.research')}
                      </Link>
                    </div>
                    
                    {/* Contact Link */}
                    <div className="pt-2 mt-2 border-t">
                      <Link 
                        href="/contact" 
                        className={`block py-2 text-lg font-medium ${
                          location === '/contact' ? "text-secondary" : "text-neutral-dark"
                        }`}
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {t('navbar.contact')}
                      </Link>
                    </div>
                    
                    {/* Admin Section (Only visible to admin users) */}
                    {isAdmin && (
                      <div className="pt-2 mt-2 border-t">
                        <h3 className="text-sm uppercase text-gray-500 font-semibold mb-3">{t('navbar.admin')}</h3>
                        <Link 
                          href="/admin"
                          className={`block py-2 text-lg font-medium ${
                            location === "/admin" ? "text-secondary" : "text-neutral-dark"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {t('navbar.dashboard')}
                        </Link>
                        <Link 
                          href="/admin/products"
                          className={`block py-2 text-lg font-medium ${
                            location === "/admin/products" ? "text-secondary" : "text-neutral-dark"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {t('navbar.products')}
                        </Link>
                        <Link 
                          href="/admin/reviews"
                          className={`block py-2 text-lg font-medium ${
                            location === "/admin/reviews" ? "text-secondary" : "text-neutral-dark"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {t('navbar.reviews')}
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
