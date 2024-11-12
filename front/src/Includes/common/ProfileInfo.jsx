import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from '../../css/ProfileInfo.module.css';

const ProfileInfo = ({ rank, userId }) => {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({});

  // useEffect(() => {
  //   // getLoginInfo 함수를 사용하여 로그인된 사용자 정보 가져오기
  //   const loginInfo = getLoginInfo();
  //   if (loginInfo) {
  //     setUserInfo(loginInfo);
  //   }
  // }, []);
  const [userInfo, setUserInfo] = useState({});
  
  const getUserInfo = async() => {
    try {
        const response = await api.get(`user/info/${userId}`);
        console.log("debug >>> response,ASDASDASDASD ", response.data);
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
    <div onClick={()=>(navigate(`/personal/${userId}`))}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b27a83d8c5cb2603bbe525f37e40638c4662ab944e1735d12e70886d6fa4e375?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db"
        className={styles.profileImage}
        alt="Profile"
      />
      </div>
      <p className={styles.profileRank}>{rank}</p>
      <p className={styles.profileName}>
        {userInfo?.userNickname || ''}
      </p>
    </>
  );
};

export default ProfileInfo;