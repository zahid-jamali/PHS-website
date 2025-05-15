import { Link } from 'wouter';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image w-full h-64 object-cover" 
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-lg font-semibold">{product.name}</h3>
          <span className="bg-primary-light text-accent text-sm py-1 px-3 rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-neutral-brown text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-accent text-lg font-semibold">{formatCurrency(product.price)}</span>
          <Button 
            onClick={handleAddToCart}
            className="bg-accent hover:bg-accent-dark text-white font-accent text-sm py-2 px-4 rounded-md transition-colors"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
