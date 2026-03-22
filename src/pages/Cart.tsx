import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-28 pb-16 container text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-6" />
        <h1 className="font-serif text-3xl text-foreground mb-3">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Discover our collection and find something you love.</p>
        <Link to="/products" className="inline-flex px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors active:scale-[0.97]">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-28 pb-16">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-10 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          Shopping Bag
        </h1>

        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={item.product.id}
              className="flex gap-4 md:gap-6 pb-6 border-b border-border opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <Link to={`/product/${item.product.id}`} className="w-20 md:w-28 aspect-[3/4] rounded-sm overflow-hidden bg-cream shrink-0">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground tracking-wider uppercase mt-0.5">{item.product.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-foreground p-1 active:scale-95">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 border border-border rounded-sm">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-muted active:scale-95"><Minus size={12} /></button>
                    <span className="text-sm tabular-nums w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-muted active:scale-95"><Plus size={12} /></button>
                  </div>
                  <p className="text-sm tabular-nums text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground tracking-wider uppercase">Total</span>
            <span className="font-serif text-2xl text-foreground tabular-nums">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block w-full text-center px-8 py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors active:scale-[0.97]">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
