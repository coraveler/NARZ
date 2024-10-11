import React from 'react';
import styles from '../../css/SelectField.module.css';

const SelectField = ({ placeholder, icon }) => (
  <div className={styles.selectWrapper}>
    {icon && <img src={icon} alt="" className={styles.selectIcon} />}
    <select className={styles.select}>
      <option value="" disabled selected>{placeholder}</option>
    </select>
  </div>
);

export default SelectField;