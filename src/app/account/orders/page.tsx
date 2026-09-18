import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const MOCK_ORDERS = [
  {
    id: 'TJ-12345',
    date: 'Oct 12, 2026',
    status: 'Delivered',
    total: 350.00,
    items: 1,
  },
  {
    id: 'TJ-12346',
    date: 'Oct 15, 2026',
    status: 'Processing',
    total: 600.00,
    items: 2,
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered': return 'var(--color-success)';
    case 'processing': return 'var(--color-info)';
    case 'cancelled': return 'var(--color-sale)';
    default: return 'var(--color-mute)';
  }
};

export default function OrdersPage() {
  return (
    <div>
      <h2 className="typography-heading-lg" style={{ marginBottom: '24px' }}>Order History</h2>

      {MOCK_ORDERS.length > 0 ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className="typography-body-strong">{order.id}</td>
                  <td className="typography-body">{order.date}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="typography-body">GH&#8373; {order.total.toFixed(2)} for {order.items} item{order.items > 1 ? 's' : ''}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Link href={`/account/orders/${order.id}`} className={styles.viewLink}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className="typography-body-strong" style={{ color: 'var(--color-mute)', marginBottom: '16px' }}>You haven't placed any orders yet.</p>
          <Link href="/shop" className={styles.shopLink}>Start Shopping</Link>
        </div>
      )}
    </div>
  );
}
