import React from 'react';
import styles from '../../css/FormField.module.css';


function FormField({ label, type, required, placeholder }) {
  const id = `${label.toLowerCase()}-input`;

  return (
    <div className={styles.formField}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {type === "select" ? (
        <div className={styles.selectWrapper}>
          <select id={id} className={styles.select} required={required}>
            <option value="">{placeholder}</option>
          </select>
        </div>
      ) : type === "textarea" ? (
        <textarea id={id} className={styles.textarea} required={required} />
      ) : (
        <input
          type={type}
          id={id}
          className={styles.input}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default FormField;