import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-neutral-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6 py-2 border-b border-gray-700 pb-4">
              <Logo variant="light" size="md" />
            </div>
            <p className="mb-6 text-gray-300">
              Premium Pink Himalayan Salt sourced directly from Pakistan and delivered worldwide. 
              Quality, purity, and service are our commitments.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Products</Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-gray-300 hover:text-white transition duration-300">Wholesale</Link>
              </li>
              <li>
                <Link href="/halotherapy" className="text-gray-300 hover:text-white transition duration-300">Halotherapy</Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-300 hover:text-white transition duration-300">Research</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition duration-300">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition duration-300">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition duration-300">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition duration-300">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">Newsletter</h4>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for exclusive offers, salt therapy tips, and product updates.
            </p>
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <Input
                  type="email" 
                  placeholder="Your email address" 
                  className="rounded-r-none focus:ring-0 text-neutral-dark"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary-dark text-white font-accent text-sm font-semibold rounded-l-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </div>
            </form>
            <div className="flex items-center space-x-2">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-visa-3-226460.png" alt="Visa" className="h-6" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-3-226462.png" alt="Mastercard" className="h-6" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-american-express-51-675784.png" alt="American Express" className="h-6" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-paypal-54-675727.png" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Dr. Abdul PHS. All rights reserved. Pink Himalayan Salt directly from Pakistan.
          </p>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <Link href="#" className="fixed bottom-8 right-8 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-300" aria-label="Back to top">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Link>
    </footer>
  );
}
