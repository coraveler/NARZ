import React, { useState } from 'react';
import styles from '../../css/Follow/FollowingItem.module.css';

const FollowerCard = ({ imageUrl, name }) => {
  // 버튼 상태 관리: true면 '팔로잉', false면 '팔로우'
  const [isFollowing, setIsFollowing] = useState(true);

  // 버튼 클릭 시 상태 변경
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className={styles.followerCard}>
      <img loading="lazy" src={imageUrl} alt={`Profile picture of ${name}`} className={styles.profileImage} />
      <h2 className={styles.userName}>{name}</h2>
      <button className={styles.followButton} onClick={toggleFollow}>
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </article>
  );
};

export default FollowerCard;
