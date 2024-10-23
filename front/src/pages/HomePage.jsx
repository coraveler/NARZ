import React from 'react';
import BackgroundSlider from '../Includes/common/BackgroundSlider'; 
import RegionSelector from '../Includes/common/region/RegionSelector';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';

function HomePage() {
  return (
    <div>
     
     
        <BackgroundSlider /> 
     <br/>

      <RegionSelector />

      <div>
        <br/>
        <h3 style={{ marginLeft: 150 }}>주간 인기 게시글 랭킹</h3>
        <div align="center">
          <TravelCardGrid />
        </div>
      </div>
      <br/>
      <div>
        <h3 style={{ marginLeft: 150 }}>주간 활동 랭킹</h3>
        <div align="center">
          <TravelCardGrid />
        </div>
      </div>
      <br/>
      <div>
        <h3 style={{ marginLeft: 150 }}>팔로잉 게시판</h3>
        <div align="center">
          <TravelCardGrid />
        </div>
      </div>
      <br/><br/>
    </div>
  );
}

export default HomePage;



