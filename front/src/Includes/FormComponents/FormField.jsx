import React from "react";
import styles from '../../css/FormField.module.css';

function FormField({ label, type, placeholder, required }) {
  const id = `${label.toLowerCase()}-input`;

  return (
    <div className={styles.formField}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
      {type === 'select' ? (
        <div className={styles.selectWrapper}>
          <select id={id} className={styles.select} required={required}>
            <option value="">{placeholder}</option>
          </select>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/219ac29619a73d336226963603fa45db0dbd3e7c8d709e0fe78f4f5a593cbaba?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6" alt="" className={styles.selectArrow} />
        </div>
      ) : type === 'textarea' ? (
        <textarea id={id} className={styles.textarea} required={required} />
      ) : (
        <input
          type={type}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}

export default FormField;