import styles from '../shop/page.module.css'; // Reusing shop grid styles
import { ProductCard } from '@/components/ui/ProductCard';

export default function WishlistPage() {
  const wishlistItems = [
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

  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className="typography-section-heading">Wishlist</h1>
      </header>
      <div className={styles.shopLayout}>
        <main className={styles.mainGrid}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p className="typography-body">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {wishlistItems.map((product) => (
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
          )}
        </main>
      </div>
    </div>
  );
}
