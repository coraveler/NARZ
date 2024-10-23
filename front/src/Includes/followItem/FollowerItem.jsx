import React from 'react';
import styles from '../../css/Follow/FollowerItem.module.css';

const FollowerItem = ({ imageUrl, name }) => {
  return (
    <div className={styles.followerItem}>
      <img loading="lazy" src={imageUrl} alt={`Profile picture of ${name}`} className={styles.profileImage} />
      <div className={styles.userName}>{name}</div>
      <button className={styles.actionButton}>삭제</button>
    </div>
  );
};

export default FollowerItem;