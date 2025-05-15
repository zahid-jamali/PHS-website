import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { X, ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import { useCart } from "./CartProvider";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cartItems, subtotal, clearCart } = useCart();
  
  const handleCheckout = () => {
    onOpenChange(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center text-xl">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
          <Separator />
          <SheetDescription>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="h-16 w-16 rounded-full bg-neutral-beige flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-secondary" />
                </div>
                <p className="text-center text-neutral-dark font-medium">Your cart is empty</p>
                <p className="text-center text-sm text-muted-foreground mt-1 mb-6">
                  Add items to your cart to see them here
                </p>
                <Button 
                  onClick={() => onOpenChange(false)} 
                  className="btn-primary"
                  asChild
                >
                  <Link href="/products">
                    Shop Products
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-2">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-neutral-dark">Subtotal</p>
                    <p className="text-base font-medium text-neutral-dark">${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>
                  <div className="grid gap-2">
                    <Button 
                      className="btn-primary"
                      onClick={handleCheckout}
                      asChild
                    >
                      <Link href="/checkout">
                        Checkout
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                      asChild
                    >
                      <Link href="/products">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                  <Button
                    variant="link"
                    className="justify-center text-neutral-dark"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
