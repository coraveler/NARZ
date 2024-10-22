import React from 'react';
import MapOverlay from '../Includes/personalPage/MapOverlay';
import ProfileCard from '../Includes/personalPage/ProfileCard';
import PaginationComponent from '../Includes/common/PaginationComponent';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';

function PersonalPage({ selectedBadge }) {
    return (
        <div align="center">
            <ProfileCard selectedBadge={selectedBadge} />
            <div align="center" style={{marginTop: "50px", fontSize:"40px" }}>
                ooo's Map
            </div>
            <MapOverlay/>
            <div align="left" style={{ fontSize:"40px", width:"950px"}}>
                ooo's All Travel
            </div>
            <TravelCardGrid/>
            <PaginationComponent/>
            
        </div>
    );
}

export default PersonalPage;