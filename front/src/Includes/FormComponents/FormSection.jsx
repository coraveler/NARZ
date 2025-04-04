import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import { checkAllRegionsCoverage, checkPostCount } from "../../api/achievementService";
import api from '../../api/axios';
import styles from '../../css/TrevalWrite/FormSection.module.css';
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import PrivacyToggle from "./PrivacyToggle";
import RatingField from "./RatingField";

function FormSection({ post, postImgUrl, handleRefreshMileage }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const [local, setLocal] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState();
  const [secret, setSecret] = useState();
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지 상태 추가
  let loginInfo = getLoginInfo();
  const userId = loginInfo.userId || null;

  const ratingRef = useRef(null);  // 별점 입력 필드를 참조하는 ref
  const imageUploadRef = useRef(null);  // 이미지 업로드 필드를 참조하는 ref

  const localMapping = {
    "수도권": "sudo",
    "강원": "gangwon",
    "충북": "chungbuk",
    "충남": "chungnam",
    "대전": "daejeon",
    "경북": "gyeonbuk",
    "경남": "gyeongnam",
    "전북": "jeonbuk",
    "전남": "jeonnam",
    "제주": "jeju"
  };
  // 취소 버튼을 클릭했을 때 실행되는 함수
  const handleCancel = () => {
    // 알림 메시지 표시 후, 확인 버튼을 누르면 페이지 이동
    if (window.confirm("내용은 저장되지 않습니다. 계속하시겠습니까?")) {
      navigate("/board/localboard/all"); // "/localboard" 페이지로 이동
    }
  };

  const postSave = async () => {

    const mappedLocal = localMapping[local];

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('local', mappedLocal);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('secret', secret);

    images.forEach((image) => {
      formData.append('images', image); // 'images'는 서버에서 기대하는 필드 이름
    });

    try {
      const response = await api.post('post/save', formData, {
        headers: {
          // Content-Type을 설정하지 않음

        }
      });
      console.log(response.data);
      getPoints();
      checkPostCount(userId, 2); // 게시글 등록 칭호 확인
      checkAllRegionsCoverage(userId); // 모든 지역 게시물 작성 칭호 확인
      alert("글작성 완료");
      navigate(`/postpage/${response.data}`)
    } catch (err) {
      console.error(err);
    }
  };


  const postEdit = async () => {

    const mappedLocal = localMapping[local];

    const formData = new FormData();
    formData.append('postId', post.postId);
    formData.append('userId', userId);
    formData.append('local', mappedLocal);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('rating', rating);
    formData.append('secret', secret);

    const existingFiles = await Promise.all(existingImages.map(async (image) => {
      const response = await fetch(image.imagePath);
      const blob = await response.blob();
      const fileName = image.imagePath.split('/').pop(); // 파일 이름 추출
      return new File([blob], fileName, { type: blob.type });
    }));

    const existingImageNames = new Set(images.map(image => image.name));

    existingFiles.forEach((file) => {
      if (existingImageNames.has(file.name)) {
        formData.append('images', file); // 서버에서 기대하는 필드 이름
      }
    });


    images.forEach((image) => {
      formData.append('images', image); // 'images'는 서버에서 기대하는 필드 이름
    });

    try {
      const response = await api.post('post/edit', formData, {
        headers: {
          // Content-Type을 설정하지 않음

        }
      });
      console.log(response.data);
      alert("글작성 완료");
      navigate(`/postpage/${response.data}`)
    } catch (err) {
      console.error(err);
    }
  };
  const handleLocalChange = (event) => {
    setLocal(event.target.value);
    setCurrentLocal(event.target.value)
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSecretChange = (newSecret) => {
    setSecret(newSecret);
  }

  const handleImageUpload = (newImages) => {
    setImages(newImages)
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    if (!rating ) {
      ratingRef.current.scrollIntoView({ behavior: 'smooth',  block: 'center' });
      return;
    }
    if (images.length === 0 && imageUploadRef.current) {
      imageUploadRef.current.scrollIntoView({ behavior: 'smooth',  block: 'center',  });
      return;
    }
    await postSave(); // 데이터 저장 함수 호출
  };

  const handleEdit = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    if (!rating && ratingRef.current) {
      ratingRef.current.scrollIntoView({ behavior: 'smooth',  block: 'center',  });
      return;
    }
    if (images.length === 0 && imageUploadRef.current) {
      imageUploadRef.current.scrollIntoView({ behavior: 'smooth',  block: 'center',  });
      return;
    }
    await postEdit(); // 데이터 저장 함수 호출
  };

  useEffect(() => {
    if (post != null) {
      console.log(post);
      setTitle(post.title);
      setRating(post.rating);
      setSecret(post.secret);
      setContent(post.content);
      setExistingImages(postImgUrl || []);
      setCurrentLocal(post.local)
      setLocal(post.local || '');
    }
  }, [post]); // post가 변경될 때마다 실행


  // 가져온 현재 지역
  const [currentLocal, setCurrentLocal] = useState('');


  const getPoints = async () => {
    const mileagePoints = 50;
    const description = `글작성`;
    try {
      const response = await fetch(
        "http://localhost:7777/api/mileage/history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            mileagePoints: mileagePoints,
            description: description,
          }),
        }
      );
      if (response.ok) {
        handleRefreshMileage();
      } 
      
    } catch (error) {
      alert("구매에 실패했습니다: " + error.message);
    }
  };

  

  return (
    <form className={styles.formSection} onSubmit={post != null ? handleEdit : handleSubmit}>
      <p className={styles.requiredFieldNote}>
        <span className={styles.requiredStar}>*</span> 은 필수입니다.
      </p>

      <FormField
        label="지역"
        type="select"
        placeholder="지역을 선택하세요"
        required
        options={["수도권", "충북", "충남", "전북", "전남", "경남", "경북", "제주", "강원", "대전"]}
        value={post ? currentLocal : local}
        onChange={handleLocalChange}
      />
      <FormField label="제목" type="text" required placeholder="제목을 입력하세요." value={title} onChange={handleTitleChange} />
      <FormField label="내용" type="textarea" required value={content} onChange={handleContentChange} />
      {
        post != null ?
          <div>
            <RatingField ref={ratingRef} onChange={handleRatingChange} postRating={post.rating} />
            <ImageUpload ref={imageUploadRef} onChange={handleImageUpload} postImgUrl={existingImages} />

            <PrivacyToggle onChange={handleSecretChange} secret={post.secret} />
          </div> :
          <div>
            <RatingField ref={ratingRef} onChange={handleRatingChange} />
            <ImageUpload ref={imageUploadRef} onChange={handleImageUpload} />

            <PrivacyToggle onChange={handleSecretChange} />
          </div>
      }
      <hr />
      <div className={styles.formActions}>
        {
          post != null ? <button type="submit" className={styles.submitButton}>글 수정</button> :
            <button type="submit" className={styles.submitButton}>글 등록</button>
        }
        &nbsp;&nbsp;
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default FormSection;
