import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Calculate derived values
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (itemToAdd: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(item => item.id === itemToAdd.id);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += itemToAdd.quantity;
        
        toast({
          title: "Cart updated",
          description: `Increased ${itemToAdd.name} quantity to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${itemToAdd.name} added to your cart`,
        });
        
        return [...currentItems, itemToAdd];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your cart`,
        });
      }
      
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
