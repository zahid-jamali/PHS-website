import { ReactNode } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Menu, ShoppingCart, LogIn, LogOut, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";

// Language options for the language switcher
const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
];

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { t, i18n } = useTranslation("navigation");
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Set document direction for RTL languages
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{t("mobile_menu.title")}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/">
                    <a className="text-foreground hover:text-primary">{t("home")}</a>
                  </Link>
                  <Link href="/products">
                    <a className="text-foreground hover:text-primary">{t("products")}</a>
                  </Link>
                  <Link href="/about">
                    <a className="text-foreground hover:text-primary">{t("about")}</a>
                  </Link>
                  <Link href="/wholesale">
                    <a className="text-foreground hover:text-primary">{t("wholesale")}</a>
                  </Link>
                  <Link href="/contact">
                    <a className="text-foreground hover:text-primary">{t("contact")}</a>
                  </Link>
                  <Link href="/flavor-matcher">
                    <a className="text-foreground hover:text-primary">{t("flavor_matcher")}</a>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center space-x-2">
                <span className="font-bold text-xl whitespace-nowrap">Dr. Abdul PHS</span>
              </a>
            </Link>
            
            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-6 mx-6">
              <Link href="/">
                <a className="text-foreground hover:text-primary transition-colors">{t("home")}</a>
              </Link>
              <Link href="/products">
                <a className="text-foreground hover:text-primary transition-colors">{t("products")}</a>
              </Link>
              <Link href="/about">
                <a className="text-foreground hover:text-primary transition-colors">{t("about")}</a>
              </Link>
              <Link href="/wholesale">
                <a className="text-foreground hover:text-primary transition-colors">{t("wholesale")}</a>
              </Link>
              <Link href="/contact">
                <a className="text-foreground hover:text-primary transition-colors">{t("contact")}</a>
              </Link>
              <Link href="/flavor-matcher">
                <a className="text-foreground hover:text-primary transition-colors">{t("flavor_matcher")}</a>
              </Link>
            </nav>
          </div>
          
          {/* Right side controls: theme, language, cart, auth */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t("language_switcher")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={i18n.language === lang.code ? "bg-muted" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Cart */}
            <Link href="/cart">
              <a>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">{t("cart")}</span>
                </Button>
              </a>
            </Link>
            
            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-1">
                <Link href="/account">
                  <a>
                    <Button variant="ghost" size="sm">
                      {t("account")}
                    </Button>
                  </a>
                </Link>
                <a href="/api/logout">
                  <Button variant="ghost" size="icon">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">{t("logout")}</span>
                  </Button>
                </a>
              </div>
            ) : (
              <a href="/api/login">
                <Button variant="outline" className="hidden sm:flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("login")}
                </Button>
              </a>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.company")}</h3>
              <p className="text-muted-foreground">
                Dr. Abdul PHS<br />
                187 Country Club Drive, Apt #8<br />
                South San Francisco, CA 94080<br />
                USA
              </p>
              <p className="text-muted-foreground mt-2">
                +1 (925) 448-7591
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("about")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("products")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("wholesale")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("contact")}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.policies")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("footer.privacy_policy")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("footer.terms_of_service")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("footer.shipping_policy")}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy">
                    <a className="text-muted-foreground hover:text-foreground transition-colors">
                      {t("footer.return_policy")}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.newsletter")}</h3>
              <p className="text-muted-foreground mb-4">{t("footer.newsletter_prompt")}</p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder={t("footer.email_placeholder")}
                  className="px-3 py-2 bg-background border rounded-md flex-1"
                  required
                />
                <Button type="submit">
                  {t("footer.subscribe")}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Dr. Abdul PHS. {t("footer.all_rights_reserved")}
            </p>
            {/* Social Media */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}