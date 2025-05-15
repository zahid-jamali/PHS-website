import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const [location] = useLocation();
  const { t } = useTranslation();

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { text: t('navbar.home'), href: '/' },
    { text: t('navbar.about'), href: '/#about' },
    { text: t('navbar.products'), href: '/#products' },
    { text: t('navbar.wholesale'), href: '/#wholesale' },
    { text: 'Halotherapy', href: '/#halotherapy' },
    { text: 'Blog', href: '/blog' },
    { text: t('navbar.contact'), href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-heading text-2xl font-bold text-secondary">Dr. Abdul <span className="text-accent">PHS</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-accent text-neutral-charcoal hover:text-accent transition-colors ${isActive(link.href) ? 'text-accent' : ''}`}
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:w-72">
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-xl font-bold text-secondary">Dr. Abdul <span className="text-accent">PHS</span></span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className={`font-accent text-neutral-charcoal hover:text-accent transition-colors py-2 ${isActive(link.href) ? 'text-accent' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Shopping Cart, Account & Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
