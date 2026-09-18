'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.emptyState}>
          <h1 className="typography-section-heading">Your bag is empty</h1>
          <p style={{ marginTop: '16px' }}>Once you add something to your bag, it will appear here.</p>
          <Link href="/shop" className={styles.checkoutBtn} style={{ maxWidth: '300px' }}>
            Get Started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className="typography-section-heading">Bag</h1>
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <div>
                    <h3 className="typography-body-strong">{item.name}</h3>
                  </div>
                  <span className="typography-body-strong">GH&#8373; {(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >−</button>
                    <span className="typography-body">{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <h2 className="typography-section-heading" style={{ fontSize: '24px', marginBottom: '24px' }}>Summary</h2>
          
          <div className={styles.summaryRow}>
            <span className="typography-body">Subtotal</span>
            <span className="typography-body">GH&#8373; {cartTotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className="typography-body">Estimated Delivery & Handling</span>
            <span className="typography-body">Free</span>
          </div>
          <div className={styles.summaryRow} style={{ color: 'var(--color-success)' }}>
            <span className="typography-body">Discount (Voucher)</span>
            <span className="typography-body">- GH&#8373; 0.00</span>
          </div>

          <div className={styles.summaryTotal}>
            <span className="typography-body-strong">Total</span>
            <span className="typography-body-strong">GH&#8373; {cartTotal.toFixed(2)}</span>
          </div>

          <div className={styles.couponSection}>
            <input type="text" placeholder="Promo code" className={styles.couponInput} />
            <button className={styles.couponBtn}>Apply</button>
          </div>

          <Link href="/checkout" className={styles.checkoutBtn}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
