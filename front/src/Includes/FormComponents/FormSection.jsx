import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import FormField from "./FormField";
import RatingField from "./RatingField";
import ImageUpload from "./ImageUpload";
import PrivacyToggle from "./PrivacyToggle";
import styles from '../../css/TrevalWrite/FormSection.module.css';

function FormSection() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 취소 버튼을 클릭했을 때 실행되는 함수
  const handleCancel = () => {
    // 알림 메시지 표시 후, 확인 버튼을 누르면 페이지 이동
    if (window.confirm("내용은 저장되지 않습니다. 계속하시겠습니까?")) {
      navigate("/localboard"); // "/localboard" 페이지로 이동
    }
  };

  // 등록 버튼을 클릭했을 때 실행되는 함수
  const handleSubmit = () => {
    // 알림 메시지 표시 후, 확인 버튼을 누르면 페이지 이동
    if (window.confirm("작성한 글을 등록하시겠습니까?")) {
      navigate("/PostPage"); // "/localboard" 페이지로 이동
    }
  };

  return (
    <form className={styles.formSection}>
      <p className={styles.requiredFieldNote}>
        <span className={styles.requiredStar}>*</span> 은 필수입니다.
      </p>
      <FormField label="제목" type="text" required placeholder="제목을 입력하세요." />
      <FormField
        label="지역"
        type="select"
        placeholder="지역을 선택하세요"
        required
        options={["충북", "충남", "전북", "전남", "경기도", "경남", "경북", "제주", "강원도"]}
      />
      <RatingField />
      <ImageUpload />
      <PrivacyToggle />
      <FormField label="내용" type="textarea" required />
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>글 등록</button>&nbsp;&nbsp;
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default FormSection;
