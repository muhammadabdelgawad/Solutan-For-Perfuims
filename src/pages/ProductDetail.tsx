import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="pt-28 pb-16 container text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-accent underline mt-4 inline-block">Back to shop</Link>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-24 md:pt-28 pb-16">
      <div className="container">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={14} /> Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-cream opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center opacity-0 animate-fade-up" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground leading-[1.1]">{product.name}</h1>
            <p className="mt-4 text-2xl text-foreground tabular-nums">${product.price.toFixed(2)}</p>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">{product.description}</p>

            <button
              onClick={handleAdd}
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors duration-300 active:scale-[0.97] w-fit"
            >
              <ShoppingBag size={16} />
              {added ? 'Added to bag' : 'Add to bag'}
            </button>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Shipping</p>
                  <p className="text-foreground">Free standard delivery</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Returns</p>
                  <p className="text-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group opacity-0 animate-fade-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
                  <div className="luxury-card">
                    <div className="aspect-[3/4] overflow-hidden bg-cream">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                  </div>
                  <h3 className="mt-3 font-serif text-lg text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground tabular-nums">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
