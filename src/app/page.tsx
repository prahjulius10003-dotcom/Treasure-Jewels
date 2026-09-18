import styles from './page.module.css';
import { CampaignTile } from '@/components/ui/CampaignTile';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Treasure Jewels | Premium Bags & Accessories',
  description: 'Shop our latest collection of premium bags. Designed for your everyday adventures.',
  openGraph: {
    images: ['https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&q=80&w=1600'],
  }
};

export default function Home() {
  const MOCK_PRODUCTS = [
    {
      id: 1,
      name: 'Classic Leather Tote',
      category: 'Tote Bags',
      price: 350,
      originalPrice: 420,
      imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      badge: 'Bestseller',
    },
    {
      id: 2,
      name: 'Mini Crossbody Bag',
      category: 'Crossbody Bags',
      price: 180,
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
      badge: 'New',
    },
    {
      id: 3,
      name: 'Weekend Travel Duffel',
      category: 'Travel Bags',
      price: 420,
      originalPrice: 500,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      badge: 'Sale',
    },
    {
      id: 4,
      name: 'Woven Straw Beach Bag',
      category: 'Beach Bags',
      price: 120,
      imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
      badge: 'New',
    },
  ];

  return (
    <div className={styles.page}>
      <CampaignTile
        headline="New Horizons"
        imageUrl="https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&q=80&w=1600"
        ctaText="Shop The Collection"
        ctaHref="/shop"
        headlineColor="light"
      />

      <section>
        <div className={styles.sectionTitle}>
          <h2 className="typography-section-heading">Featured Bags</h2>
        </div>
        <div className={styles.productGrid}>
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              badge={product.badge}
              href={`/product/${product.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
