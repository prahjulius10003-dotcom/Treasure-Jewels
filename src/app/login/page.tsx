import React from 'react';
import styles from '../auth.module.css';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // In a real app, hash password and compare. Here we just mock it or do a simple check.
    const userList = await db.select().from(users).where(eq(users.email, email));
    const user = userList[0];
    
    if (user && user.passwordHash === password) {
      await createSession({
        userId: user.id,
        username: user.username,
        role: user.role as 'admin' | 'staff' | 'customer'
      });
      redirect('/');
    } else {
      // In a real app we'd return an error state. For now we just redirect back to login.
      redirect('/login?error=InvalidCredentials');
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className="typography-section-heading" style={{ marginBottom: '24px' }}>Sign In</h1>
        <form action={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
        <p className={styles.linkText}>
          Don't have an account? <a href="/signup">Join Us</a>
        </p>
      </div>
    </div>
  );
}
