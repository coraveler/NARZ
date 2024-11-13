import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import styles from '../../css/ProfileInfo.module.css';

const ProfileInfo = forwardRef(({ rank, userId }, ref) => {
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

  // 부모 컴포넌트에서 함수를 호출할 수 있도록 ref를 사용하여 노출합니다.
  useImperativeHandle(ref, ()=>({
    getUserInfo
  }))
  
  const getUserInfo = async() => {
    try {
        const response = await api.get(`user/info/${userId}`);
        console.log("debug >>> response,ASDASDASDASD ", response.data);
        setUserInfo(response.data);
        console.log("유저 색상은 --> ",response.data.userColor)
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
      <p className={styles.profileName} style={{color: userInfo.userColor}}>
        {userInfo?.userNickname || ''}
      </p>
    </>
  );
});

export default ProfileInfo;