import React from 'react';
import styles from '../../css/ProfileInfo.module.css';

const ProfileInfo = ({ rank }) => {
  return (
    <>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        className={styles.profileImage}
        alt="Profile"
      />
      {/* 선택된 칭호만 표시 */}
      <p className={styles.profileRank}>{rank}</p>
      <p className={styles.profileName}>name</p>
    </>
  );
};

export default ProfileInfo;
