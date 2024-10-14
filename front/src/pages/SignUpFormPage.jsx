import React from "react";
import styles from '../css/SignUpFormPage.module.css';

function SignUpFormPage({ ...props }) {
  const formFields = [
    { label: "Nickname", type: "text", hasButton: true },
    { label: "ID", type: "text", hasButton: true },
    { label: "Password", type: "password" },
    { label: "Confirm Password", type: "password" },
    { label: "Name", type: "text" },
    { label: "Email", type: "email" },
    { label: "Phone", type: "tel" }
  ];

  return (
    <main>
      <section className={styles.FormContainer}>
        <h1 className={styles.FormTitle}>회원정보를 입력해주세요</h1>
        <form>
          {formFields.map((field, index) => (            
              <div key={index} className={styles.FieldWrapper}>
                <label className={styles.Label} htmlFor={`input-${field.label}`}>{field.label}</label>
                <div className={styles.InputWrapper}>
                  <input className={styles.Input} type={field.type} id={`input-${field.label}`} placeholder="Value" />
                  {field.hasButton && <button className={styles.StyledButton} {...props}> 중복확인</button>}
                </div>
              </div>
          ))}
          <div className={styles.ButtonGroup}>
            <button className={styles.StyledButton} {...props}> 회원가입</button>
            <button className={styles.StyledButton} {...props}> 취소</button>

          </div>
        </form>
      </section>
    </main>
  );
}


export default SignUpFormPage;