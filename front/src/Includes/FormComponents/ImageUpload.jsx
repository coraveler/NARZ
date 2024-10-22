import React, { useState, useEffect } from "react";
import styles from '../../css/TrevalWrite/ImageUpload.module.css';

function ImageUpload({ onChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };

  // useEffect를 사용하여 selectedFiles가 변경될 때 onChange 호출
  useEffect(() => {
    onChange(selectedFiles);
  }, [selectedFiles, onChange]); // selectedFiles가 변경될 때마다 onChange 호출

  return (
    <div className={styles.imageUpload}>
      <p>이미지</p>
      <input
        type="file"
        id="image-upload"
        className={styles.fileInput}
        accept="image/*"
        multiple
        hidden
        onChange={handleImageChange}
      />
      <div className={styles.fileList}>
        {selectedFiles.map((file, index) => (
          <div key={index} className={styles.fileItem} style={{ width: "80%" }}>
            <p className={styles.fileName}>{file.name}</p>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => handleRemoveFile(file.name)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <br />
      <button type="button" className={styles.uploadButton} onClick={() => document.getElementById("image-upload").click()}>
        파일 첨부
      </button>
    </div>
  );
}

export default ImageUpload;
