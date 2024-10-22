import React from 'react';
import styles from '../../../css/TravelCard.module.css';
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa"; // 빈 별과 채워진 별 아이콘
import { FaRegStarHalfStroke } from "react-icons/fa6"; // 반 별 아이콘

const TravelCard = (props) => {
  const navigate = useNavigate();
  return (
    <article className={styles.travelCard} onClick={() => navigate('/postpage')}>
      <img src={"#"} alt={`${props.data.title} view`} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{props.data.title}</h2>
      <p className={styles.cardLocation}>{props.data.userId}</p>
      <div className={styles.ratingField}>
      <div className={styles.starContainer}>
        {/* 5개의 별을 렌더링 */}
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1; // 1부터 5까지의 별점

          return (
            <span key={index} className={styles.starButton}>
              {props.data.rating > currentRating ? (
                <FaStar className={styles.star} /> // 채워진 별 아이콘
              ) : props.data.rating >= currentRating - 0.5 ? (
                <FaRegStarHalfStroke className={styles.star} /> // 반 별 아이콘
              ) : (
                <FaRegStar className={styles.star} /> // 빈 별 아이콘
              )}
            </span>
          );
        })}
      </div>
      
    </div>
    </article>
  );
};

export default TravelCard;