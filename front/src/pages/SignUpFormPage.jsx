import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import styles from '../css/SignUpFormPage.module.css';
import ChatAddUser from "../layout/nChat/ChatAddUser";

function SignUpFormPage({ ...props }) {
  const navigate = useNavigate();

  const formFields = [
    { label: "Nickname", type: "text", hasButton: true, key: "userNickname" },
    { label: "ID", type: "text", hasButton: true, key: "loginId" },
    { label: "Email", type: "email", hasButton: true, key: "email", buttonLabel: "이메일 인증번호 요청" },
    { label: "이메일 인증 코드", type: "text", hasButton: true, key: "emailCode", buttonLabel: "인증코드확인" },
    { label: "Password", type: "password", key: "password" },
    { label: "Confirm Password", type: "password", key: "passwordConfirm" },
    { label: "Name", type: "text", key: "userName" },
    { label: "Phone", type: "tel", key: "phoneNum" }
  ];

  const [formData, setFormData] = useState({
    userNickname: "",
    loginId: "",
    email: "",
    emailCode: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phoneNum: ""
  });

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
 

  const validateInput = (key, value) => {
    switch (key) {
      case "loginId":
        return /^[a-zA-Z0-9]{5,}$/.test(value) && /[a-zA-Z]/.test(value) && /\d/.test(value) ? "" : "영문과 숫자 조합 5자리 이상.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isIdChecked || !isNicknameChecked || !isEmailChecked) {
      alert("아이디와 닉네임, 이메일 중복확인을 완료해주세요.");
      return;
    }

    try {
      const response = await api.post('user', formData);
      if (response.data === true) {
        alert("회원가입이 성공했습니다.");
        setIsSignUpSuccess(true);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (e) {
      console.error("회원가입 오류:", e);
    }
  };

  const handleSendVerificationCode = async () => {
    try {
  
      const response = await api.post('/sendVerificationCode', { email: formData.email }, { withCredentials: true });
      
      if (response.data === true) {
        alert("인증 코드가 이메일로 발송되었습니다.");
        
      } else {
        alert("이미 사용하는 이메일입니다.");
      }
    } catch (error) {
      console.error("인증 코드 요청 오류:", error);
      alert("인증 코드 요청에 실패했습니다. 이메일을 다시 확인해주세요.");
    }
  };

  const handleCheckVerificationCode = async () => {
    try {
      let 이메일코드={email:formData.email,emailCode: formData.emailCode }
      const response = await api.post('/verifyEmailCode', 이메일코드, { withCredentials: true });
      if (response.data === true) {
        alert("인증 코드가 확인되었습니다.");
        setIsEmailChecked(true);
       
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("인증 코드 확인 오류:", error);
      alert("인증 코드 확인에 실패했습니다. 이메일을 다시 확인해주세요.");
    }
  };

  const handleDuplicateCheck = async (field) => {
    let url = "";
    if (field.key === "userNickname") {
      url = `user/check/userNickname/${formData.userNickname}`;
    } else if (field.key === "loginId") {
      url = `user/check/loginId/${formData.loginId}`;
    }

    try {
      const response = await api.get(url);
      if (response.data === true) {
        alert("사용가능합니다.");
        if (field.key === "userNickname") setIsNicknameChecked(true);
        if (field.key === "loginId") setIsIdChecked(true);
      } else {
        alert("중복입니다.");
      }
    } catch (err) {
      console.error("중복 확인 오류:", err);
    }
  };

  return (
    <main><br/>
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
                    (!isIdChecked || !isNicknameChecked || !isEmailChecked)||
                     (field.key === "emailCode" && isEmailChecked) 
                     }
                     style={{
                      backgroundColor: field.key === "emailCode" && isEmailChecked? "#e9e6e6f5" : "white"
                    }}
                    
                />
                {errors[field.key] && <span className={styles.Error}>{errors[field.key]}</span>}
                {field.hasButton && (
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      if (field.key === "email") handleSendVerificationCode();
                      else if (field.key === "emailCode")
                       handleCheckVerificationCode();
                      
                      else await handleDuplicateCheck(field);
                    }}
                    className={styles.StyledButton}
                    {...props}
                  >
                    {field.buttonLabel || "중복확인"}
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
      </section><br/>
    </main>
  );
}

export default SignUpFormPage;
