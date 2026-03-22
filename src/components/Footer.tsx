import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-serif text-2xl font-semibold mb-4 text-foreground">LUMIÈRE</h4>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Curated luxury fragrances and cosmetics for the discerning individual.
          </p>
        </div>
        <div>
          <h5 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Shop</h5>
          <div className="flex flex-col gap-2">
            <Link to="/products?category=perfumes" className="text-sm text-foreground hover:text-accent transition-colors">Perfumes</Link>
            <Link to="/products?category=makeup" className="text-sm text-foreground hover:text-accent transition-colors">Makeup</Link>
            <Link to="/products?category=skincare" className="text-sm text-foreground hover:text-accent transition-colors">Skincare</Link>
          </div>
        </div>
        <div>
          <h5 className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Information</h5>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-foreground">Shipping & Returns</span>
            <span className="text-sm text-foreground">Privacy Policy</span>
            <span className="text-sm text-foreground">Contact Us</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground tracking-wider">
          © 2026 LUMIÈRE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
