import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session || session.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="typography-heading-md">TJ Admin</h2>
        </div>
        <nav className={styles.navMenu}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          <Link href="/admin/products" className={styles.navLink}>Products</Link>
          <Link href="/admin/orders" className={styles.navLink}>Orders</Link>
          <Link href="/admin/customers" className={styles.navLink}>Customers</Link>
          <Link href="/admin/discounts" className={styles.navLink}>Discounts</Link>
          <Link href="/admin/reviews" className={styles.navLink}>Reviews</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.storefrontLink}>&larr; Back to Store</Link>
        </div>
      </aside>
      
      <div className={styles.mainWrapper}>
        <header className={styles.topBar}>
          <div className={styles.topBarContent}>
            <span className="typography-body-strong">Admin Console</span>
            <div className={styles.userMenu}>
              <div className={styles.avatar}>{session.username.charAt(0).toUpperCase()}</div>
              <span className="typography-body">{session.username}</span>
            </div>
          </div>
        </header>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
