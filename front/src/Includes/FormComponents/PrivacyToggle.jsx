import React from "react";
import styles from '../../css/TrevalWrite/PrivacyToggle.module.css';

function PrivacyToggle() {
  return (
    <div className={styles.privacyToggle}>
      <label htmlFor="privacy-toggle" className={styles.label}>비밀글</label>
      <input type="checkbox" id="privacy-toggle" className={styles.toggleInput} />
      <span className={styles.toggleSlider}></span>
    </div>
  );
}

export default PrivacyToggle;