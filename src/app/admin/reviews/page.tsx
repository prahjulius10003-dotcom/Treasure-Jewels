'use client';

import React from 'react';
import styles from '../admin.module.css';

const MOCK_REVIEWS = [
  { id: 1, product: 'Classic Leather Tote', customer: 'Alice', rating: 5, comment: 'Amazing quality! Love it.', status: 'Pending' },
  { id: 2, product: 'Mini Crossbody Bag', customer: 'Bob', rating: 3, comment: 'A bit smaller than expected.', status: 'Approved' },
  { id: 3, product: 'Weekend Travel Duffel', customer: 'Charlie', rating: 1, comment: 'Spam comment here...', status: 'Hidden' },
];

export default function AdminReviewsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Reviews Moderation</h1>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REVIEWS.map((review) => (
              <tr key={review.id}>
                <td style={{ fontWeight: 500 }}>{review.product}</td>
                <td>{review.customer}</td>
                <td>{review.rating} / 5</td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {review.comment}
                </td>
                <td>
                  <span className={`${styles.badge} ${
                    review.status === 'Approved' ? styles.badgeSuccess : 
                    review.status === 'Hidden' ? styles.badgeDanger : styles.badgeWarning
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td>
                  {review.status !== 'Approved' && <button className={styles.actionBtn}>Approve</button>}
                  {review.status !== 'Hidden' && <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`}>Hide</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
