import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import { OrderStatusTimeline } from '@/components/ui/OrderStatusTimeline';

const MOCK_ORDER = {
  id: 'TJ-12345',
  date: 'Oct 12, 2026',
  status: 'Processing' as const, // Must match timeline props
  total: 350.00,
  shipping: 20.00,
  tax: 0.00,
  items: [
    {
      id: 1,
      name: 'Classic Leather Tote',
      quantity: 1,
      price: 330.00,
      imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=200'
    }
  ],
  shippingAddress: {
    name: 'User Name',
    address: '123 Main St',
    city: 'Accra',
    phone: '+233 20 123 4567'
  },
  paymentMethod: 'Paystack (Card)'
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Real app would fetch the order by ID
  // if (!order) notFound();
  const order = MOCK_ORDER;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Link href="/account/orders" className={styles.backLink}>&larr; Back to Orders</Link>
        <h2 className="typography-heading-lg">Order #{order.id}</h2>
      </div>

      <div className={styles.card} style={{ marginBottom: '24px' }}>
        <div className={styles.cardHeader}>
          <div>
            <div className="typography-body-strong">Order Date</div>
            <div className="typography-body">{order.date}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="typography-body-strong">Total Amount</div>
            <div className="typography-body">GH&#8373; {order.total.toFixed(2)}</div>
          </div>
        </div>
        
        <div style={{ padding: '0 24px', marginBottom: '16px' }}>
          <OrderStatusTimeline status={order.status} />
        </div>
      </div>

      <div className={styles.gridLayout}>
        <div className={styles.mainColumn}>
          <h3 className="typography-body-strong" style={{ marginBottom: '16px' }}>Items</h3>
          <div className={styles.card}>
            {order.items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <div className="typography-body-strong">{item.name}</div>
                  <div className="typography-caption-md" style={{ color: 'var(--color-mute)' }}>Qty: {item.quantity}</div>
                </div>
                <div className="typography-body-strong">
                  GH&#8373; {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sideColumn}>
          <h3 className="typography-body-strong" style={{ marginBottom: '16px' }}>Order Summary</h3>
          <div className={styles.card} style={{ padding: '24px' }}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>GH&#8373; {(order.total - order.shipping - order.tax).toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>GH&#8373; {order.shipping.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>GH&#8373; {order.tax.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>GH&#8373; {order.total.toFixed(2)}</span>
            </div>

            <div className={styles.divider} />
            
            <h4 className="typography-body-strong" style={{ marginBottom: '8px' }}>Shipping Address</h4>
            <div className="typography-body" style={{ color: 'var(--color-mute)' }}>
              {order.shippingAddress.name}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}<br />
              {order.shippingAddress.phone}
            </div>

            <div className={styles.divider} />

            <h4 className="typography-body-strong" style={{ marginBottom: '8px' }}>Payment Method</h4>
            <div className="typography-body" style={{ color: 'var(--color-mute)' }}>
              {order.paymentMethod}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
