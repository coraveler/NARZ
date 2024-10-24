import React, { useState } from 'react';
import styles from '../../css/Follow/FollowingItem.module.css';

const FollowerCard = ({ imageUrl, name }) => {
  const [isFollowing, setIsFollowing] = useState(true); // 버튼 상태 관리

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing); // 버튼 클릭 시 상태 변경
  };

  return (
    <article className={styles.followerCard}>
      <img loading="lazy" src={imageUrl} alt={`Profile picture of ${name}`} className={styles.profileImage} />
      <h2 className={styles.userName}>{name}</h2>
      
      {/* 팔로우/언팔로잉 상태에 따라 버튼 텍스트 및 스타일 변경 */}
      <button 
        className={`${styles.followButton} ${!isFollowing ? styles.unfollowButton : ''}`} 
        onClick={handleFollowClick}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
    </article>
  );
};

export default FollowerCard;
