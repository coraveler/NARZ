import React from 'react';
import styles from '../../css/StarRating.module.css';

const StarRating = () => (
  <div className={styles.starRating}>
    <label className={styles.ratingLabel}>
      별점 <span className={styles.requiredAsterisk}>*</span>
    </label>
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          id={`star${star}`}
          name="rating"
          value={star}
          className={styles.starInput}
        />
      ))}
    </div>
  </div>
);

export default StarRating;