import React from 'react';
import FormField from '../Includes/FormComponents/FormField';
import SelectField from '../Includes/FormComponents/SelectField';
import ImageUpload from '../Includes/FormComponents/ImageUpload';
import ToggleSwitch from '../Includes/FormComponents/ToggleSwitch';
import StarRating from '../Includes/FormComponents/StarRating';
import styles from '../css/TravelForm.module.css';

const TravelForm = () => {
  return (
    <form className={styles.travelForm}>
      <header className={styles.formHeader}>
        <p className={styles.requiredNote}>
          <span className={styles.requiredAsterisk}>*</span> 은 필수입니다.
        </p>
      </header>

      <main className={styles.formContent}>
        <FormField label="제목" required>
          <input type="text" className={styles.titleInput} placeholder="제목을 입력하세요." />
        </FormField>

        <FormField label="지역" required>
          <SelectField placeholder="지역을 선택하세요" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/219ac29619a73d336226963603fa45db0dbd3e7c8d709e0fe78f4f5a593cbaba?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6" />
        </FormField>

        <FormField label="Budget" required>
          <SelectField placeholder="여행 예산" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/674d1af82370d580ac0dfe5d97f245cf71574d7bb5462e267ea3b248fe5b6101?placeholderIfAbsent=true&apiKey=48204828aedf4b3e9d1bc563b87457c6" />
        </FormField>

        <StarRating />

        <div className={styles.imageUploadWrapper}>
          <FormField label="이미지첨부" required>
            <ImageUpload />
          </FormField>
        </div>

        <div className={styles.privacyToggle}>
          <ToggleSwitch label="비밀글" />
        </div>

        <FormField label="내용" required>
          <textarea className={styles.contentTextarea}></textarea>
        </FormField>
      </main>
    </form>
  );
};

export default TravelForm;