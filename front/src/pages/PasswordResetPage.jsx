import React from "react";
import styles from '../css/PasswordResetPage.module.css';


function PasswordResetPage() {
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
          <input className={styles.Input} id="newPassword" type="password" placeholder="Enter new password" />
        </div>
        <div className={styles.InputGroup}>
          <label className={styles.Label} htmlFor="confirmPassword">비밀번호 확인</label>
          <input className={styles.Input} id="confirmPassword" type="password" placeholder="Confirm new password" />
        </div>
        <div className={styles.ButtonGroup}>
          <button className={styles.CancelButton}type="button">Cancel</button>
          <button className={styles.ResetButton} type="submit">Reset Password</button>
        </div>
      </form>
    </section>
      </main>
     
    </div>
  );
}


export default PasswordResetPage;