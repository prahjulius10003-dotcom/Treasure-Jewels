import React from 'react';
import styles from './OrderStatusTimeline.module.css';

interface TimelineProps {
  status: 'Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded' | 'Returned';
}

const HAPPY_PATH = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered'];

export function OrderStatusTimeline({ status }: TimelineProps) {
  const isAltState = ['Cancelled', 'Refunded', 'Returned'].includes(status);
  
  // If it's an alternate state, we just show a simplified timeline or highlight the alt state
  if (isAltState) {
    return (
      <div className={styles.timelineContainer}>
        <div className={styles.altStateWrapper}>
          <div className={`${styles.dot} ${styles.altDot}`} />
          <span className={styles.altLabel}>Order {status}</span>
        </div>
      </div>
    );
  }

  const currentIndex = HAPPY_PATH.indexOf(status);

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineTrack}>
        {HAPPY_PATH.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          
          return (
            <div key={step} className={styles.stepWrapper}>
              <div className={styles.indicatorContainer}>
                <div className={`${styles.dot} ${isCompleted || isActive ? styles.completed : ''}`} />
                {index < HAPPY_PATH.length - 1 && (
                  <div className={`${styles.line} ${isCompleted ? styles.completedLine : ''}`} />
                )}
              </div>
              <span className={`${styles.label} ${isActive ? styles.activeLabel : ''}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
