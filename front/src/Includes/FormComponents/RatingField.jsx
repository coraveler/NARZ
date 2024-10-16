import React from "react";
import styles from "../../css/TrevalWrite/RatingField.module.css";

function RatingField() {
  return (
    <div className={styles.ratingField}>
      <label className={styles.label}>
        별점 <span className={styles.required}>*</span>
      </label>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c29e824d2f981f45e7ab5c8075e27ecbc4ed7b6f41813ef873af245065442a5?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6" alt="Rating stars" className={styles.ratingStars} />
    </div>
  );
}

export default RatingField;
