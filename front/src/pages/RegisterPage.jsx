import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link를 임포트
import styles from '../css/Register.module.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직 (예: 서버로 데이터 전송)
    console.log(formData);
  };

  return (
    <div className={styles.signupContainer}>
      <h2>회원정보를 입력해주세요</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>닉네임</label>
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
          <button type="button">중복확인</button>
        </div>

        <div className={styles.formGroup}>
          <label>ID</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
          <button type="button">중복확인</button>
        </div>

        <div className={styles.formGroup}>
          <label>비밀번호</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>전화번호</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit">회원가입</button>
          <button type="button">취소</button>
        </div>
      </form>
      
      <Link to="/login" className={styles.loginLink}>이미 계정이 있으신가요? 로그인하기</Link> {/* 로그인 페이지로 링크 추가 */}
    </div>
  );
}

export default SignupPage;
