import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const [promoCode, setPromoCode] = useState("");
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-neutral-offwhite rounded-lg">
          <div className="max-w-md mx-auto">
            <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
            <h2 className="font-heading text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-neutral-brown mb-8">
              It looks like you haven't added any products to your cart yet.
              Browse our premium Pink Himalayan Salt products and find something you'll love.
            </p>
            <Button asChild className="bg-accent hover:bg-accent-dark">
              <a href="/#products">Browse Products</a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-offwhite">
                  <tr>
                    <th className="text-left p-4 font-accent">Product</th>
                    <th className="text-center p-4 font-accent">Quantity</th>
                    <th className="text-right p-4 font-accent">Price</th>
                    <th className="text-right p-4 font-accent w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-heading font-medium">{item.name}</h3>
                            <p className="text-sm text-neutral-brown">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 text-gray-500 hover:text-accent disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-3 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-gray-500 hover:text-accent"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-accent"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <a href="/#products">Continue Shopping</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-brown">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-brown">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-neutral-brown">
                    Free shipping on orders over $100
                  </div>
                )}
              </div>

              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between font-accent text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
                <Button asChild className="w-full bg-accent hover:bg-accent-dark">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>

              <div className="mt-6 text-sm text-neutral-brown">
                <div className="flex items-center justify-center mb-2">
                  <i className="fas fa-lock mr-2"></i>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <i className="fab fa-cc-visa text-lg"></i>
                  <i className="fab fa-cc-mastercard text-lg"></i>
                  <i className="fab fa-cc-amex text-lg"></i>
                  <i className="fab fa-cc-paypal text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
