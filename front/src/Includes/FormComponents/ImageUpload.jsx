// import React, { useState, useEffect } from "react";
// import styles from '../../css/TrevalWrite/ImageUpload.module.css';

// function ImageUpload({ onChange, postImgUrl }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
//   };

//   const handleRemoveFile = (fileName) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
//   };

//   // useEffect를 사용하여 selectedFiles가 변경될 때 onChange 호출
//   useEffect(() => {
//     onChange(selectedFiles);
//   }, [selectedFiles, onChange]); // selectedFiles가 변경될 때마다 onChange 호출

//   useEffect(() => {
//     if (postImgUrl != null) {
//       const initialFiles = postImgUrl.map((img) => {
//         return { name: img.imagePath.split('/').pop(), url: img.imagePath }; // URL 형태로 저장
//       });
//       setSelectedFiles(initialFiles);
//     }
//   }, [postImgUrl]);

//   const renderPreview = (file) => {
//     // File 객체라면 미리보기 URL을 생성
//     if (file instanceof File) {
//       return URL.createObjectURL(file);
//     }
//     return file.url; // postImgUrl에서 가져온 경우
//   };

//   return (
//     <div className={styles.imageUpload}>
//       <p>이미지</p>
//       <input
//         type="file"
//         id="image-upload"
//         className={styles.fileInput}
//         accept="image/*"
//         multiple
//         hidden
//         onChange={handleImageChange}
//       />
//       <div className={styles.fileList}>
//         {selectedFiles.map((file, index) => (
//           <div key={index} className={styles.fileItem} style={{ width: "80%" }}>
//             <p className={styles.fileName}>{file.name}</p>
//             <img src={renderPreview(file)} alt={file.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//             <button
//               type="button"
//               className={styles.removeButton}
//               onClick={() => handleRemoveFile(file.name)}
//             >
//               삭제
//             </button>
//           </div>
//         ))}
//       </div>
//       <br />
//       <button type="button" className={styles.uploadButton} onClick={() => document.getElementById("image-upload").click()}>
//         파일 첨부
//       </button>
//     </div>
//   );
// }

// export default ImageUpload;


import React, { useState, useEffect } from "react";
import styles from '../../css/TrevalWrite/ImageUpload.module.css';

function ImageUpload({ onChange, postImgUrl }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter(file => 
      !selectedFiles.some(selectedFile => selectedFile.name === file.name)
    ); // 중복 파일 필터링
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
  };

  // useEffect를 사용하여 selectedFiles가 변경될 때 onChange 호출
  useEffect(() => {
    onChange(selectedFiles);
  }, [selectedFiles, onChange]);

  // 기존 이미지 URL을 선택한 파일과 통합
  useEffect(() => {
    if (postImgUrl != null) {
      const initialFiles = postImgUrl.map((img) => {
        return { name: img.imagePath.split('/').pop(), url: img.imagePath }; // URL 형태로 저장
      });
      setSelectedFiles((prevFiles) => [...prevFiles, ...initialFiles]);
    }
  }, [postImgUrl]);

  const renderPreview = (file) => {
    // File 객체라면 미리보기 URL을 생성
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file.url; // postImgUrl에서 가져온 경우
  };

  useEffect(() => {
    // 선택한 파일의 미리보기 URL 해제
    return () => {
      selectedFiles.forEach(file => {
        if (file instanceof File) {
          URL.revokeObjectURL(renderPreview(file));
        }
      });
    };
  }, [selectedFiles]);

  return (
    <div className={styles.imageUpload}>
      <p style={{ fontSize: '25px' }} >이미지</p>
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
            <img src={renderPreview(file)} alt={file.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
