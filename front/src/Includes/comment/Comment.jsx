import React from 'react';
import styles from '../../css/Comment.module.css';

const Comment = () => {
  return (
    <section className={styles.commentSection}>
      <div className={styles.commentContent}>
        <div className={styles.commentorInfo}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3da876fdd7338a4f3e47dacb3a58a42b14a6c04e402bf02a388890d8580c2363?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
            className={styles.commentorAvatar}
            alt="Commentor's avatar"
          />
          <span className={styles.commentorName}>vname</span>
        </div>
        <p className={styles.commentText}>여행을 떠나요</p>
        <time className={styles.commentDate} dateTime="2024-10-15">
          2024.10.15
        </time>
      </div>
    </section>
  );
};

export default Comment;