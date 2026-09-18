'use client';

import React from 'react';
import styles from '../admin.module.css';

const MOCK_DISCOUNTS = [
  { id: 1, code: 'WELCOME10', type: 'Percentage', value: '10%', usage: '45/100', status: 'Active' },
  { id: 2, code: 'FREESHIP', type: 'Fixed', value: 'GH\u20B5 20', usage: '12/50', status: 'Active' },
  { id: 3, code: 'HOLIDAY25', type: 'Percentage', value: '25%', usage: '500/500', status: 'Expired' },
];

export default function AdminDiscountsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Discounts</h1>
        <button className={styles.primaryBtn}>+ Create Discount</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DISCOUNTS.map((discount) => (
              <tr key={discount.id}>
                <td style={{ fontWeight: 600 }}>{discount.code}</td>
                <td>{discount.type}</td>
                <td>{discount.value}</td>
                <td>{discount.usage}</td>
                <td>
                  <span className={`${styles.badge} ${
                    discount.status === 'Active' ? styles.badgeSuccess : styles.badgeDanger
                  }`}>
                    {discount.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>Edit</button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
