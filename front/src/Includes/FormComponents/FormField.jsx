import React from "react";
import styles from '../../css/TrevalWrite/FormField.module.css';

function FormField({ label, type, placeholder, required, options }) {
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
            {/* options 배열을 통해 드롭다운 항목을 렌더링 */}
            {options && options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
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