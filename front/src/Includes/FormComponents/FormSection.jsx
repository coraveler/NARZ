import React from "react";
import FormField from "./FormField";
import RatingField from "./RatingField";
import ImageUpload from "./ImageUpload";
import PrivacyToggle from "./PrivacyToggle";
import styles from '../../css/TrevalWrite/FormSection.module.css';

function FormSection() {
  return (
    <form className={styles.formSection}>
      <p className={styles.requiredFieldNote}>
        <span className={styles.requiredStar}>*</span> 은 필수입니다.
      </p>
      <FormField label="제목" type="text" required placeholder="제목을 입력하세요." />
      <FormField label="지역" type="select" placeholder="지역을 선택하세요" required options={["충북", "충남", "전북", "전남", "경기도", "경남", "경북", "제주", "강원도"]} />
      <RatingField />
      <ImageUpload />
      <PrivacyToggle />
      <FormField label="내용" type="textarea" required />
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>글 등록</button>&nbsp;&nbsp;
        <button type="button" className={styles.cancelButton}>취소</button>
      </div>
    </form>
  );
}

export default FormSection;