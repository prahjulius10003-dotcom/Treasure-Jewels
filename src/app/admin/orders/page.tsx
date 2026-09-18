'use client';

import React, { useState } from 'react';
import styles from '../admin.module.css';

const MOCK_ORDERS = [
  { id: 'TJ-12345', customer: 'Alice Doe', date: 'Oct 12, 2026', total: 350, status: 'Pending' },
  { id: 'TJ-12346', customer: 'Bob Smith', date: 'Oct 13, 2026', total: 600, status: 'Paid' },
  { id: 'TJ-12347', customer: 'Charlie Brown', date: 'Oct 15, 2026', total: 120, status: 'Shipped' },
];

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = statusFilter === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === statusFilter);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Orders</h1>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableToolbar}>
          <select 
            className={styles.searchInput}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 500 }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>GH&#8373; {order.total.toFixed(2)}</td>
                <td>
                  <span className={`${styles.badge} ${
                    order.status === 'Delivered' ? styles.badgeSuccess : 
                    order.status === 'Refunded' ? styles.badgeDanger : styles.badgeInfo
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>View Details</button>
                  <button className={styles.actionBtn}>Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
