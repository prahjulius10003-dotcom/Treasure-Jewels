import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from '../admin/layout.module.css'; // Reusing admin layout styles

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  if (!session || (session.role !== 'staff' && session.role !== 'admin')) {
    redirect('/login');
  }

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="typography-heading-md">TJ Staff</h2>
        </div>
        <nav className={styles.navMenu}>
          <Link href="/staff/orders" className={styles.navLink}>Fulfillment</Link>
          <Link href="/staff/inventory" className={styles.navLink}>Inventory</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.storefrontLink}>&larr; Back to Store</Link>
        </div>
      </aside>
      
      <div className={styles.mainWrapper}>
        <header className={styles.topBar}>
          <div className={styles.topBarContent}>
            <span className="typography-body-strong">Staff Console</span>
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
