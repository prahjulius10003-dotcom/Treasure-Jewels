import React from 'react';
import styles from '../auth.module.css';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export default function SignupPage() {
  async function handleSignup(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Default to 'customer'
    const newUser = await db.insert(users).values({
      name,
      username,
      email,
      passwordHash: password, // In production, bcrypt hash this!
      role: 'customer'
    }).returning();

    if (newUser[0]) {
      await createSession({
        userId: newUser[0].id,
        username: newUser[0].username,
        role: newUser[0].role as 'admin' | 'staff' | 'customer'
      });
      redirect('/');
    } else {
      redirect('/signup?error=SignupFailed');
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className="typography-section-heading" style={{ marginBottom: '24px' }}>Join Us</h1>
        <form action={handleSignup}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Full Name</label>
            <input className={styles.input} type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input className={styles.input} type="text" id="username" name="username" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign Up</button>
        </form>
        <p className={styles.linkText}>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}
