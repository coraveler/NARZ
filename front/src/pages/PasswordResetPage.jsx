import React, { useEffect, useState } from "react";
import styles from '../css/PasswordResetPage.module.css';
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import { getLoginInfo } from "../Includes/common/CommonUtil";

function PasswordResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loginId, setLoginId] = useState('');
  const [email, setEmail] = useState('');
  const [userCode, setuserCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let loginInfo = getLoginInfo();
    if (loginInfo) {
      setLoginId(loginInfo.loginId);
      setEmail(loginInfo.email);
      setIsReadOnly(true);
    }
  }, []);

  // Input validation function
  const validateInput = (key, value) => {
    switch (key) {
      case "password":
        return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? ""
          : "비밀번호는 영문과 숫자를 포함하여 8자리 이상이어야 합니다.";
      case "passwordConfirm":
        return value === password ? "" : "비밀번호가 일치하지 않습니다.";
      default:
        return "";
    }
  };

  // Form submission validation
  const validateForm = () => {
    const newErrors = {};
    newErrors.password = validateInput("password", password);
    newErrors.passwordConfirm = validateInput("passwordConfirm", passwordConfirm);
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <div className={styles.PageWrapper}>
      <main>
        <h1 className={styles.PageTitle}>비밀번호 재설정</h1>
        <p className={styles.InstructionText}>회원가입시 등록한 이메일을 입력해주세요</p>
        <section className={styles.FormWrapper}>
          <form className={styles.FormContainer}>
            {/* ID Input */}
            <div className={styles.InputGroup}>
              <label className={styles.Label} htmlFor="loginId">ID</label>
              <div className={styles.InputWrapper}>
                <input
                  className={styles.Input}
                  id="loginId"
                  type="text"
                  placeholder="Enter your ID"
                  name="loginId"
                  value={loginId}
                  readOnly={isReadOnly}
                  style={{
                    backgroundColor: isReadOnly ? "#e9e6e6f5" : "white"
                  }}
                  onChange={(event) => setLoginId(event.target.value)}
                />
              </div>
              {/* Email Input */}
              <label className={styles.Label} htmlFor="email">Email</label>
              <div className={styles.InputWrapper}>
                <input
                  className={styles.Input}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  readOnly={isReadOnly}
                  style={{
                    backgroundColor: isReadOnly ? "#e9e6e6f5" : "white"
                  }}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    let 이메일확인 = { loginId, email };
                    console.log("이메일확인", 이메일확인);

                    try {
                      const response = await api.post('user/checkUserInfo', 이메일확인, {
                        headers: { withCredentials: true }
                      });
                      if (response.data==true) {
                        alert("인증번호가 발송되었습니다.");
                        await api.post('emailCheck', { email });
                      } else {
                        alert("일치하는 회원정보가 없습니다.");
                      }
                    } catch (error) {
                      console.error("이메일 인증 요청 오류:", error);
                    }
                  }}
                  className={styles.Button}
                  type="button"
                >
                  인증번호 요청
                </button>
              </div>
            </div>

            {/* Verification Code Input */}
            <div className={styles.InputGroup}>
              <label className={styles.Label} htmlFor="userCode">인증번호</label>
              <div className={styles.InputWrapper}>
                <input
                  className={styles.Input}
                  id="userCode"
                  type="text"
                  placeholder="Enter verification code"
                  onChange={(event) => setuserCode(event.target.value)}
                  disabled={isCodeVerified}
                  style={{
                    backgroundColor: isCodeVerified ? "#e9e6e6f5" : "white"
                  }}
                />
                <button
                  onClick={async (event) => {
                    event.preventDefault();
                    let 인증번호 = { userCode, loginId };
                    console.log("인증번호", 인증번호);

                    try {
                      const response = await api.post('user/checkUserCode', 인증번호, {
                        headers: { withCredentials: true }
                      });
                      if (response.data) {
                        alert("이메일 인증이 완료되었습니다.");
                        setIsCodeVerified(true);
                        
                      } else {
                        alert("인증번호가 틀렸습니다.");
                      }
                    } catch (error) {
                      console.error("인증번호 확인 오류:", error);
                    }
                  }}
                  className={styles.Button}
                  type="button"
                >
                  인증번호 확인
                </button>
              </div>
            </div>

            {/* Password Input */}
            <div className={styles.InputGroup}>
              <label className={styles.Label} htmlFor="password">새 비밀번호</label>
              <input
                className={styles.Input}
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors({ ...errors, password: validateInput("password", event.target.value) });
                }}
                disabled={!isCodeVerified}
              />
              {errors.password && <p className={styles.ErrorText}>{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className={styles.InputGroup}>
              <label className={styles.Label} htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                className={styles.Input}
                id="passwordConfirm"
                type="password"
                placeholder="Confirm new password"
                value={passwordConfirm}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                  setErrors({ ...errors, passwordConfirm: validateInput("passwordConfirm", event.target.value) });
                }}
                disabled={!isCodeVerified}
              />
              {errors.passwordConfirm && <p className={styles.ErrorText}>{errors.passwordConfirm}</p>}
            </div>

            {/* Button Group */}
            <div className={styles.ButtonGroup}>
              <button onClick={() => navigate('/personal/EditProfilePage')} className={styles.CancelButton} type="button">Cancel</button>
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  if (!isCodeVerified) {
                    alert("인증번호 확인 후 비밀번호를 재설정할 수 있습니다.");
                    return;
                  }

                  if (!validateForm()) {
                    alert("모든 입력 사항을 올바르게 입력해주세요.");
                    return;
                  }

                  let 전송할객체 = { loginId, password,passwordConfirm };
                  console.log("전송할객체", 전송할객체);

                  try {
                    const response = await api.patch('user/updatePassword', 전송할객체, {
                      headers: { withCredentials: true }
                    });
                    if (response.data.isUpdate == true) {
                      alert("비밀번호가 수정되었습니다. 다시 로그인해주세요.");
                      localStorage.removeItem('loginInfo');
                      navigate('/LoginFormPage');
                    } else {
                      alert("비밀번호가 일치하지 않습니다.");
                    }
                  } catch (error) {
                    console.error("비밀번호 변경 오류:", error);
                  }
                }}
                className={styles.ResetButton}
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default PasswordResetPage;
