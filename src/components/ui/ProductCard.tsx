import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  badge?: string;
  href?: string;
}

export function ProductCard({
  name,
  category,
  price,
  originalPrice,
  imageUrl,
  badge,
  href,
}: ProductCardProps) {
  const content = (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {badge && <div className={styles.badge}>{badge}</div>}
        {/* We use a standard img tag for simplicity, next/image can be used for optimization */}
        <img src={imageUrl} alt={name} className={styles.image} />
      </div>
      <div className={styles.metadata}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.category}>{category}</p>
        <div className={styles.priceRow}>
          {originalPrice ? (
            <>
              <span className={`${styles.price} ${styles.salePrice}`}>${price.toFixed(2)}</span>
              <span className={`${styles.price} ${styles.originalPrice}`}>${originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className={styles.price}>${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    );
  }

  return content;
}
