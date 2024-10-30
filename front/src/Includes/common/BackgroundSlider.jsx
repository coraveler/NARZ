import React, { useState, useEffect } from 'react';
import img0 from '../../images/1.png';
import img1 from '../../images/2.png';
import img2 from '../../images/3.png';
import img3 from '../../images/4.png';
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

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
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
        height: '500px',
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      {/* 왼쪽 화살표 버튼 */}
      <div className={`${styles.arrow} ${styles.leftArrow}`} onClick={prevSlide}>
        &lt; {/* 왼쪽 화살표 */}
      </div>

      {/* 오른쪽 화살표 버튼 */}
      <div className={`${styles.arrow} ${styles.rightArrow}`} onClick={nextSlide}>
        &gt; {/* 오른쪽 화살표 */}
      </div>

      {/* 슬라이드 인디케이터 (작은 동그라미) */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
          />
        ))}
      </div>

      
      
    
    </div>
  );
}

export default BackgroundSlider;
