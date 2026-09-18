'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import styles from './SearchInput.module.css';
import { getProducts, Product } from '@/lib/api/products';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      const data = await getProducts({ query });
      setResults(data);
      setIsLoading(false);
      setIsOpen(true);
    };

    const debounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleResultClick = (id: number) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/product/${id}`);
  };

  return (
    <div className={styles.searchWrapper} ref={wrapperRef}>
      <div className={styles.inputContainer}>
        <Search className={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (query.trim()) setIsOpen(true); }}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.loading}>Searching...</div>
          ) : results.length > 0 ? (
            <ul className={styles.resultList}>
              {results.slice(0, 5).map((product) => (
                <li key={product.id} className={styles.resultItem} onClick={() => handleResultClick(product.id)}>
                  <img src={product.imageUrl} alt={product.name} className={styles.resultImage} />
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{product.name}</span>
                    <span className={styles.resultCategory}>{product.category}</span>
                  </div>
                </li>
              ))}
              {results.length > 5 && (
                <li className={styles.viewAll} onClick={() => {
                  setIsOpen(false);
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                }}>
                  View all results
                </li>
              )}
            </ul>
          ) : (
            <div className={styles.empty}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
