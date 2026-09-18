import Link from 'next/link';
import styles from '../shop/page.module.css';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { getProducts } from '@/lib/api/products';
import { SortSelect } from '@/components/ui/SortSelect';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Results | Treasure Jewels',
  description: 'Search for bags and accessories.',
};

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : undefined;
  const minPrice = typeof searchParams.minPrice === 'string' ? parseFloat(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseFloat(searchParams.maxPrice) : undefined;
  
  let products = await getProducts({ query, category, sort });
  
  if (minPrice !== undefined && !isNaN(minPrice)) {
    products = products.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    products = products.filter(p => p.price <= maxPrice);
  }

  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className="typography-section-heading">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>
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
                <p className="typography-body-strong">No products found matching your search.</p>
                <Link href="/shop" className={styles.clearFiltersBtn}>View All Products</Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
