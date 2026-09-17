import React from 'react';
import styles from './CampaignTile.module.css';
import { Button } from './Button';

interface CampaignTileProps {
  headline: string;
  imageUrl: string;
  ctaText: string;
  ctaHref?: string;
  headlineColor?: 'light' | 'dark';
}

export function CampaignTile({
  headline,
  imageUrl,
  ctaText,
  ctaHref = '#',
  headlineColor = 'light',
}: CampaignTileProps) {
  const headlineClass = headlineColor === 'light' ? styles.headlineLight : styles.headlineDark;

  return (
    <div className={styles.tile}>
      <img src={imageUrl} alt="" className={styles.image} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={`${styles.headline} ${headlineClass}`}>{headline}</h1>
        <div className={styles.ctaWrapper}>
          <a href={ctaHref}>
            <Button variant="outline-on-image">{ctaText}</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
