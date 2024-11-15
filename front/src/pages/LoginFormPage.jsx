import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import NotificationModal from '../Includes/nofification/NotificationModal';
import api from '../api/axios';
import styles from '../css/LoginFormPage.module.css';
import ChatLogin from '../layout/nChat/ChatLogin';

const LoginFormPage = ({nc}) => {
  const navigate = useNavigate();
  let [loginId,setloginId] = useState('');
  const [password,setPassword] = useState('');
  const notificationRef = useRef(null); // NotificationModal에 접근하기 위한 ref 생성
 

  return (
    <main className={styles.container}>
      <form className={styles.loginForm}>
        <h1 className={styles.logo}>NARZ</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="loginId" className={styles.label}>ID</label>
          <input
            type="text"
            id="loginId"
            className={styles.input}
            placeholder="Enter your ID"
            aria-label="text"
            value={loginId}
            onChange={(event)=>{
              console.log(event.target.value);
              setloginId(event.target.value);
              console.debug('아이디확인',loginId);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Enter your password"
            aria-label="Password"
            value={password}
            onChange={(event)=>{
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button} onClick={async(e)=>{
            e.preventDefault();
          
                let 전송할객체 = {
                loginId:loginId,
                password:password
                }

                console.debug('전송할객체',전송할객체)

                try {
                  const response = await api.post('user/login', 전송할객체, {
                    headers: {// Content-Type을 설정하지 않음
                      withCredentials: true,
                    
                    }
                  })
                  console.debug('response.data',response.data);
            
                  if (response.data.isLogin == false) {
                    alert("정보가 일치하지 않습니다.");
                    
                  }
                  else {

                    let data = response.data.userResponseDTO;
                    let expire =(new Date().getTime() + (1 * 8 * 60 * 60 * 1000));
                    let loginInfo = {data,expire};
                     console.log(loginInfo);
                    localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
                    notificationRef.current.loginHandler(); // NotificationModal컴포넌트의 loginHandler()를 함수 실행
                    // alert("로그인되었습니다.");
                    //  navigate('/');
                     window.location.href = '/';
                  }
                } catch (e) {
            
                }
              

            }}>Sign In</button>
        </div>
        <a onClick={() => navigate('/PasswordResetPage')} className={styles.forgotPassword}>Forgot password?</a>
        <a onClick={() => navigate('/SignUPFormPage')} className={styles.signUp}>아직 회원이 아니신가요? </a>
       </form>

      {/* NotificationModal 컴포넌트를 ref와 함께 렌더링 */}
      <NotificationModal ref={notificationRef}/> 
      
    </main>
  );
};

export default LoginFormPage;