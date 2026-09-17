'use client';

import React, { useState } from 'react';
import checkoutStyles from '../checkout/page.module.css'; // Reusing checkout styles

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [tracked, setTracked] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTracked(true);
  };

  return (
    <div className={checkoutStyles.checkoutContainer} style={{ maxWidth: '600px' }}>
      <h1 className="typography-section-heading" style={{ textAlign: 'center' }}>Track Order</h1>
      
      {!tracked ? (
        <form onSubmit={handleTrack} style={{ marginTop: '32px' }}>
          <div className={checkoutStyles.formGroup}>
            <label className="typography-body">Order Number</label>
            <input 
              type="text" 
              className={checkoutStyles.input} 
              placeholder="e.g. TJ-12345" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className={checkoutStyles.submitBtn}>Track</button>
        </form>
      ) : (
        <div style={{ marginTop: '32px', padding: '24px', backgroundColor: 'var(--color-soft-cloud)' }}>
          <h2 className="typography-body-strong">Order #{orderId || 'TJ-12345'}</h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p className="typography-body"><strong>Status:</strong> Processing</p>
            <p className="typography-body"><strong>Estimated Delivery:</strong> 2-3 Business Days</p>
            <button 
              className={checkoutStyles.submitBtn} 
              style={{ backgroundColor: 'transparent', color: 'var(--color-ink)', border: '1px solid var(--color-ink)' }}
              onClick={() => setTracked(false)}
            >
              Track Another Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
