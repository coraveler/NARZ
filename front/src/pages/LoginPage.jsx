import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import styles from '../css/Login.module.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidLogin = email === 'test@example.com' && password === 'password'; // 테스트

    if (isValidLogin) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // 로그인 후 홈으로 이동
    } else {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className={styles.loginPage}> {/* styles.loginPage로 클래스 적용 */}
      <h2>NARZ</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <Link to="/forgot-password">Forgot password?</Link>
      <Link to="/register">회원가입</Link>
    </div>
  ); 
};

export default LoginPage;
