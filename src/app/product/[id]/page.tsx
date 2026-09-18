import React from 'react';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { DisclosureRow } from '@/components/ui/DisclosureRow';
import { getProductById } from '@/lib/api/products';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { VariantSelector } from '@/components/ui/VariantSelector';
import { ReviewForm } from '@/components/ui/ReviewForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  const product = await getProductById(productId);

  if (!product) {
    return { title: 'Product Not Found | Treasure Jewels' };
  }

  return {
    title: `${product.name} | Treasure Jewels`,
    description: product.description || `Buy ${product.name} at Treasure Jewels.`,
    openGraph: {
      images: [product.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);
  
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Create mock images for the gallery
  const galleryImages = [
    product.imageUrl,
    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&q=80&w=800'
  ];

  return (
    <div className={styles.pdpContainer}>
      <div className={styles.imageSection}>
        <ImageGallery images={galleryImages} altText={product.name} />
      </div>
      
      <div className={styles.detailsSection}>
        <div className={styles.header}>
          <span className="typography-body">{product.category}</span>
          <h1 className="typography-section-heading">{product.name}</h1>
          <div className={styles.priceRow}>
            <span className="typography-body-strong">GH&#8373; {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={`typography-body ${styles.originalPrice}`}>GH&#8373; {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <VariantSelector />

        <AddToCartButton product={product} />

        <div className={styles.disclosures}>
          <DisclosureRow title="Product Details">
            <p className="typography-body">{product.description}</p>
            <ul style={{ marginTop: '16px', paddingLeft: '20px' }} className="typography-body">
              <li>100% genuine leather</li>
              <li>Dimensions: 14" W x 12" H x 6" D</li>
              <li>Internal zip pocket</li>
            </ul>
          </DisclosureRow>
          <DisclosureRow title="Shipping & Returns">
            <p className="typography-body">Free standard shipping on orders over GH&#8373;300.</p>
            <p className="typography-body">Returns accepted within 7 days of delivery for a full refund.</p>
          </DisclosureRow>
          <DisclosureRow title="Reviews (0)">
            <p className="typography-body" style={{ marginBottom: '16px' }}>No reviews yet. Be the first to review this product!</p>
            <ReviewForm />
          </DisclosureRow>
        </div>
      </div>
    </div>
  );
}
