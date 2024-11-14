import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from '../../css/ProfileInfo.module.css';

const ProfileInfo = forwardRef(({ userId, fontSize }, ref) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useImperativeHandle(ref, () => ({
    getUserInfo
  }));
  
  const getUserInfo = async () => {
    try {
      const response = await api.get(`user/info/${userId}`);
      console.log("debug >>> response, ", response.data);
      setUserInfo(response.data);
      console.log("유저 색상은 --> ", response.data.userColor);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId != null) {
      getUserInfo();
    }
  }, [userId]);

  return (
    <>
      <div onClick={() => navigate(`/personal/${userId}`)}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
          className={styles.profileImage}
          alt="Profile"
        />
      </div>
      {/* achievement를 가져와서 null일 경우 기본값 설정 */}
      <p className={styles.profileRank} style={{fontSize:fontSize}}>
        {userInfo.achievement || "여행 초보자"}
      </p>
      <p className={styles.profileName} style={{ color: userInfo.userColor, fontSize:fontSize }}>
        {userInfo?.userNickname || ''}
      </p>
    </>
  );
});

export default ProfileInfo;