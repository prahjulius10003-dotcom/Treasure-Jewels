'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterSidebar.module.css';

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || 'All';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);

  const categories = ['All', 'Tote Bags', 'Crossbody Bags', 'Travel Bags', 'Beach Bags', 'Work Bags', 'Shoulder Bags'];

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    // reset pagination if it existed
    params.delete('page');
    router.push(`/shop?${params.toString()}`);
  };

  const handleApplyPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    params.delete('page');
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className="typography-body-strong">Categories</h3>
        <ul className={styles.list}>
          {categories.map((cat, i) => (
            <li key={i} className={styles.listItem}>
              <a 
                href="#" 
                className={currentCategory === cat ? styles.linkActive : styles.link}
                onClick={(e) => handleCategoryClick(e, cat)}
              >
                {cat === 'All' ? 'All Bags' : cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className="typography-body-strong">Price</h3>
        <div className={styles.priceInputs}>
          <input 
            type="number" 
            placeholder="Min" 
            className={styles.input} 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            className={styles.input} 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button className={styles.applyBtn} onClick={handleApplyPrice}>Apply</button>
      </div>
    </div>
  );
}
