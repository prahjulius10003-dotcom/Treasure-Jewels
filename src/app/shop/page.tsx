import styles from './page.module.css';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';

// Reusing mock data for now
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
  {
    id: 5,
    name: 'Executive Laptop Bag',
    category: 'Work Bags',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    name: 'Quilted Chain Shoulder Bag',
    category: 'Shoulder Bags',
    price: 290,
    originalPrice: 350,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    badge: 'Sale',
  }
];

export default function ShopPage() {
  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className="typography-section-heading">All Bags</h1>
      </header>
      <div className={styles.shopLayout}>
        <aside className={styles.sidebar}>
          <FilterSidebar />
        </aside>
        <main className={styles.mainGrid}>
          <div className={styles.toolbar}>
            <span className="typography-body-strong">{MOCK_PRODUCTS.length} Bags Found</span>
          </div>
          <div className={styles.grid}>
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
        </main>
      </div>
    </div>
  );
}
