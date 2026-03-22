import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-perfume.jpg';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const featured = products.filter(p => p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury perfume on marble"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        <div className="relative container pb-16 md:pb-24 z-10">
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground leading-[1.05] max-w-xl opacity-0 animate-fade-up"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            The Art of Refined Beauty
          </h1>
          <p
            className="mt-4 text-sm md:text-base text-primary-foreground/80 max-w-md font-light leading-relaxed opacity-0 animate-fade-up"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            Discover our curated collection of luxury fragrances and cosmetics, crafted for those who appreciate the finer things.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary-foreground/20 transition-all duration-300 active:scale-[0.97] opacity-0 animate-fade-up"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            Explore Collection <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Curated Selection</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">Featured Pieces</h2>
          </div>
          <Link to="/products" className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['perfumes', 'makeup', 'skincare'] as const).map((cat, i) => {
            const catProduct = products.find(p => p.category === cat);
            return (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: 'forwards' }}
              >
                <img
                  src={catProduct?.imageUrl}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground tracking-wider capitalize">
                    {cat}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
