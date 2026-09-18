'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  shippingCost?: number;
  taxCost?: number;
}

export function OrderSummary({ shippingCost = 0, taxCost = 0 }: OrderSummaryProps) {
  const { items: cartItems, cartTotal } = useCart();
  const grandTotal = cartTotal + shippingCost + taxCost;

  return (
    <div className={styles.summaryContainer}>
      <h3 className="typography-body-strong" style={{ marginBottom: '16px' }}>Order Summary</h3>
      
      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQty}>Qty: {item.quantity}</span>
            </div>
            <span className={styles.itemPrice}>GH&#8373; {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className={styles.breakdown}>
        <div className={styles.breakdownRow}>
          <span>Subtotal</span>
          <span>GH&#8373; {cartTotal.toFixed(2)}</span>
        </div>
        <div className={styles.breakdownRow}>
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `GH\u20B5 ${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className={styles.breakdownRow}>
          <span>Tax</span>
          <span>GH&#8373; {taxCost.toFixed(2)}</span>
        </div>
        
        <div className={`${styles.breakdownRow} ${styles.totalRow}`}>
          <span>Total</span>
          <span>GH&#8373; {grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
