import React from 'react';
import MapOverlay from '../Includes/personalPage/MapOverlay';
import ProfileCard from '../Includes/personalPage/ProfileCard';

function MapPage({ selectedBadge }) {
    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            
            <div align="center" style={{ marginTop: "50px", fontSize:"40px" }}>
                ooo's Map
            </div>

            <MapOverlay />
        </div>
    );
}

export default MapPage;
