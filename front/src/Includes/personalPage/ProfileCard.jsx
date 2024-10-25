import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../css/ProfileCard.module.css';
import ProfileInfo from '../common/ProfileInfo';

function ProfileCard({ selectedBadge }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져오기 위한 훅

  const profileData = {
    name: '회원정보',
    map: '지도',
    travelog: '여행로그', // 추가된 항목
    followers: 0,
    following: 0,
    achievement: '업적'
  };

  // 현재 경로가 일치하는지 확인하는 함수
  const isCurrentPath = (path) => location.pathname === path;

  // 경로 이동 함수들
  const handleMapClick = () => navigate('/map');
  const handleTravelogClick = () => navigate('/travelog'); // travelog 경로로 이동하는 함수
  const handleAchievementClick = () => navigate('/AchievementPage');
  const handleNameClick = () => navigate('/EditProfilePage');
  const followerClick = () => navigate('/follower');
  const followingClick = () => navigate('/following');

  return (
    <section className={styles.profileCard}>
      {/* selectedBadge를 rank로 전달 */}
      <ProfileInfo rank={selectedBadge} data={profileData} />

      {/* 회원정보 클릭 시 EditProfilePage로 이동 */}
      <div
        className={`${styles.profileName} ${
          isCurrentPath('/EditProfilePage') ? styles.activeLink : ''
        }`}
        onClick={handleNameClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.name}
      </div>

      {/* 지도 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/map') ? styles.activeLink : ''
        }`}
        onClick={handleMapClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.map}
      </div>

      {/* travelog */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/travelog') ? styles.activeLink : ''
        }`}
        onClick={handleTravelogClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.travelog}
      </div>

      {/* 업적 링크 */}
      <div
        className={`${styles.achievementLink} ${
          isCurrentPath('/AchievementPage') ? styles.activeLink : ''
        }`}
        onClick={handleAchievementClick}
      >
        {profileData.achievement}
      </div>

      {/* 팔로워, 팔로잉 정보 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/follower') ? styles.activeLink : ''
        }`}
        onClick={followerClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        팔로워 {profileData.followers}
      </div>
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/following') ? styles.activeLink : ''
        }`}
        onClick={followingClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        팔로잉 {profileData.following}
      </div>
    </section>
  );
}

export default ProfileCard;

