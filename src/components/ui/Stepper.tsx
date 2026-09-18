import React from 'react';
import styles from './Stepper.module.css';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <div key={step} className={styles.stepWrapper}>
          <div className={styles.stepIndicator}>
            <div
              className={`${styles.stepNumber} ${
                index < currentStep
                  ? styles.completed
                  : index === currentStep
                  ? styles.active
                  : styles.pending
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={`${styles.stepLabel} ${index <= currentStep ? styles.activeLabel : ''}`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`${styles.stepLine} ${
                index < currentStep ? styles.lineCompleted : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
