import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa"; // 빈 별과 채워진 별 아이콘
import styles from "../../css/TrevalWrite/RatingField.module.css";

function RatingField() {
  const [rating, setRating] = useState(0); // 선택된 별점 저장
  const [hover, setHover] = useState(null); // 사용자가 마우스로 호버한 별 저장

  return (
    <div className={styles.ratingField}>
      <label className={styles.label}>
        별점 <span className={styles.required}>*</span>
      </label>
      <div className={styles.starContainer}>
        {/* 별을 5개 렌더링, 사용자가 클릭하거나 호버했을 때 상태 변경 */}
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1; // 1부터 5까지의 별점

          return (
            <button
              type="button"
              key={index}
              className={styles.starButton}
              onClick={() => setRating(currentRating)} // 별을 클릭하면 해당 별점으로 설정
              onMouseEnter={() => setHover(currentRating)} // 마우스를 올리면 호버 상태
              onMouseLeave={() => setHover(null)} // 마우스가 떠나면 호버 해제
            >
              {currentRating <= (hover || rating) ? (
                <FaStar className={styles.star} /> // 채워진 별 아이콘
              ) : (
                <FaRegStar className={styles.star} /> // 빈 별 아이콘
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RatingField;