import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className={styles.accountContainer}>
      <h1 className="typography-section-heading" style={{ marginBottom: '32px' }}>My Account</h1>
      <div className={styles.accountLayout}>
        <aside className={styles.sidebar}>
          <nav className={styles.navMenu}>
            <Link href="/account" className={styles.navLink}>Profile</Link>
            <Link href="/account/addresses" className={styles.navLink}>Address Book</Link>
            <Link href="/account/orders" className={styles.navLink}>Order History</Link>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
