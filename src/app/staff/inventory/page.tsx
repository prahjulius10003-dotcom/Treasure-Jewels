'use client';

import React, { useState } from 'react';
import styles from '../../admin/admin.module.css'; // Reusing admin table styles

const MOCK_INVENTORY = [
  { id: 1, sku: 'TOTE-BLK', name: 'Classic Leather Tote (Black)', stock: 45, threshold: 10 },
  { id: 2, sku: 'CB-TAN', name: 'Mini Crossbody Bag (Tan)', stock: 12, threshold: 15 },
  { id: 3, sku: 'DUF-BRN', name: 'Weekend Travel Duffel (Brown)', stock: 2, threshold: 5 },
];

export default function StaffInventoryPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Inventory Management</h1>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Variant</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th>Adjust Stock</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVENTORY.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 500 }}>{item.sku}</td>
                <td>{item.name}</td>
                <td style={{ fontWeight: 600 }}>{item.stock}</td>
                <td>
                  {item.stock === 0 ? (
                    <span className={`${styles.badge} ${styles.badgeDanger}`}>Out of Stock</span>
                  ) : item.stock <= item.threshold ? (
                    <span className={`${styles.badge} ${styles.badgeWarning}`}>Low Stock</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>In Stock</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="number" className={styles.searchInput} style={{ width: '80px', padding: '4px 8px' }} placeholder="Qty" />
                    <button className={styles.primaryBtn} style={{ padding: '4px 12px' }}>Update</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="typography-heading-md" style={{ marginTop: '32px', marginBottom: '16px' }}>Recent Adjustments</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>SKU</th>
              <th>Change</th>
              <th>Reason</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Oct 18, 2026</td>
              <td>TOTE-BLK</td>
              <td style={{ color: 'var(--color-success)', fontWeight: 600 }}>+20</td>
              <td>Received new shipment</td>
              <td>staff_user</td>
            </tr>
            <tr>
              <td>Oct 17, 2026</td>
              <td>DUF-BRN</td>
              <td style={{ color: 'var(--color-sale)', fontWeight: 600 }}>-1</td>
              <td>Damaged item written off</td>
              <td>admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
