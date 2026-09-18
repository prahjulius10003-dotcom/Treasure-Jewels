import Link from 'next/link';
import styles from './page.module.css';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { getProducts } from '@/lib/api/products';
import { SortSelect } from '@/components/ui/SortSelect';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Bags | Treasure Jewels',
  description: 'Browse our collection of premium leather totes, crossbody bags, and travel duffels.',
};

// Define the shape of search params
export default async function ShopPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;
  const minPrice = typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined;
  
  // Fetch products via our mock API
  let products = await getProducts({ category, sort });
  
  if (minPrice !== undefined && !isNaN(minPrice)) {
    products = products.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    products = products.filter(p => p.price <= maxPrice);
  }

  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className="typography-section-heading">{category === 'All' || !category ? 'All Bags' : category}</h1>
      </header>
      <div className={styles.shopLayout}>
        <aside className={styles.sidebar}>
          <FilterSidebar />
        </aside>
        <main className={styles.mainGrid}>
          <div className={styles.toolbar}>
            <span className="typography-body-strong">{products.length} Bags Found</span>
            <SortSelect />
          </div>
          <div className={styles.grid}>
            {products.length > 0 ? (
              products.map((product) => (
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
              ))
            ) : (
              <div className={styles.emptyState}>
                <p className="typography-body-strong">No products found matching your criteria.</p>
                <Link href="/shop" className={styles.clearFiltersBtn}>Clear Filters</Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
