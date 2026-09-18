'use client';

import React, { useState } from 'react';
import styles from './ImageGallery.module.css';

export function ImageGallery({ images, altText }: { images: string[], altText: string }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.mainImageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mainImage} alt={altText} className={styles.mainImage} />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {images.map((img, idx) => (
            <button 
              key={idx} 
              className={`${styles.thumbnailBtn} ${mainImage === img ? styles.active : ''}`}
              onClick={() => setMainImage(img)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`${altText} thumbnail ${idx + 1}`} className={styles.thumbnailImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
