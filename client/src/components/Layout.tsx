import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';
import ChatInterface from './chat/ChatInterface';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ShoppingCart />
      <ChatInterface />
    </div>
  );
}
