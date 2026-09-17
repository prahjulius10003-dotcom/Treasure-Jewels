'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.checkoutContainer} style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="typography-section-heading">Order Confirmed</h1>
        <p style={{ marginTop: '16px' }}>Thank you for shopping with Treasure Jewels.</p>
        <p>Your mock order number is #TJ-{Math.floor(Math.random() * 100000)}</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className="typography-section-heading">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.section} style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
          <h2 className="typography-body-strong" style={{ fontSize: '20px', marginBottom: '16px' }}>Delivery Options</h2>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className="typography-body">First Name</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className="typography-body">Last Name</label>
              <input type="text" className={styles.input} required />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className="typography-body">Address</label>
            <input type="text" className={styles.input} required />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className="typography-body">City</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className="typography-body">Phone Number</label>
              <input type="tel" className={styles.input} required />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className="typography-body-strong" style={{ fontSize: '20px', marginBottom: '16px' }}>Payment</h2>
          <div className={styles.formGroup}>
            <label className="typography-body">Card Number</label>
            <input type="text" className={styles.input} placeholder="0000 0000 0000 0000" />
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className="typography-body">Expiry (MM/YY)</label>
              <input type="text" className={styles.input} placeholder="MM/YY" />
            </div>
            <div className={styles.formGroup}>
              <label className="typography-body">CVV</label>
              <input type="text" className={styles.input} placeholder="123" />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="typography-body-strong">Total to Pay</span>
            <span className="typography-body-strong">GH&#8373; {cartTotal.toFixed(2)}</span>
          </div>
          <button type="submit" className={styles.submitBtn}>Place Order</button>
        </div>
      </form>
    </div>
  );
}
