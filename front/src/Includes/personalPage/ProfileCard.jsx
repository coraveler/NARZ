import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ProfileCard.module.css';
import ProfileInfo from '../common/ProfileInfo';

function ProfileCard({ selectedBadge }) {
  const navigate = useNavigate();

  const profileData = {
    name: '회원정보',
    map: '지도',
    followers: 0,
    following: 0,
    achievement: '업적'
  };

  const handleMapClick = () => {
    navigate('/personal');
  };

  const handleAchievementClick = () => {
    navigate('/AchievementPage');
  };

  // name을 클릭하면 EditProfilePage로 이동
  const handleNameClick = () => {
    navigate('/EditProfilePage');
  };

  return (
    <section className={styles.profileCard}>
      {/* <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        className={styles.profileImage}
        alt="Profile picture"
      />ㄹ
      <h2 className={styles.profileName}>{profileData.name}</h2> */}


        {/* <ProfileInfo/>
      <div className={styles.profileInfo}>{profileData.title}</div> */}


      
      <ProfileInfo rank={selectedBadge} />

      {/* 이름을 클릭하면 EditProfilePage로 이동 */}
      <div className={styles.profileName} onClick={handleNameClick} style={{ cursor: 'pointer', color: 'black' }}>
        {profileData.name}
      </div>

      {/* 지도 */}
      <div className={styles.profileInfo} onClick={handleMapClick} style={{ cursor: 'pointer', color: 'black' }}>
        {profileData.map}
      </div>

      {/* 업적 링크 */}
      <div className={styles.achievementLink} onClick={handleAchievementClick}>
        {profileData.achievement}
      </div>

      {/* 팔로워, 팔로잉 정보 */}
      <div className={styles.profileInfo}>팔로워 {profileData.followers}</div>
      <div className={styles.profileInfo}>팔로잉 {profileData.following}</div>
    </section>
  );
}

export default ProfileCard;
