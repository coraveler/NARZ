import React from 'react';
import styles from '../../css/ToggleSwitch.module.css';

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className={styles.toggleSwitch}>
    <label className={styles.switchLabel}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.switchInput}
      />
      <span className={styles.slider}></span>
    </label>
  </div>
);

export default ToggleSwitch;