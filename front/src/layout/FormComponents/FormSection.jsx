import React from "react";
import FormField from "./FormField";
import RatingField from "./RatingField";
import ImageUpload from "./ImageUpload";
import PrivacyToggle from "./PrivacyToggle";
import styles from "../../css/FormSection.module.css";

function FormSection() {
  return (
    <form className={styles.formSection}>
      <FormField label="제목" type="text" required placeholder="제목을 입력하세요." />
      <FormField label="지역" type="select" required placeholder="지역을 선택하세요" />
      <FormField label="Budget" type="select" required placeholder="여행 예산" />
      <RatingField />
      <ImageUpload />
      <PrivacyToggle />
      <FormField label="내용" type="textarea" required />
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>글 등록</button>
        <button type="button" className={styles.cancelButton}>취소</button>
      </div>
    </form>
  );
}

export default FormSection;