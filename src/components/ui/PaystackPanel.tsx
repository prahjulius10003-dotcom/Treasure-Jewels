import React from 'react';
import styles from './PaystackPanel.module.css';

export function PaystackPanel() {
  return (
    <div className={styles.panelContainer}>
      <div className={styles.header}>
        <span className="typography-body-strong">Paystack</span>
        <div className={styles.icons}>
          <div className={styles.cardIcon}>💳</div>
          <div className={styles.mobileMoneyIcon}>📱</div>
        </div>
      </div>
      <div className={styles.content}>
        <p className="typography-body" style={{ color: 'var(--color-mute)' }}>
          You will be redirected to the secure Paystack checkout portal to complete your payment using Card or Mobile Money.
        </p>
      </div>
    </div>
  );
}
