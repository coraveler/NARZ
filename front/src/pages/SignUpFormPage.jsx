import React, { useState } from "react";
import styles from '../css/SignUpFormPage.module.css';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import api from '../api/axios';
import ChatAddUser from "../layout/nChat/ChatAddUser";

function SignUpFormPage({ ...props }) {
  const navigate = useNavigate();

  // formFields 배열 정의
  const formFields = [
    { label: "Nickname", type: "text", hasButton: true, key: "userNickname" },
    { label: "ID", type: "text", hasButton: true, key: "loginId" },
    { label: "Email", type: "email", hasButton: true, key: "email" },
    { label: "Password", type: "password", key: "password" },
    { label: "Confirm Password", type: "password", key: "passwordConfirm" },
    { label: "Name", type: "text", key: "userName" },

    { label: "Phone", type: "tel", key: "phoneNum" }
  ];

  // formData 상태 정의
  const [formData, setFormData] = useState({
    userNickname: "",
    loginId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    userName: "",

    phoneNum: ""
  });

  //중복확인 여부를 저장
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 오류 메시지를 저장
  const [errors, setErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // 유효성 검사 함수
  const validateInput = (key, value) => {
    switch (key) {
      case "loginId":
        return /^[a-zA-Z0-9]+$/.test(value) && /[a-zA-Z]/.test(value) && /\d/.test(value) ? "" : "영문과 숫자 조합.";

      case "userName":
        return /^[가-힣]+$/.test(value) ? "" : "한글로 작성하세요.";

      case "phoneNum":
        return /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(value) ? "" : "전화번호를 확인하세요.";

      case "email":
        return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value) ? "" : "이메일을 확인하세요.";

      case "password":
        return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? "" : "영문과 숫자를 포함한 8자리 이상.";

      case "passwordConfirm":
        return value === formData.password ? "" : "비밀번호가 일치하지 않습니다.";

      default:
        return "";
    }
  };

  // 입력값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    setErrors({
      ...errors,
      [id]: validateInput(id, value)
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdChecked || !isNicknameChecked || !isEmailChecked) {
      alert("아이디와 닉네임, 이메일 중복확인을 완료해주세요.");
      return;
    }

    try {
      const response = await api.post('user', formData, {
        headers: {

        }
      })

      if (response.data === true) {
        alert("회원가입이 성공했습니다.")
        setIsSignUpSuccess(true);
      } else {
        alert("회원가입에 실패했습니다.")
      }

    } catch (e) {
    }
  };

  return (
    <main>
      <section className={styles.FormContainer}>
        <h1 className={styles.FormTitle}>회원정보를 입력해주세요</h1>

        <form onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <div key={index} className={styles.FieldWrapper}>
              <label className={styles.Label} htmlFor={field.key}>
                {field.label}
              </label>
              <div className={styles.InputWrapper}>
                <input
                  className={styles.Input}
                  type={field.type}
                  id={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  placeholder="Value"
                  disabled={
                    (field.key === "password" || field.key === "passwordConfirm" ||
                      field.key === "userName" || field.key === "phoneNum") &&
                    (!isIdChecked || !isNicknameChecked || !isEmailChecked)
                  }
                />
                {errors[field.key] && <span className={styles.Error}>{errors[field.key]}</span>}
                {field.hasButton && (
                  <button
                    onClick={async (event) => {
                      event.preventDefault();

                      let url = "";
                      let key = field.key;

                      // 중복확인 요청 전에 유효성 검사 수행
                      const validationError = validateInput(key, formData[key]);
                      if (validationError) {

                        return; // 유효하지 않으면 중복 확인 요청을 보내지 않음
                      }

                      // 유효성 검사 통과 시 URL 설정
                      if (key === "userNickname") {
                        url = `user/check/userNickname/${formData.userNickname}`;
                      } else if (key === "loginId") {
                        url = `user/check/loginId/${formData.loginId}`;
                      } else if (key === "email") {
                        url = `user/check/email/${formData.email}`;
                      }

                      try {
                        const response = await api.get(url);
                        if (response.data === true) {
                          alert("사용가능합니다.");
                          if (key === "userNickname") setIsNicknameChecked(true);
                          else if (key === "loginId") setIsIdChecked(true);
                          else if (key === "email") setIsEmailChecked(true);
                        } else {
                          alert("중복입니다.");
                        }
                      } catch (err) {
                        console.log("중복 확인 오류:", err);
                      }
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
            <button className={styles.StyledSubmitButton} type="submit" {...props}>
              회원가입
            </button>
          </div>
          <div className={styles.ButtonGroup}>
            <button
              type="button"
              onClick={() => navigate('/LoginFormPage')}
              className={styles.StyledSubmitButton}
              {...props}
            >
              취소
            </button>
          </div>
        </form>
        {isSignUpSuccess && (
          <ChatAddUser
            id={formData.loginId}
            userNickname={formData.userNickname}
            onAddUser={(success) => {
              if (success) navigate('/');
            }}
          />
        )}
      </section>
    </main>
  );
}

export default SignUpFormPage;
