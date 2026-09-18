'use client';

import React from 'react';
import styles from '../admin.module.css';

const MOCK_CUSTOMERS = [
  { id: 1, name: 'Alice Doe', email: 'alice@example.com', orders: 5, totalSpent: 1250, role: 'user' },
  { id: 2, name: 'Admin User', email: 'admin@example.com', orders: 1, totalSpent: 350, role: 'admin' },
  { id: 3, name: 'Staff Member', email: 'staff@example.com', orders: 0, totalSpent: 0, role: 'staff' },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Customers</h1>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CUSTOMERS.map((customer) => (
              <tr key={customer.id}>
                <td style={{ fontWeight: 500 }}>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.orders}</td>
                <td>GH&#8373; {customer.totalSpent.toFixed(2)}</td>
                <td>
                  <span className={`${styles.badge} ${
                    customer.role === 'admin' ? styles.badgeDanger : 
                    customer.role === 'staff' ? styles.badgeWarning : styles.badgeInfo
                  }`}>
                    {customer.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
