import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

type Category = 'all' | 'culinary' | 'bath' | 'lamps' | 'therapy' | 'wholesale';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    staleTime: 60000, // 1 minute
  });

  // Filter products by category
  const filteredProducts = !products 
    ? [] 
    : activeCategory === 'all' 
      ? products 
      : products.filter((product: Product) => 
          product.category.toLowerCase() === activeCategory
        );

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'culinary', name: 'Culinary Salt' },
    { id: 'bath', name: 'Bath & Spa' },
    { id: 'lamps', name: 'Salt Lamps' },
    { id: 'therapy', name: 'Halotherapy' },
    { id: 'wholesale', name: 'Bulk & Wholesale' },
  ];

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Our Premium Products</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-lg text-neutral-brown">
            Discover our range of premium Pink Himalayan Salt products, sourced directly from Pakistan and processed to the highest standards.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-6 space-x-4 mb-12">
          {categories.map((category) => (
            <Button 
              key={category.id}
              onClick={() => setActiveCategory(category.id as Category)}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={`whitespace-nowrap ${
                activeCategory === category.id 
                  ? 'bg-primary text-neutral-charcoal' 
                  : 'bg-neutral-offwhite hover:bg-primary text-neutral-charcoal'
              } font-accent py-2 px-6 rounded-full transition-colors`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <span className="loading">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading products. Please try again later.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                asChild
                variant="ghost" 
                className="inline-flex items-center font-accent font-medium text-accent hover:text-accent-dark transition-colors"
              >
                <a href="/products">
                  View All Products <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
