'use client';

import React, { useState } from 'react';
import styles from './DisclosureRow.module.css';

interface DisclosureRowProps {
  title: string;
  children: React.ReactNode;
}

export function DisclosureRow({ title, children }: DisclosureRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="typography-body-strong">{title}</span>
        <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          <div className="typography-body">{children}</div>
        </div>
      )}
    </div>
  );
}
