import React from 'react';
import styles from '../../css/ImageUpload.module.css';

const ImageUpload = () => (
  <div className={styles.imageUpload}>
    <label htmlFor="imageUpload" className={styles.uploadLabel}>이미지 첨부</label>
    <input type="file" id="imageUpload" className={styles.uploadInput} accept="image/*" />
  </div>
);

export default ImageUpload;