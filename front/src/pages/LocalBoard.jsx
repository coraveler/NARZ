import React from 'react';
import RegionSelector from '../Includes/common/region/RegionSelector';
import ReviewSection from '../Includes/localboard/ReviewSection';
import TravelCardGrid from '../Includes/common/card/TravelCardGrid';

function LocalBoard() {
    return (
        <div>
            <div>
                <RegionSelector />
            </div>
            <div>
                <ReviewSection/>
            </div>
            <div align="center">
                <TravelCardGrid/>
            </div>
        </div>
    );
}

export default LocalBoard;