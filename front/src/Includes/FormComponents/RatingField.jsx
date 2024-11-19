import styles from "../../css/TrevalWrite/RatingField.module.css";
import React, { useState,useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa"; // 빈 별과 채워진 별 아이콘
import { FaRegStarHalfStroke } from "react-icons/fa6"; // 반 별 아이콘

const RatingField = React.forwardRef(({ onChange, postRating }, ref) => {
  const [rating, setRating] = useState(0); // 선택된 별점 저장

  const handleClick = (currentRating) => {
    let newRating;

    if (rating === currentRating) {
      // 현재 별점이 클릭된 별점과 같으면 반별로 설정
      newRating = currentRating + 0.5;
    } else if (rating === currentRating + 0.5) {
      // 반별에서 꽉 찬 별로 변경
      newRating = currentRating;
    } else {
      // 다른 별 클릭 시 해당 별점으로 설정
      newRating = currentRating;
    }

    setRating(newRating);
    onChange(newRating); // 업데이트된 별점 전달
  };
  useEffect(()=>{
    if(postRating != null){
      setRating(postRating);
    }
  },[postRating])

  return (
    <div className={styles.ratingField} ref={ref}>
      <label className={styles.label}>
        별점 <span className={styles.required}>*</span>
      </label>
      <div className={styles.starContainer}>
        {/* 5개의 별을 렌더링 */}
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 0.5; // 1부터 5까지의 별점

          return (
            <button
              type="button"
              key={index}
              className={styles.starButton}
              onClick={() => handleClick(currentRating)} // 클릭 시 별점 설정
            >
              {rating > currentRating ? (
                <FaStar className={styles.star} /> // 채워진 별 아이콘
              ) : rating === currentRating ? (
                <FaRegStarHalfStroke className={styles.star} /> // 반 별 아이콘
              ) : (
                <FaRegStar className={styles.star} /> // 빈 별 아이콘
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.ratingDisplay}>
        선택된 점수: {rating.toFixed(1)}
      </div>
    </div>
  );
});

export default RatingField;
