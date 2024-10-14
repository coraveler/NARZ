import React from 'react';
import styles from '../../css/FormField.module.css';


const FormField = ({ label, required, children }) => (
  <div className={styles.formField}>
    <div className={styles.labelWrapper}>
      <label className={styles.label}>{label}</label>
      {required && <span className={styles.requiredAsterisk}>*</span>}
    </div>
    {children}
  </div>
);

export default FormField;