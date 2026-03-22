import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { items, total, placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && !submitted) {
    navigate('/cart');
    return null;
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    placeOrder(form.name, form.phone, form.address);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-28 pb-16 container text-center max-w-md mx-auto">
        <CheckCircle size={48} className="mx-auto text-accent mb-6 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }} />
        <h1 className="font-serif text-3xl text-foreground mb-3 opacity-0 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>Order Confirmed</h1>
        <p className="text-muted-foreground mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Thank you for your purchase. Your order will be delivered via cash on delivery.
        </p>
        <Link to="/products" className="inline-flex px-8 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors active:scale-[0.97]">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-28 pb-16">
      <div className="container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-10 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border-0 text-sm text-foreground rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-secondary border-0 text-sm text-foreground rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Delivery Address</label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-secondary border-0 text-sm text-foreground rounded-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              />
              {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="p-4 bg-cream rounded-sm">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Payment Method</p>
              <p className="text-sm text-foreground">Cash on Delivery</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors active:scale-[0.97]"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </form>

          <div className="md:col-span-2 opacity-0 animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                  <span className="text-muted-foreground tabular-nums">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-serif text-xl text-foreground tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
