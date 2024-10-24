import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ReviewSection.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewSection = ({ ratingAvg, kLocal, handleArray }) => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 값 가져오기
    const storedState = localStorage.getItem('buttonState');
    return storedState !== null ? Number(storedState) : 0;
  });

  useEffect(() => {
    // buttonState가 변경될 때마다 로컬 스토리지에 저장
    if (buttonState !== undefined) {
      localStorage.setItem('buttonState', buttonState);
    }
  }, [buttonState]);

  const handleState = (index) => {
    setButtonState(index);
  };

  const filterOptions = [
    { text: '최신순', action: () => handleArray(0) },
    { text: '인기순', action: () => handleArray(1) },
    { text: '평점순', action: () => handleArray(2) },
    // { text: '팔로잉', action: () => undefined },
    // { text: '북마크', action: () => undefined },
    { text: '글작성', action: () => navigate("/TravelWritePage") }
  ];

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        {kLocal ? 
          (<h2 className={styles.reviewScore}>
            {kLocal} 후기 평점 : <span className={styles.scoreHighlight}>{ratingAvg}</span>
          </h2>):
            <h2>none</h2>}
        
        <div className={styles.dividerContainer}>
          <div className={styles.verticalDivider} />
        </div>

        {filterOptions.map((option, index) => {
          const isLastButton = index === filterOptions.length - 1;
          return (
            <div
              key={index}
              className={styles.filterButton}
              style={isLastButton ? { marginLeft: "auto" } : {}}
              onClick={option.action}
            >
              <button className={index === buttonState ? "btn btn-success" : "btn btn-outline-success"}
                      onClick={index < 3 ? () => handleState(index) : undefined}>
                {option.text}
              </button>
            </div>
          );
        })}
      </div>
    </section>
   
  );
};

export default ReviewSection;
