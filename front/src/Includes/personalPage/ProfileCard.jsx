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

  //지도를 클릭하면 MapPage로 이동
  const handleMapClick = () => {
    navigate('/map');
  };

  //업적을 AcheveivemetPage 페이지로 이동
  const handleAchievementClick = () => {
    navigate('/AchievementPage');
  };

  // 회원정보를 클릭하면 EditProfilePage로 이동
  const handleNameClick = () => {
    navigate('/EditProfilePage');
  };

  //팔로우를 클릭하면 followerPage로 이동
  const followerClick = () => {
    navigate('/follower');
  };

  //팔로잉을 클릭하면 FollowignPage로 이동
  const followingClick = () => {
    navigate('/following');
  };

  return (
    <section className={styles.profileCard}>
      {/* selectedBadge를 rank로 전달 */}
      <ProfileInfo rank={selectedBadge} data={profileData} />

      {/* 회원정보 클릭 시 EditProfilePage로 이동 */}
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
      <div className={styles.profileInfo} onClick={followerClick} >팔로워 {profileData.followers}</div>
      <div className={styles.profileInfo} onClick={followingClick}>팔로잉 {profileData.following}</div>
    </section>
  );
}

export default ProfileCard;
