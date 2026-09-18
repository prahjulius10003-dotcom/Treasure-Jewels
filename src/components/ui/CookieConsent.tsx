'use client';

import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tj_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('tj_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p className="typography-body">
          We use cookies to improve your experience and for analytics. By continuing to use this site, you agree to our use of cookies.
        </p>
        <button className={styles.acceptBtn} onClick={acceptCookies}>
          Accept
        </button>
      </div>
    </div>
  );
}
