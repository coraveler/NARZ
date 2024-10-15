import React from "react";
import styles from '../../css/ImageUpload.module.css';

function ImageUpload() {
  return (
    <div className={styles.imageUpload}>
      <label htmlFor="image-upload" className={styles.label}>
        이미지첨부 <span className={styles.asterisk}>*</span>
      </label>
      <button type="button" className={styles.uploadButton} onClick={() => document.getElementById('image-upload').click()}>
        이미지 첨부
      </button>
      <input type="file" id="image-upload" className={styles.fileInput} accept="image/*" hidden />
    </div>
  );
}

export default ImageUpload;