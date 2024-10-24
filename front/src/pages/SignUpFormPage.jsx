import React, { useState } from "react";
import styles from '../css/SignUpFormPage.module.css';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

function SignUpFormPage({ ...props }) {
  const navigate = useNavigate();
  
  // formFields 배열 정의
  const formFields = [
    { label: "Nickname", type: "text", hasButton: true },
    { label: "ID", type: "text", hasButton: true },
    { label: "Password", type: "password" },
    { label: "Confirm Password", type: "password" },
    { label: "Name", type: "text" },
    { label: "Email", type: "email" },
    { label: "Phone", type: "tel" }
  ];

  // formData 상태 정의
  const [formData, setFormData] = useState({
    Nickname: "",
    ID: "",
    Password: "",
    ConfirmPassword: "",
    Name: "",
    Email: "",
    Phone: ""
  });

  // 입력값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    console.log(e.target.value)
    console.log( [id],e.target.value)
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // 추가적인 로직 처리
  };

  return (
    <main>
      <section className={styles.FormContainer}>
        <h1 className={styles.FormTitle}>회원정보를 입력해주세요</h1>
        
        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} className={styles.FieldWrapper}>
              <label className={styles.Label} htmlFor={field.label}>
                {field.label}
              </label>
              <div className={styles.InputWrapper}>
                <input
                  className={styles.Input}
                  type={field.type}
                  id={field.label}
                  // 1. **기본값을 빈 문자열로 설정하여 uncontrolled -> controlled 전환 방지**
                  value={formData[field.label] || ""}
                  onChange={handleInputChange}
                  placeholder="Value"
                />
                {field.hasButton && (
                  <button
                    onClick={(event) => {
                      event.preventDefault(); // 기본 동작 방지
                      let 보내야할객체 = {
                        id: `input-${field.label}`, // 중복확인할 ID 전송
                      };
                      console.log("보내야할객체", 보내야할객체); // 콘솔에 출력
                    }}
                    className={styles.StyledButton}
                    {...props}
                  >
                    중복확인
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className={styles.ButtonGroup}>
            <button className={styles.StyledButton} type="submit" {...props}>
              회원가입
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/LoginFormPage')}
            className={styles.StyledCancleButton}
            {...props}
          >
            취소
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignUpFormPage;
