import React from 'react';
import styles from '../../../css/TravelCard.module.css';
import { useNavigate } from "react-router-dom";

const TravelCard = ({ title, location, imageSrc, rating }) => {
  const navigate = useNavigate();
  return (
    <article className={styles.travelCard} onClick={() => navigate('/postpage')}>
      <img src={imageSrc} alt={`${title} view`} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardLocation}>{location}</p>
      <div className={styles.ratingContainer} >
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src={`http://b.io/ext_${index + 1}-`}
            alt=""
            className={styles.ratingIcon}
          />
        ))}
      </div>
    </article>
  );
};

export default TravelCard;