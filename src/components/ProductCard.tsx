import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';
import { ShoppingBag } from 'lucide-react';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      className="group opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="luxury-card">
          <div className="aspect-[3/4] overflow-hidden bg-cream">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-medium leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground tabular-nums">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="mt-1 p-2 rounded-sm bg-primary text-primary-foreground hover:bg-accent transition-colors duration-300 active:scale-95"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={14} />
        </button>
      </div>
    </div>
  );
}
