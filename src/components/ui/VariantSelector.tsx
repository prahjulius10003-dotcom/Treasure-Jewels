'use client';

import React, { useState } from 'react';
import styles from './VariantSelector.module.css';

const COLORS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'brown', name: 'Tan Brown', hex: '#8B5A2B' },
  { id: 'cream', name: 'Cream', hex: '#FDF5E6' },
];

const SIZES = ['Small', 'Medium', 'Large'];

export function VariantSelector() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].id);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);

  return (
    <div className={styles.variants}>
      <div className={styles.variantGroup}>
        <span className={styles.label}>
          Color: <span className={styles.value}>{COLORS.find(c => c.id === selectedColor)?.name}</span>
        </span>
        <div className={styles.options}>
          {COLORS.map(color => (
            <button
              key={color.id}
              className={`${styles.colorBtn} ${selectedColor === color.id ? styles.colorSelected : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.id)}
              aria-label={`Select ${color.name}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.variantGroup}>
        <span className={styles.label}>
          Size: <span className={styles.value}>{selectedSize}</span>
        </span>
        <div className={styles.options}>
          {SIZES.map(size => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeSelected : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
