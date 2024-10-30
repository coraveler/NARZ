import React, { useEffect, useState } from 'react';
import styles from '../css/LoginFormPage.module.css';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const LoginFormPage = () => {
  const navigate = useNavigate();
  let [email,setEmail] = useState('');
  const [pw,setPw] = useState('');
 

  return (
    <main className={styles.container}>
      <form className={styles.loginForm}>
        <h1 className={styles.logo}>NARZ</h1>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="Enter your email"
            aria-label="Email"
            value={email}
            onChange={(event)=>{
              console.log(event.target.value);
              setEmail(event.target.value);
              console.debug('이메일값확인',email);
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
            value={pw}
            onChange={(event)=>{
                setPw(event.target.value);
            }}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button} onClick={(e)=>{
            e.preventDefault();
          
                let 전송할객체 = {
                email:email,
                pw:pw
                }

                console.debug('전송할객체',전송할객체)
              

            }}>Sign In</button>
        </div>
        <a onClick={() => navigate('/PasswordResetPage')} className={styles.forgotPassword}>Forgot password?</a>
        <a onClick={() => navigate('/SignUPFormPage')} className={styles.signUp}>아직 회원이 아니신가요? </a>
      </form>
    </main>
  );
};

export default LoginFormPage;