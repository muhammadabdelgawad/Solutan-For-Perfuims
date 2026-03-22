import perfume1 from '@/assets/products/perfume-1.jpg';
import perfume2 from '@/assets/products/perfume-2.jpg';
import perfume3 from '@/assets/products/perfume-3.jpg';
import makeup1 from '@/assets/products/makeup-1.jpg';
import makeup2 from '@/assets/products/makeup-2.jpg';
import skincare1 from '@/assets/products/skincare-1.jpg';
import skincare2 from '@/assets/products/skincare-2.jpg';
import skincare3 from '@/assets/products/skincare-3.jpg';
import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Rosé Éternelle',
    description: 'A delicate blend of Damascus rose, peony, and white musk. This timeless fragrance captures the essence of a sunlit garden in full bloom.',
    price: 185,
    imageUrl: perfume1,
    category: 'perfumes',
    featured: true,
  },
  {
    id: '2',
    name: 'Noir Absolu',
    description: 'Rich oud wood, smoky amber, and dark vanilla create an intoxicating evening fragrance for the bold and sophisticated.',
    price: 245,
    imageUrl: perfume2,
    category: 'perfumes',
    featured: true,
  },
  {
    id: '3',
    name: 'Jardin de Fleurs',
    description: 'Fresh rose petals, jasmine, and a hint of bergamot. A romantic floral bouquet that lingers beautifully on the skin.',
    price: 165,
    imageUrl: perfume3,
    category: 'perfumes',
  },
  {
    id: '4',
    name: 'Velvet Rouge Lipstick',
    description: 'A richly pigmented, long-lasting lipstick in a deep burgundy shade. Housed in a rose-gold case of understated luxury.',
    price: 48,
    imageUrl: makeup1,
    category: 'makeup',
    featured: true,
  },
  {
    id: '5',
    name: 'Nude Radiance Palette',
    description: 'Nine harmonious shades from warm nudes to rich coppers. Silky, blendable formulas with a mix of matte and shimmer finishes.',
    price: 72,
    imageUrl: makeup2,
    category: 'makeup',
  },
  {
    id: '6',
    name: 'Crème Luxe Moisturizer',
    description: 'Ultra-rich moisturizer with 24K gold-infused formula. Deeply nourishes and leaves skin with a luminous, youthful glow.',
    price: 128,
    imageUrl: skincare1,
    category: 'skincare',
    featured: true,
  },
  {
    id: '7',
    name: 'Sérum Éclat',
    description: 'A lightweight hyaluronic acid serum with vitamin C. Brightens, plumps, and protects for visibly radiant skin in days.',
    price: 96,
    imageUrl: skincare2,
    category: 'skincare',
  },
  {
    id: '8',
    name: 'Hydra-Silk Face Cream',
    description: 'Silky face cream enriched with natural botanicals and peptides. Smooths fine lines while delivering all-day hydration.',
    price: 84,
    imageUrl: skincare3,
    category: 'skincare',
  },
];
