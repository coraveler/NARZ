import React from "react";
import styles from '../../css/TrevalWrite/FormField.module.css';

function FormField({ label, type, placeholder, required, options, value, onChange }) {
  const id = `${label.toLowerCase()}-input`;

  

  return (
    <div className={styles.formField}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
      {type === 'select' ? (
        <div className={styles.selectWrapper}>
          <select 
            id={id} 
            className={styles.select} 
            required={required} 
            value={value}         // 부모 컴포넌트에서 전달된 value 사용
            onChange={onChange}   // 선택 변경 시 호출되는 함수
          >
            <option value="" disabled>{placeholder}</option> {/* 기본 선택 옵션 */}
            {options && options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : type === 'textarea' ? (
        <textarea 
          id={id} 
          className={styles.textarea} 
          placeholder={placeholder} 
          required={required} 
          value={value}         // 부모 컴포넌트에서 전달된 value 사용
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          required={required}
          value={value}          // 부모에서 전달된 value 사용
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default FormField;
