import React, { useState } from "react";
import styles from '../css/SignUpFormPage.module.css';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import api from '../api/axios';

function SignUpFormPage({ ...props }) {
  const navigate = useNavigate();

  // formFields 배열 정의
  const formFields = [
    { label: "Nickname", type: "text", hasButton: true, key: "userNickname" },
    { label: "ID", type: "text", hasButton: true, key: "loginId" },
    { label: "Password", type: "password", key: "password" },
    { label: "Confirm_Password", type: "password", key: "passwordConfirm" },
    { label: "Name", type: "text", key: "userName" },
    { label: "Email", type: "email", key: "email" },
    { label: "Phone", type: "tel", key: "phoneNum" }
  ];

  // formData 상태 정의
  const [formData, setFormData] = useState({
    userNickname: "",
    loginId: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    email: "",
    phoneNum: ""
  });

  // 입력값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    console.log(e.target.value)
    console.log([id], e.target.value)
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('user', formData, {
        headers: {
          // Content-Type을 설정하지 않음
         
        }
      })

      if (response.data == true) {
        alert("회원가입이 성공했습니다.")
        navigate('/')


      }
      else {
        alert("회원가입이 실패했습니다.")
      }

    } catch (e) {

    }

  };

  return (
    <main>
      <section className={styles.FormContainer}>
        <br/>
        <br/>
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
                  id={field.key}
                  // 1. **기본값을 빈 문자열로 설정하여 uncontrolled -> controlled 전환 방지**
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  placeholder="Value"
                />
                {field.hasButton && (
                  <button
                    onClick={async (event) => {
                      event.preventDefault();

                      let url = "";

                      if (field.key === "userNickname") {

                          url = `user/check/userNickname/${formData.userNickname}`
                      }
                      else if (field.key === "loginId") {
                          url = `user/check/loginId/${formData.loginId}`

                      }

                    try {
                      const response = await api.get(url);
                     
                      if (response.data == true) {
                          alert("사용가능합니다.");
                      } else {
                         alert("중복입니다.");
                      }

                    } catch (err) {
                          console.log(err);
                      }

                    }
                    }
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
          <div className={styles.ButtonGroup}>
          <button
            type="button"
            onClick={() => navigate('/LoginFormPage')}
            className={styles.StyledCancleButton}
            {...props}
          >
            취소
          </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUpFormPage;
