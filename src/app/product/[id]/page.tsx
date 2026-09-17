'use client';

import React, { use } from 'react';
import styles from './page.module.css';
import { DisclosureRow } from '@/components/ui/DisclosureRow';
import { useCart } from '@/context/CartContext';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Classic Leather Tote',
    category: 'Tote Bags',
    price: 350,
    originalPrice: 420,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    description: 'A timeless leather tote that fits your laptop, daily essentials, and more. Handcrafted with premium grain leather that develops a beautiful patina over time.',
  },
  {
    id: 2,
    name: 'Mini Crossbody Bag',
    category: 'Crossbody Bags',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect for hands-free convenience. Features multiple compartments and an adjustable strap.',
  },
  {
    id: 3,
    name: 'Weekend Travel Duffel',
    category: 'Travel Bags',
    price: 420,
    originalPrice: 500,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    description: 'Your perfect companion for weekend getaways. Spacious interior with premium brass hardware.',
  },
  {
    id: 4,
    name: 'Woven Straw Beach Bag',
    category: 'Beach Bags',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    description: 'Bring summer vibes wherever you go. Hand-woven with durable natural straw.',
  },
  {
    id: 5,
    name: 'Executive Laptop Bag',
    category: 'Work Bags',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=800',
    description: 'Professional and sleek laptop bag that protects your devices in style.',
  },
  {
    id: 6,
    name: 'Quilted Chain Shoulder Bag',
    category: 'Shoulder Bags',
    price: 290,
    originalPrice: 350,
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant quilted design with a versatile chain strap for day-to-night transitions.',
  }
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Mock data fetching based on ID. 
  // We unwrap params with `use` for Next.js 15
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  
  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
    alert('Added to cart!');
  };

  return (
    <div className={styles.pdpContainer}>
      <div className={styles.imageSection}>
        <img src={product.imageUrl} alt={product.name} className={styles.mainImage} />
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

        <div className={styles.actions}>
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            Add to Bag
          </button>
          <button className={styles.wishlistBtn}>
            Favorite <span style={{ marginLeft: '8px' }}>♡</span>
          </button>
        </div>

        <div className={styles.disclosures}>
          <DisclosureRow title="Product Details">
            <p>{product.description}</p>
            <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
              <li>100% genuine leather</li>
              <li>Dimensions: 14" W x 12" H x 6" D</li>
              <li>Internal zip pocket</li>
            </ul>
          </DisclosureRow>
          <DisclosureRow title="Shipping & Returns">
            <p>Free standard shipping on orders over GH&#8373;300.</p>
            <p>Returns accepted within 7 days of delivery for a full refund.</p>
          </DisclosureRow>
          <DisclosureRow title="Reviews (0)">
            <p>No reviews yet. Be the first to review this product!</p>
          </DisclosureRow>
        </div>
      </div>
    </div>
  );
}
