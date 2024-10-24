import React, { useState } from "react";
import styles from '../css/PasswordResetPage.module.css';
import { useNavigate } from "react-router-dom";

function PasswordResetPage() {
  const navigate = useNavigate();
  const[newPassword, setNewPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');

  return (
    <div className={styles.PageWrapper}>
    
      <main>
        <h1 className={styles.PageTitle}>비밀번호 재설정</h1>
        <p className={styles.InstructionText}>회원가입시 등록한 이메일을 입력해주세요</p>
        <section className={styles.FormWrapper}>
      <form className={styles.FormContainer}>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="email">Email</label>
          <div className={styles.InputWrapper}>
            <input className={styles.Input} id="email" type="email" placeholder="Enter your email" />
            <button className={styles.Button} type="button">인증번호 요청</button>
          </div>
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="verificationCode">인증번호</label>
          <div className={styles.InputWrapper}>
            <input className={styles.Input} id="verificationCode" type="text" placeholder="Enter verification code" />
            <button className={styles.Button} type="button">인증번호 확인</button>
          </div>
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="newPassword">새 비밀번호</label>
          <input 
          className={styles.Input} 
          id="newPassword" 
          type="password" 
          placeholder="Enter new password"
          value={newPassword}
          onChange={(event)=>{
            event.preventDefault();
            console.log(event.target.value)
            setNewPassword(event.target.value)
            console.debug("newPassword",newPassword)

          }}

           />
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="confirmPassword">비밀번호 확인</label>
          <input 
          className={styles.Input} 
          id="confirmPassword" 
          type="password" 
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event)=>{
            event.preventDefault();
            console.log(event.target.value)
            setConfirmPassword(event.target.value)
            console.debug("confirmPassword",confirmPassword)

          }}

           />
        </div>
        <div className={styles.ButtonGroup}>
          <button onClick={() => navigate('/LoginFormPage')}  className={styles.CancelButton}type="button">Cancel</button>
          <button onClick={(event)=>{
            event.preventDefault();
            let 전송할객체={
              "newPassword":newPassword
            }
            console.log("전송할객체",전송할객체)
          }
          }
          className={styles.ResetButton} type="submit">Reset Password</button>
        </div>
      </form>
    </section>
      </main>
     
    </div>
  );
}


export default PasswordResetPage;