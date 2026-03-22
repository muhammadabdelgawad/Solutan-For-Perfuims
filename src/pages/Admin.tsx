import { useState } from 'react';
import { products as seedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import type { Product, Category } from '@/types/product';
import { Trash2, Plus, Package, ClipboardList } from 'lucide-react';

type Tab = 'products' | 'orders';

export default function Admin() {
  const { orders } = useCart();
  const [tab, setTab] = useState<Tab>('products');
  const [productList, setProductList] = useState<Product[]>(seedProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProduct: Omit<Product, 'id'> = { name: '', description: '', price: 0, imageUrl: '', category: 'perfumes' };
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      setProductList(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setProductList(prev => [...prev, { ...form, id: crypto.randomUUID() }]);
    }
    setForm(emptyProduct);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (p: Product) => {
    setForm({ name: p.name, description: p.description, price: p.price, imageUrl: p.imageUrl, category: p.category });
    setEditing(p);
    setShowForm(true);
  };

  return (
    <main className="pt-24 md:pt-28 pb-16">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          Admin Dashboard
        </h1>

        <div className="flex gap-2 mb-8">
          {(['products', 'orders'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-colors active:scale-95 ${
                tab === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {t === 'products' ? <Package size={14} /> : <ClipboardList size={14} />}
              {t}
            </button>
          ))}
        </div>

        {tab === 'products' && (
          <div>
            <button
              onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyProduct); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground text-xs tracking-widest uppercase mb-6 hover:opacity-90 transition-opacity active:scale-95"
            >
              <Plus size={14} /> Add Product
            </button>

            {showForm && (
              <div className="bg-card border border-border rounded-sm p-6 mb-8 max-w-lg space-y-4 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
                <input placeholder="Product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-secondary text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 bg-secondary text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Price" value={form.price || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-secondary text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })} className="w-full px-4 py-2.5 bg-secondary text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-ring">
                    <option value="perfumes">Perfumes</option>
                    <option value="makeup">Makeup</option>
                    <option value="skincare">Skincare</option>
                  </select>
                </div>
                <input placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-2.5 bg-secondary text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-6 py-2.5 bg-primary text-primary-foreground text-xs tracking-widest uppercase active:scale-95">
                    {editing ? 'Update' : 'Add'}
                  </button>
                  <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2.5 bg-secondary text-secondary-foreground text-xs tracking-widest uppercase active:scale-95">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">Product</th>
                    <th className="pb-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">Category</th>
                    <th className="pb-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">Price</th>
                    <th className="pb-3 text-xs tracking-widest uppercase text-muted-foreground font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(p => (
                    <tr key={p.id} className="border-b border-border">
                      <td className="py-4 text-foreground">{p.name}</td>
                      <td className="py-4 text-muted-foreground capitalize">{p.category}</td>
                      <td className="py-4 text-foreground tabular-nums">${p.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="text-xs tracking-wider uppercase text-accent hover:underline">Edit</button>
                          <button onClick={() => setProductList(prev => prev.filter(x => x.id !== p.id))} className="text-destructive hover:opacity-70"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">No orders yet.</p>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-card border border-border rounded-sm p-6">
                    <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground tracking-wider">Order #{order.id.slice(0, 8)}</p>
                        <p className="font-serif text-lg text-foreground">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-xl text-foreground tabular-nums">${order.total.toFixed(2)}</p>
                        <p className="text-xs tracking-widest uppercase text-accent mt-1">{order.status}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3 space-y-1">
                      {order.items.map(item => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                          <span className="text-muted-foreground tabular-nums">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
