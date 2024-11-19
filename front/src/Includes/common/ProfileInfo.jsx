import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from '../../css/ProfileInfo.module.css';

const ProfileInfo = forwardRef(({ userId, fontSize, imgMargin, nameMargin }, ref) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useImperativeHandle(ref, () => ({
    getUserInfo,
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
          // src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
          src={`http://localhost:7777/profileImages/${userInfo.profileImage}`}
          //src={userInfo.profileImage}
          className={styles.profileImage}
          alt="Profile"
          style={{marginRight:imgMargin, 
            objectFit: 'cover', // 원형 안에서 이미지를 잘라서 채움
            objectPosition: 'center', // 이미지를 중앙으로 배치
          }}
        />
      </div>
      {/* achievement가 "여행 초보자"일 경우 폰트와 색상을 다르게 설정 */}
      <p
        className={styles.profileRank}
        style={{
          fontFamily: userInfo.achievement === "여행 초보자" ? 'JSArirangHON-Regular' : 'Cafe24ClassicType-Regular',
          color: userInfo.achievement === "여행 초보자" ? '#a67c00' : '#f2ac2e',
          fontSize:fontSize
        }}
      >
        {userInfo.achievement || "여행 초보자"}
      </p>
      <p className={styles.profileName} style={{ color: userInfo.userColor, fontSize:fontSize, marginLeft:nameMargin }}>
        {userInfo?.userNickname || ''}
      </p>
    </>
  );
});

export default ProfileInfo;
