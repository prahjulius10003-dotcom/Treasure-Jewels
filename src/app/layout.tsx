import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import { CartProvider } from '@/context/CartContext';
import { CartLink } from '@/components/ui/CartLink';
import { getSession } from '@/lib/auth';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Treasure Jewels',
  description: 'A photography-first commerce system',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session ? { userId: session.userId, username: session.username, role: session.role } : null;

  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-right" />
        <AuthProvider user={user}>
        <CartProvider>
          <header>
          <div className={styles.utilityBar}>
            <div className={styles.utilityLinks}>
              <a href="#">Find a Store</a>
              <a href="#">Help</a>
              {user ? (
                <>
                  <a href={user.role === 'admin' ? '/admin' : '#'}>Hi, {user.username}</a>
                  <form action={async () => {
                    'use server';
                    const { destroySession } = await import('@/lib/auth');
                    await destroySession();
                  }} style={{ margin: 0, padding: 0 }}>
                    <button type="submit" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', padding: 0 }}>Sign Out</button>
                  </form>
                </>
              ) : (
                <>
                  <a href="/signup">Join Us</a>
                  <a href="/login">Sign In</a>
                </>
              )}
            </div>
          </div>
          <nav className={styles.primaryNav}>
            <a href="/" className={styles.logo}>Treasure Jewels</a>
            <div className={styles.navLinks}>
              <a href="/shop" className={styles.navLink}>New & Featured</a>
              <a href="/shop" className={styles.navLink}>Bags</a>
              <a href="/shop" className={styles.navLink}>Sale</a>
            </div>
            <div className={styles.actions}>
              {/* Using a simple input for search for now */}
              <input type="text" placeholder="Search" style={{
                backgroundColor: 'var(--color-soft-cloud)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '8px 16px',
                height: '40px',
                fontFamily: 'var(--font-ui)'
              }} />
              <CartLink className={styles.navLink} style={{ marginLeft: '16px', display: 'flex', alignItems: 'center', height: '40px' }} />
            </div>
          </nav>
        </header>
        <main className={styles.mainContent}>
          {children}
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div>
              <h3>Treasure Jewels</h3>
              <p style={{ color: 'var(--color-ink-muted)', marginTop: '8px' }}>Your source for the finest bags.</p>
            </div>
            <div className={styles.footerLinks}>
              <a href="#" className={styles.footerLink}>About Us</a>
              <a href="#" className={styles.footerLink}>Contact</a>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms of Service</a>
            </div>
          </div>
          <div className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} Treasure Jewels. All rights reserved.
          </div>
        </footer>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
