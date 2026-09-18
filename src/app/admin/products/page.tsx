'use client';

import React, { useState } from 'react';
import styles from '../admin.module.css';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Classic Leather Tote', price: 350, stock: 45, status: 'Active' },
  { id: 2, name: 'Mini Crossbody Bag', price: 180, stock: 12, status: 'Active' },
  { id: 3, name: 'Weekend Travel Duffel', price: 420, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Woven Straw Beach Bag', price: 120, stock: 8, status: 'Draft' },
];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Products</h1>
        <button className={styles.primaryBtn}>+ Add Product</button>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableToolbar}>
          <input 
            type="text" 
            placeholder="Search products..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: 500 }}>{product.name}</td>
                <td>GH&#8373; {product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`${styles.badge} ${
                    product.status === 'Active' ? styles.badgeSuccess : 
                    product.status === 'Out of Stock' ? styles.badgeDanger : styles.badgeWarning
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>Edit</button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
