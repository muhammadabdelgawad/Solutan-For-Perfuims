import { useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import type { Category } from '@/types/product';
import { Search } from 'lucide-react';

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'perfumes', label: 'Perfumes' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'skincare', label: 'Skincare' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const [search, setSearch] = useState('');
  const activeCategory = categoryParam || 'all';

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="pt-24 md:pt-28 pb-16">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
          {activeCategory === 'all' ? 'All Products' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2">
            {categories.map(c => (
              <button
                key={c.value}
                onClick={() => {
                  if (c.value === 'all') {
                    searchParams.delete('category');
                  } else {
                    searchParams.set('category', c.value);
                  }
                  setSearchParams(searchParams);
                }}
                className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm transition-colors duration-300 active:scale-95 ${
                  activeCategory === c.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No products found. Try a different search or category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
