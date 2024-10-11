/* 회원가입 페이지 */
import React, { useState } from 'react';
import './Signup.module.css'; // 스타일을 위한 CSS 파일 추가

function Signup() {
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
    <div className="signup-container">
      <h2>회원정보를 입력해주세요</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nickname</label>
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>ID</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
          <button type="button">중복확인</button>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="button-group">
          <button type="submit">회원가입</button>
          <button type="button">취소</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

