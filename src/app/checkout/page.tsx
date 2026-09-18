'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './page.module.css';
import { Stepper } from '@/components/ui/Stepper';
import { OrderSummary } from '@/components/ui/OrderSummary';
import { PaystackPanel } from '@/components/ui/PaystackPanel';
import Link from 'next/link';

const STEPS = ['Delivery', 'Shipping', 'Payment', 'Confirmation'];

const MOCK_SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Delivery', eta: '3-5 business days', price: 20 },
  { id: 'express', name: 'Express Delivery', eta: '1-2 business days', price: 50 },
];

export default function CheckoutPage() {
  const { items: cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Delivery State
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '', lastName: '', address: '', city: '', phone: ''
  });

  // Shipping State
  const [shippingMethod, setShippingMethod] = useState(MOCK_SHIPPING_OPTIONS[0]);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('paystack'); // 'paystack' | 'cod'

  // Order state
  const [orderNumber, setOrderNumber] = useState('');

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handlePlaceOrder = () => {
    // TODO(backend): Call real checkout API
    setOrderNumber(`TJ-${Math.floor(Math.random() * 100000)}`);
    clearCart();
    setCurrentStep(3); // Confirmation
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  if (cartItems.length === 0 && currentStep !== 3) {
    return (
      <div className={styles.checkoutContainer} style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 className="typography-section-heading">Your Cart is Empty</h1>
        <p style={{ marginTop: '16px' }}>Add some items to your bag before checking out.</p>
        <Link href="/shop" className={styles.submitBtn} style={{ display: 'inline-block', width: 'auto', marginTop: '24px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className="typography-section-heading" style={{ marginBottom: '32px' }}>Checkout</h1>
      
      <Stepper steps={STEPS} currentStep={currentStep} />
      
      <div className={styles.checkoutLayout}>
        <div className={styles.mainContent}>
          
          {/* STEP 0: DELIVERY */}
          {currentStep === 0 && (
            <form onSubmit={handleDeliverySubmit}>
              <h2 className="typography-heading-lg" style={{ marginBottom: '24px' }}>Contact & Delivery</h2>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className="typography-body">First Name</label>
                  <input type="text" className={styles.input} required value={deliveryInfo.firstName} onChange={e => setDeliveryInfo({...deliveryInfo, firstName: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className="typography-body">Last Name</label>
                  <input type="text" className={styles.input} required value={deliveryInfo.lastName} onChange={e => setDeliveryInfo({...deliveryInfo, lastName: e.target.value})} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className="typography-body">Address</label>
                <input type="text" className={styles.input} required value={deliveryInfo.address} onChange={e => setDeliveryInfo({...deliveryInfo, address: e.target.value})} />
              </div>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className="typography-body">City</label>
                  <input type="text" className={styles.input} required value={deliveryInfo.city} onChange={e => setDeliveryInfo({...deliveryInfo, city: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className="typography-body">Phone Number</label>
                  <input type="tel" className={styles.input} required value={deliveryInfo.phone} onChange={e => setDeliveryInfo({...deliveryInfo, phone: e.target.value})} />
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>Continue to Shipping</button>
            </form>
          )}

          {/* STEP 1: SHIPPING OPTIONS */}
          {currentStep === 1 && (
            <div>
              <h2 className="typography-heading-lg" style={{ marginBottom: '24px' }}>Shipping Options</h2>
              <div className={styles.shippingOptions}>
                {MOCK_SHIPPING_OPTIONS.map(option => (
                  <label key={option.id} className={`${styles.shippingCard} ${shippingMethod.id === option.id ? styles.selectedCard : ''}`}>
                    <input 
                      type="radio" 
                      name="shipping" 
                      value={option.id} 
                      checked={shippingMethod.id === option.id}
                      onChange={() => setShippingMethod(option)}
                      className={styles.radioInput}
                    />
                    <div className={styles.shippingInfo}>
                      <span className="typography-body-strong">{option.name}</span>
                      <span className="typography-caption-md" style={{ color: 'var(--color-mute)' }}>{option.eta}</span>
                    </div>
                    <span className="typography-body-strong">GH&#8373; {option.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
              <div className={styles.actionRow}>
                <button type="button" className={styles.backBtn} onClick={prevStep}>Back</button>
                <button type="button" className={styles.submitBtn} style={{ width: 'auto' }} onClick={nextStep}>Continue to Payment</button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {currentStep === 2 && (
            <div>
              <h2 className="typography-heading-lg" style={{ marginBottom: '24px' }}>Payment Method</h2>
              
              <div className={styles.paymentMethods}>
                <label className={`${styles.shippingCard} ${paymentMethod === 'paystack' ? styles.selectedCard : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paystack" 
                    checked={paymentMethod === 'paystack'}
                    onChange={() => setPaymentMethod('paystack')}
                    className={styles.radioInput}
                  />
                  <span className="typography-body-strong">Paystack (Card / Mobile Money)</span>
                </label>
                
                {paymentMethod === 'paystack' && (
                  <PaystackPanel />
                )}

                <label className={`${styles.shippingCard} ${paymentMethod === 'cod' ? styles.selectedCard : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className={styles.radioInput}
                  />
                  <span className="typography-body-strong">Cash on Delivery</span>
                </label>
              </div>

              <div className={styles.actionRow}>
                <button type="button" className={styles.backBtn} onClick={prevStep}>Back</button>
                <button type="button" className={styles.submitBtn} style={{ width: 'auto' }} onClick={handlePlaceOrder}>
                  Complete Order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {currentStep === 3 && (
            <div className={styles.confirmationState}>
              <div className={styles.successIcon}>✓</div>
              <h1 className="typography-section-heading">Order Confirmed!</h1>
              <p className="typography-body" style={{ marginTop: '16px' }}>Thank you for shopping with Treasure Jewels.</p>
              <p className="typography-body-strong" style={{ marginTop: '8px' }}>Order Number: {orderNumber}</p>
              
              <div className={styles.confirmationActions}>
                {/* Note: /account/orders/1 will be built in Phase 3 */}
                <Link href="/account/orders/1" className={styles.submitBtn} style={{ display: 'block', textAlign: 'center' }}>
                  View Order Details
                </Link>
                <Link href="/shop" className={styles.backBtn} style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.sidebar}>
          <OrderSummary shippingCost={currentStep > 0 ? shippingMethod.price : 0} taxCost={0} />
        </div>
      </div>
    </div>
  );
}
