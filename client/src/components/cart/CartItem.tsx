import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem as CartItemType } from './CartProvider';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-neutral-dark">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full" 
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-gray-700 mx-1">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleRemove} className="text-secondary">
            <Trash2 className="h-4 w-4 mr-1" />
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
