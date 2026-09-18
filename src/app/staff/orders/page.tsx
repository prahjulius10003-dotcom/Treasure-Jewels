'use client';

import React, { useState } from 'react';
import styles from '../../admin/admin.module.css'; // Reusing admin table styles

const MOCK_ORDERS = [
  { id: 'TJ-12345', customer: 'Alice Doe', date: 'Oct 12, 2026', items: 2, status: 'Paid', fulfillment: 'Unfulfilled' },
  { id: 'TJ-12346', customer: 'Bob Smith', date: 'Oct 13, 2026', items: 1, status: 'Paid', fulfillment: 'Processing' },
  { id: 'TJ-12347', customer: 'Charlie Brown', date: 'Oct 15, 2026', items: 5, status: 'Paid', fulfillment: 'Shipped' },
];

export default function StaffOrdersPage() {
  const [filter, setFilter] = useState('All');

  const filteredOrders = filter === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.fulfillment === filter);

  const handlePrintSlip = (id: string) => {
    alert(`Printing packing slip for order ${id}...`);
    // In a real app, this would open a printable view or PDF
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Fulfillment</h1>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableToolbar}>
          <select 
            className={styles.searchInput}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Fulfillment Statuses</option>
            <option value="Unfulfilled">Unfulfilled</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Fulfillment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 500 }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>
                  <span className={`${styles.badge} ${
                    order.fulfillment === 'Shipped' ? styles.badgeSuccess : 
                    order.fulfillment === 'Unfulfilled' ? styles.badgeDanger : styles.badgeInfo
                  }`}>
                    {order.fulfillment}
                  </span>
                </td>
                <td>
                  <button className={styles.actionBtn}>Mark Shipped</button>
                  <button className={styles.actionBtn} onClick={() => handlePrintSlip(order.id)}>Print Slip</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
