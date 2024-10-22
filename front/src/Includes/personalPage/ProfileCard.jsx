import React from 'react';
import styles from '../../css/ProfileCard.module.css';
import ProfileInfo from '../common/ProfileInfo';

function ProfileCard() {
  const profileData = {
    name: 'name',
    title: '칭호',
    followers: 0,
    following: 0
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
        <ProfileInfo/>
      <div className={styles.profileInfo}>{profileData.title}</div>
      <div className={styles.profileInfo}>팔로워 {profileData.followers}</div>
      <div className={styles.profileInfo}>팔로잉 {profileData.following}</div>
      <button className={styles.followButton}>
        <span className={styles['visually-hidden']}>Follow user</span>
        + 팔로우
      </button>
    </section>
  );
}

export default ProfileCard;