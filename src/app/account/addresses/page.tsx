import React from 'react';
import styles from './page.module.css';

const MOCK_ADDRESSES = [
  {
    id: 1,
    name: 'Home',
    isDefault: true,
    firstName: 'User',
    lastName: 'Name',
    address: '123 Main St',
    city: 'Accra',
    phone: '+233 20 123 4567',
  },
];

export default function AddressesPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="typography-heading-lg">Address Book</h2>
        <button className={styles.addBtn}>Add New Address</button>
      </div>

      {MOCK_ADDRESSES.length > 0 ? (
        <div className={styles.grid}>
          {MOCK_ADDRESSES.map((addr) => (
            <div key={addr.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className="typography-body-strong">{addr.name}</h3>
                {addr.isDefault && <span className={styles.badge}>Default</span>}
              </div>
              <div className={styles.cardBody}>
                <p>{addr.firstName} {addr.lastName}</p>
                <p>{addr.address}</p>
                <p>{addr.city}</p>
                <p>{addr.phone}</p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>Edit</button>
                {!addr.isDefault && (
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className="typography-body-strong" style={{ color: 'var(--color-mute)' }}>Your address book is empty.</p>
        </div>
      )}
    </div>
  );
}
