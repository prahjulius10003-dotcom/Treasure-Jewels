'use client';

import React, { useState } from 'react';
import styles from './ReviewForm.module.css';
import toast from 'react-hot-toast';

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    
    toast.success('Review submitted for approval!');
    setRating(0);
    setComment('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4 className="typography-body-strong">Write a Review</h4>
      
      <div className={styles.ratingGroup}>
        <span className={styles.label}>Rating</span>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`${styles.starBtn} ${(hoverRating || rating) >= star ? styles.starFilled : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="review-comment" className={styles.label}>Comment</label>
        <textarea
          id="review-comment"
          className={styles.textarea}
          rows={4}
          placeholder="Share your thoughts about this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
