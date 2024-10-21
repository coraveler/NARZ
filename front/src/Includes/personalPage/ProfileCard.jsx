import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ProfileCard.module.css';
import ProfileInfo from '../common/ProfileInfo';

function ProfileCard({ selectedBadge }) {
  const navigate = useNavigate();

  const profileData = {
    name: 'name',
    map: '지도',
    followers: 0,
    following: 0,
    achievement: '업적' // profileData에 업적 정보 추가
  };

  // 지도 클릭 시 PersonalPage로 이동하는 함수
  const handleMapClick = () => {
    navigate('/personal');
  };

  // 업적 페이지로 이동하는 함수
  const handleAchievementClick = () => {
    navigate('/AchievementPage');
  };

  return (
    <section className={styles.profileCard}>
      {/* 선택된 칭호를 ProfileInfo에 전달 */}
      <ProfileInfo rank={selectedBadge} />

      {/* '지도' 항목 클릭 시 PersonalPage로 이동 */}
      <div className={styles.profileInfo} onClick={handleMapClick} style={{ cursor: 'pointer', color: 'black' }}>
        {profileData.map}
      </div>

      {/* profileData 내에 있는 achievement를 클릭 가능한 <div>로 구현 */}
      <div 
        className={styles.achievementLink} 
        onClick={handleAchievementClick} 
        style={{ cursor: 'pointer', marginTop: '10px', color: 'black' }}
      >
        {profileData.achievement}
      </div>

      {/* 팔로워, 팔로잉 정보를 표시 */}
      <div className={styles.profileInfo}>팔로워 {profileData.followers}</div>
      <div className={styles.profileInfo}>팔로잉 {profileData.following}</div>

      {/* 팔로우 버튼 */}
      <button className={styles.followButton}> 
        <span className={styles['visually-hidden']}>Follow user</span>
        + 팔로우
      </button>

      
    </section>
  );
}

export default ProfileCard;
