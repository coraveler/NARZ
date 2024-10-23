import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../../css/ReviewSection.module.css';

const ReviewSection = ({ratingAvg, kLocal}) => {
  const navigate = useNavigate();

  const filterOptions = [
    { text: '인기순', action: () => {} },
    { text: '최신순', action: () => {} },
    { text: '평점순', action: () => {} },
    { text: '글작성', action: () => navigate("/TravelWritePage") }
  ];

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        <h2 className={styles.reviewScore}>
          {kLocal} 후기 평점 : <span className={styles.scoreHighlight}>{ratingAvg}</span>
        </h2>
        <div className={styles.dividerContainer}>
          <div className={styles.verticalDivider} />
        </div>
        
        {filterOptions.map((option, index) => {
          const isLastButton = index === filterOptions.length - 1;
          return (
            <div
              key={index}
              className={styles.filterButton}
              style={isLastButton ? { marginLeft:"auto" } : {}}
              onClick={option.action}
            >
              <div className={styles.filterButtonInner}>
                <div className={styles.filterButtonText}>{option.text}</div>
              </div>
            </div>
          );
        })}
       
      </div>
    </section>
  );
};

export default ReviewSection; 
