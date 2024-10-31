import React, { useRef } from 'react';
import MapOverlay from '../../Includes/personalPage/MapOverlay';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import styles from '../../css/Personal/personalpage.module.css';
import html2canvas from 'html2canvas';

function MapPage({ selectedBadge }) {
    const overlayRef = useRef(); // 캡처할 영역을 참조하기 위한 ref

    const handleCapture = () => {
        if (overlayRef.current) {
            const element = overlayRef.current;
            const width = 500; // 원하는 캡처 너비 (80%)
            const height = element.offsetHeight * 0.9; // 원하는 캡처 높이 (80%)

            // 캡처할 영역의 x, y 좌표를 중앙으로 설정
            const x = (element.offsetWidth - width) / 2; 
            const y = (element.offsetHeight - height) / 2 - 50;

            const options = {
                useCORS: true,
                x: x,
                y: y,
                width: width,
                height: height,
            };

            html2canvas(element, options).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'map_capture.png'; // 다운로드할 파일 이름
                link.click(); // 다운로드 실행
            });
        }
    };
    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} />
            
            {/* MapOverlay를 감싸는 div에 ref 설정 */}
            <div ref={overlayRef} className={styles.overlayContainer}>
                <MapOverlay />
            </div>

            <button onClick={handleCapture} style={{ marginTop: '20px' }}>
                캡처하기
            </button>
        </div>
    );
}

export default MapPage;
