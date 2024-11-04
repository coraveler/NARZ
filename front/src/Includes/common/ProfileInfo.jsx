import React, { useEffect, useState } from 'react'; 
import styles from '../../css/ProfileInfo.module.css';
import api from '../../api/axios';

const ProfileInfo = ({ rank, userId }) => {
  const [userInfo, setUserInfo] = useState({});
  
  const getUserInfo = async() => {
    try {
        const response = await api.get(`user/info/${userId}`);
        console.log("debug >>> response, ", response.data);
        setUserInfo(response.data);
    } catch (err) {
        console.log(err);
    }
 }

  useEffect( ()=>{
    if(userId != null){
      getUserInfo();
    }
  },[userId])

  return (
    <>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        className={styles.profileImage}
        alt="Profile"
      />
      {/* 칭호 표시 */}
      <p className={styles.profileRank}>{rank}</p>
      
      {/* 사용자 이름 표시 */}
      <p className={styles.profileName}>
        {/* {data?.userNickname || 'name'}   */}
        {userInfo?.userNickname || 'null'}
      </p>

    </>
  );
};

export default ProfileInfo;
