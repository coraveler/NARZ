import React from 'react';
import styles from '../../css/ReviewSection.module.css';

const ReviewSection = () => {
  const filterOptions = ['인기순', '최신순', '평점순'];

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        <h2 className={styles.reviewScore}>
          서울 후기 평점 : <span className={styles.scoreHighlight}>4.6</span>
        </h2>
        <div className={styles.dividerContainer}>
          <div className={styles.verticalDivider} />
        </div>
        {filterOptions.map((option, index) => (
          <div key={index} className={styles.filterButton}>
            <div className={styles.filterButtonInner}>
              <div className={styles.filterButtonText}>{option}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;