import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { formatCurrency } from '@/lib/utils';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';

export default function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();

  return (
    <div className="fixed bottom-24 right-8 z-40">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="default" 
            size="icon" 
            className="w-12 h-12 rounded-full shadow-lg bg-accent hover:bg-accent-dark"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-xl font-heading">Your Cart ({itemCount} items)</SheetTitle>
          </SheetHeader>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="font-heading text-lg mb-2">Your cart is empty</h3>
              <p className="text-neutral-brown text-center mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <SheetClose asChild>
                <Button asChild className="bg-accent hover:bg-accent-dark">
                  <a href="#products">Browse Products</a>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 my-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-100 pb-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-heading text-sm font-medium">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-accent"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm text-neutral-brown mb-2">{formatCurrency(item.price)}</div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 text-gray-600 hover:text-accent disabled:opacity-50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-accent"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    onClick={() => clearCart()}
                    className="flex-1"
                  >
                    <span>Clear Cart</span>
                  </Button>
                  <SheetClose asChild>
                    <Button 
                      asChild 
                      className="flex-1 bg-accent hover:bg-accent-dark"
                    >
                      <Link href="/cart">View Cart</Link>
                    </Button>
                  </SheetClose>
                </div>
                
                <SheetClose asChild>
                  <Button 
                    asChild 
                    className="w-full bg-secondary hover:bg-secondary-dark"
                  >
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
