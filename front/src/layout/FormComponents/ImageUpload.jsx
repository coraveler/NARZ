import React from 'react';
import styles from '../../css/ImageUpload.module.css';

function ImageUpload() {
  return (
    <div className={styles.imageUpload}>
      <label htmlFor="image-upload" className={styles.label}>
        이미지첨부 <span className={styles.required}>*</span>
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className={styles.fileInput}
      />
      <label htmlFor="image-upload" className={styles.uploadButton}>
        이미지 첨부
      </label>
    </div>
  );
}

export default ImageUpload;