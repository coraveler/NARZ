import React, { useState, useEffect } from "react";
import styles from '../../css/TrevalWrite/PrivacyToggle.module.css';

function PrivacyToggle({ onChange, secret }) {
  // 토글 상태를 관리하는 useState 훅
  const [isPrivate, setIsPrivate] = useState(false);

  // 토글 버튼을 클릭했을 때 상태를 변경하는 함수
  const handleToggle = () => {
    const newValue = !isPrivate; // 현재 상태의 반대로 변경
    setIsPrivate(newValue);
    onChange(newValue ? 1 : 0); // 1 또는 0으로 부모에게 전달
  };

  // 초기 상태를 부모로부터 받아오는 경우
  useEffect(() => {
    onChange(isPrivate ? 1 : 0); // 컴포넌트가 처음 렌더링될 때 상태를 전달
  }, []);

  useEffect(() => {
    if(secret != null){
      setIsPrivate(secret);
    }
  }, [secret]);

  return (
    <div className={styles.privacyToggle} onClick={handleToggle}>
      <label htmlFor="privacy-toggle" className={styles.label}>
        비밀글
      </label>
      <input
        type="checkbox"
        id="privacy-toggle"
        className={styles.toggleInput}
        checked={isPrivate} // 토글 상태를 연결
        onChange={handleToggle} // 토글 상태 변경 함수 연결
      />
      <span
        className={`${styles.toggleSlider} ${isPrivate ? styles.checked : ''}`} // 상태에 따라 슬라이더에 클래스 추가
      ></span>
    </div>
  );
}

export default PrivacyToggle;
