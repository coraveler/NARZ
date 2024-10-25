import React from 'react';
import MapOverlay from '../../Includes/personalPage/MapOverlay';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import PaginationComponent from '../../Includes/common/PaginationComponent';
import TravelCardGrid from '../../Includes/common/card/TravelCardGrid';
import styles from '../../css/Personal/personalpage.module.css';

function PersonalPage({ selectedBadge }) {
    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            
            <div className={styles.centeredMap}>
                ooo's Map
            </div>

            <MapOverlay />

            <div className={styles.centeredMap}>
                000's Travelog
            </div>

            <TravelCardGrid />
            <PaginationComponent />
        </div>
    );
}

export default PersonalPage;
