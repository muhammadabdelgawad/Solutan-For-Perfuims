import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/products?category=perfumes', label: 'Perfumes' },
    { to: '/products?category=makeup', label: 'Makeup' },
    { to: '/products?category=skincare', label: 'Skincare' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <button className="md:hidden p-2 -ml-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight font-semibold text-foreground">
          سلطان العطور
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-light tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/products" className="text-foreground hover:text-accent transition-colors">
            <Search size={18} />
          </Link>
          <Link to="/cart" className="relative text-foreground hover:text-accent transition-colors">
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            to="/admin"
            className="hidden md:inline text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-light tracking-widest uppercase text-muted-foreground py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-light tracking-widest uppercase text-muted-foreground py-2">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
