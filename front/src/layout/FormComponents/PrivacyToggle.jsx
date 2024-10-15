import React from "react";
import styles from "../../css/PrivacyToggle.module.css";

function PrivacyToggle() {
  return (
    <div className={styles.privacyToggle}>
      <label htmlFor="privacy-toggle" className={styles.label}>
        비밀글
      </label>
      <input
        type="checkbox"
        id="privacy-toggle"
        className={styles.toggleInput}
      />
      <label htmlFor="privacy-toggle" className={styles.toggleSwitch}>
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
}

export default PrivacyToggle;