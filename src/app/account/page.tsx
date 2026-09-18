import { getSession } from '@/lib/auth';
import styles from './page.module.css';

export default async function ProfilePage() {
  const session = await getSession();

  return (
    <div className={styles.pageContainer}>
      <h2 className="typography-heading-lg" style={{ marginBottom: '24px' }}>Profile Information</h2>
      
      <div className={styles.card}>
        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <div className={styles.value}>{session?.username || 'User'}</div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <div className={styles.value}>user@example.com</div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <div className={styles.value}>+1 234 567 8900</div>
          </div>
        </div>
        <button className={styles.editBtn}>Edit Profile</button>
      </div>

      <h2 className="typography-heading-lg" style={{ marginTop: '48px', marginBottom: '24px' }}>Preferences</h2>
      <div className={styles.card}>
        <div className={styles.toggleRow}>
          <div>
            <div className="typography-body-strong">Order Notifications</div>
            <div className="typography-caption-md" style={{ color: 'var(--color-mute)' }}>Receive SMS updates on order status</div>
          </div>
          <label className={styles.toggle}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.toggleRow}>
          <div>
            <div className="typography-body-strong">Marketing Emails</div>
            <div className="typography-caption-md" style={{ color: 'var(--color-mute)' }}>Receive news and exclusive offers</div>
          </div>
          <label className={styles.toggle}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}
