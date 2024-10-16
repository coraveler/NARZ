import React, { useState } from "react";
import styles from '../../css/TrevalWrite/ImageUpload.module.css';

function ImageUpload() {
  // 선택된 파일을 저장하는 상태 변수
  const [selectedFiles, setSelectedFiles] = useState([]);

  // 파일이 선택되었을 때 처리하는 함수
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // 파일들을 배열로 변환
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);  // 기존 파일에 새 파일 추가
  };

  // 파일 삭제 함수
  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName)); // 파일을 삭제
  };

  return (
    <div className={styles.imageUpload}>
      {/* 버튼: 이미지 업로드 */}
      <p>이미지</p> 
      {/* 여러 파일 선택을 위한 input */}
      <input
        type="file"
        id="image-upload"
        className={styles.fileInput}
        accept="image/*"
        multiple
        hidden
        onChange={handleImageChange}
      />
      {/* 선택된 파일 목록 표시 */}
      <div className={styles.fileList}>
        {selectedFiles.map((file, index) => (
          <div key={index} className={styles.fileItem}>
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
      <br/>
      <button type="button" className={styles.uploadButton} onClick={() => document.getElementById("image-upload").click()}>
        파일 첨부
      </button>

      
    </div>
  );
}

export default ImageUpload;
