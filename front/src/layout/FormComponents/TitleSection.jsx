import React from "react";
import styles from "../../css/TitleSection.module.css";

function TitleSection() {
  return (
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>당신의 여행을 작성해주세요</h1>
      <p className={styles.requiredFieldsNote}>
        <span className={styles.asterisk}>*</span> 은 필수입니다.
      </p>
    </section>
  );
}

export default TitleSection;