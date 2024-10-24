import React from 'react';
import MapOverlay from '../Includes/personalPage/MapOverlay';
import ProfileCard from '../Includes/personalPage/ProfileCard';
import styles from '../css/Personal/personalpage.module.css';
function MapPage({ selectedBadge }) {
    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            
            <div className={styles.centeredMap}>
                ooo's Map
            </div>

            <MapOverlay />
        </div>
    );
}

export default MapPage;
