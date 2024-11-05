import React, { useEffect, useState } from 'react';
import styles from '../../css/ProfileInfo.module.css';
import { getLoginInfo } from './CommonUtil'; // getLoginInfo 함수 임포트

const ProfileInfo = ({ rank }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // getLoginInfo 함수를 사용하여 로그인된 사용자 정보 가져오기
    const loginInfo = getLoginInfo();
    if (loginInfo) {
      setUserInfo(loginInfo);
    }
  }, []);

  return (
    <>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        className={styles.profileImage}
        alt="Profile"
      />
      <p className={styles.profileRank}>{rank}</p>
      <p className={styles.profileName}>
        {userInfo?.userNickname || '닉네임 없음'}
      </p>
    </>
  );
};

export default ProfileInfo;