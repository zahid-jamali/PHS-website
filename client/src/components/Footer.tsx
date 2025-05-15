import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-bold text-white">Dr. Abdul <span className="text-accent">PHS</span></span>
            </Link>
            <p className="text-gray-400 mb-6">Premium Pink Himalayan Salt sourced directly from Pakistan, with warehouse and distribution in the USA.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="/#wholesale" className="text-gray-400 hover:text-white transition-colors">Wholesale</a></li>
              <li><a href="/#halotherapy" className="text-gray-400 hover:text-white transition-colors">Halotherapy</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Culinary Salt</a></li>
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Bath & Spa</a></li>
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Salt Lamps</a></li>
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Halotherapy</a></li>
              <li><a href="/#wholesale" className="text-gray-400 hover:text-white transition-colors">Bulk & Wholesale</a></li>
              <li><a href="/#products" className="text-gray-400 hover:text-white transition-colors">Gift Sets</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-3 text-accent" />
                <span className="text-gray-400">USA: 1234 Distribution Ave, Salt Lake City, UT 84104</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-0.5 mr-3 text-accent" />
                <span className="text-gray-400">+1 (800) 555-SALT (7258)</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-0.5 mr-3 text-accent" />
                <span className="text-gray-400">info@drabdulphs.com</span>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 mt-0.5 mr-3 text-accent" />
                <span className="text-gray-400">WhatsApp: +92 300 1234567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Dr. Abdul PHS. All rights reserved.
            </div>
            <div className="flex justify-start md:justify-end space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketplace Integration (Floating Buttons) */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
        <a href="#" className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform" title="Amazon Store">
          <i className="fab fa-amazon text-lg"></i>
        </a>
        <a href="#" className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform" title="eBay Store">
          <i className="fab fa-ebay text-lg"></i>
        </a>
        <a href="https://wa.me/923001234567" className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform" title="WhatsApp Support">
          <i className="fab fa-whatsapp text-xl text-green-500"></i>
        </a>
      </div>
    </footer>
  );
}
