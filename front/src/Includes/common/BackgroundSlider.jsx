import React, { useState, useEffect } from 'react';
import img0 from '../../images/homepage.webp';
import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import styles from '../../css/BackgroundSlider.module.css';

const images = [img0, img1, img2, img3];

function BackgroundSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        height: '500px', // 원하는 높이로 조정
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      {/* 오른쪽 화살표 버튼 */}
      <div className={styles.arrow} onClick={nextSlide}>
        &gt; {/* 오른쪽 화살표 */}
      </div>

      {/* 첫 번째 이미지일 때만 텍스트 표시 */}
      {currentImageIndex === 0 && (
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            나만 알고싶은 지역, 나알지
          </h1>
        </div>
      )}
    </div>
  );
}

export default BackgroundSlider;
