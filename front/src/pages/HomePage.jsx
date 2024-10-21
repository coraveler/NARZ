import React from 'react';
import BackgroundSlider from '../Includes/common/BackgroundSlider'; // BackgroundSlider 컴포넌트
import RegionSelector from '../Includes/common/region/RegionSelector';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';
import styles from '../css/HeroSection.module.css';

function HomePage() {
  return (
    <div>
      {/* 배경 슬라이더가 섹션의 배경으로 설정 */}
     
        <BackgroundSlider /> {/* 배경 슬라이더 컴포넌트를 여기 추가 */}
     <br/>

      <RegionSelector />

      <div>
        <h3 style={{ marginLeft: 150 }}>주간 인기 게시글 랭킹</h3>
        <div align="center">
          <TravelCardGrid />
        </div>
      </div>
    </div>
  );
}

export default HomePage;



