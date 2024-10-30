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
    followers: 0,
    following: 0,
    achievement: '도전과제',
    travelog: 'Travelog'
  };

  // 현재 경로가 일치하거나 하위 경로인 경우 스타일 유지
  const isCurrentPath = (path) => location.pathname.startsWith(path);

  // 경로 이동 함수들
  const handleMapClick = () => navigate('/personal/map');
  const handleAchievementClick = () => navigate('/personal/AchievementPage');
  const handleNameClick = () => navigate('/personal/EditProfilePage');
  const followerClick = () => navigate('/personal/follower');
  const followingClick = () => navigate('/personal/following');
  const handleTravelogClick = () => navigate('/board/travelog/all');

  return (
    <section className={styles.profileCard}>
      <ProfileInfo rank={selectedBadge} data={profileData} />

      {/* 회원정보 클릭 시 EditProfilePage로 이동 */}
      <div
        className={`${styles.profileName} ${
          isCurrentPath('/personal/EditProfilePage') ? styles.activeLink : ''
        }`}
        onClick={handleNameClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.name}
      </div>

      {/* 지도 클릭 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/personal/map') ? styles.activeLink : ''
        }`}
        onClick={handleMapClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.map}
      </div>

      {/* Travelog 추가 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/personal/travelog') ? styles.activeLink : ''
        }`}
        onClick={handleTravelogClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.travelog}
      </div>

      {/* 업적 링크 */}
      <div
        className={`${styles.achievementLink} ${
          isCurrentPath('/personal/AchievementPage') ? styles.activeLink : ''
        }`}
        onClick={handleAchievementClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        {profileData.achievement}
      </div>

      {/* 팔로워 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/personal/follower') ? styles.activeLink : ''
        }`}
        onClick={followerClick}
        style={{ cursor: 'pointer', color: 'black' }}
      >
        팔로워 {profileData.followers}
      </div>

      {/* 팔로잉 */}
      <div
        className={`${styles.profileInfo} ${
          isCurrentPath('/personal/following') ? styles.activeLink : ''
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
