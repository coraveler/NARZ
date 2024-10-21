import React, { useState, useEffect } from 'react';
import img1 from '../../images/1.jpg'; // 이미지 경로
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import styles from '../../css/BackgroundSlider.module.css'; // CSS 파일

const images = [img1, img2, img3];

function BackgroundSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 이미지 변경
    return () => clearInterval(interval);
  }, []);

  // 이전 이미지로 이동하는 함수
  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 다음 이미지로 이동하는 함수
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={styles.slider}
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '300px', // 슬라이드 영역의 높이 설정 (필요에 따라 조정 가능)
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      {/* 화살표 버튼 */}
      <button className={styles.prevButton} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={styles.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}

export default BackgroundSlider;
