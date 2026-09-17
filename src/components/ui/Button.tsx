import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline-on-image' | 'icon-circular';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  let variantClass = styles.buttonPrimary;
  switch (variant) {
    case 'secondary':
      variantClass = styles.buttonSecondary;
      break;
    case 'outline-on-image':
      variantClass = styles.buttonOutlineOnImage;
      break;
    case 'icon-circular':
      variantClass = styles.buttonIconCircular;
      break;
  }

  const combinedClass = `${styles.buttonBase} ${variantClass} ${className}`.trim();

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
