'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SortSelect.module.css';

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || '';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set('sort', e.target.value);
    } else {
      params.delete('sort');
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort" className={styles.sortLabel}>Sort by:</label>
      <select 
        id="sort" 
        className={styles.sortSelect} 
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="">Featured</option>
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
