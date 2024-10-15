import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
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
        {/* "작성" 버튼 추가 */}
        <Link to="/travelform" className={styles.writeButton}>
          글 작성
        </Link>
      </div>
    </section>
  );
};

export default ReviewSection; 
