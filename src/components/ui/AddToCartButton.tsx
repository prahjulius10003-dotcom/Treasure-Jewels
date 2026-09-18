'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from '@/app/product/[id]/page.module.css';
import { Product } from '@/lib/api/products';
import toast from 'react-hot-toast';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [email, setEmail] = useState('');

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
    toast.success('Added to bag!');
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('You will be notified when this is back in stock.');
      setEmail('');
    }
  };

  return (
    <div className={styles.actions}>
      {product.inStock ? (
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Add to Bag
        </button>
      ) : (
        <form onSubmit={handleNotify} style={{ display: 'flex', width: '100%', gap: '8px' }}>
          <input 
            type="email" 
            placeholder="Email for back-in-stock alert" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-hairline)', fontFamily: 'var(--font-ui)' }}
          />
          <button type="submit" className={styles.addToCartBtn} style={{ width: 'auto', padding: '0 16px' }}>
            Notify Me
          </button>
        </form>
      )}
      <button className={styles.wishlistBtn}>
        Favorite <span style={{ marginLeft: '8px' }}>♡</span>
      </button>
    </div>
  );
}
