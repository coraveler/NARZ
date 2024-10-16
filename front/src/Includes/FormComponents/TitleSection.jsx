import React from "react";
import styles from '../../css/TrevalWrite/TitleSection.module.css';
function TitleSection() {
  return (
    <section className={styles.titleSection}>
      <h1 className={styles.mainTitle}>당신의 여행을 작성해주세요</h1>
    </section>
  );
}

export default TitleSection;