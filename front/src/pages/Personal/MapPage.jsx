import html2canvas from 'html2canvas';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import MapShareConfirmModal from '../../Includes/mapshare/MapShareConfirmModal';
import MapShareMoveModal from '../../Includes/mapshare/MapShareMoveModal';
import MapOverlay from '../../Includes/personalPage/MapOverlay';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import api from '../../api/axios';
import styles from '../../css/Personal/personalpage.module.css';

function MapPage({ selectedBadge }) {
    const { urlUserId } = useParams(); // URL에서 userId 추출
    let loginInfo = getLoginInfo();
    const userId = loginInfo?.userId || null;
    const overlayRef = useRef(); // 캡처할 영역을 참조하기 위한 ref

    const [shareConfirmModalStatus, setShareConfirmModalStatus] = useState(false);  // 공유 확인 모달 상태
    const [mapSharePageMoveModalStatus, setMapSharePageMoveModalStatus] = useState(false)   // 지도 공유 페이지 이동 모달 상태

    const handleCapture = () => {
        if (overlayRef.current) {
            const element = overlayRef.current;
            const width = 450; // 원하는 캡처 너비 (80%)
            const height = element.offsetHeight * 0.95; // 원하는 캡처 높이 (80%)

            // 캡처할 영역의 x, y 좌표를 중앙으로 설정
            const x = (element.offsetWidth - width) / 2 + 10;
            const y = (element.offsetHeight - height) / 2 - 10;

            const options = {
                useCORS: true,
                x: x,
                y: y,
                width: width,
                height: height,
            };

            html2canvas(element, options).then(canvas => handleImageUpload(canvas));
        }
    };

    const handleImageUpload = async (canvas) => {
        canvas.toBlob(async (blob) => {
            if (blob) {
                const now = Date.now();
                const item = localStorage.getItem("loginInfo");
                const parseItem = JSON.parse(item);
                const userId = parseItem.data.userId;

                const formData = new FormData();
                formData.append('mapImgUrl', blob, `map_${userId}_${now}`); // 캡처한 이미지를 추가
                formData.append('userId', userId); // 사용자 ID 추가

                try {
                    // 캡쳐한 이미지를 백엔드 서버로 전달
                    const response = await api.post("api/mapshare", formData)
                    if (response.status == 201) {
                        setMapSharePageMoveModalStatus(true);
                        setShareConfirmModalStatus(false);
                    } else {
                        alert("지도 등록에 실패하였습니다. 다시 시도해 주세요.")
                    }

                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            }
        }, 'image/png');
    };


    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} userId={urlUserId!=null ? urlUserId:userId}/>

            {/* MapOverlay를 감싸는 div에 ref 설정 */}
            <div ref={overlayRef} className={styles.overlayContainer}>
                <MapOverlay userId={urlUserId!=null ? urlUserId:userId}/>
            </div>
            
            {urlUserId 
            ?''
            :<button onClick={() => setShareConfirmModalStatus(true)} 
                style={{ marginTop: '20px' }} 
                className={`${styles.shareButton} btn btn-outline-orange`}>
                나의 지도 자랑하기
            </button>}
            
            {/* 맵 공유 선택 모달 */}
            <MapShareConfirmModal
                shareConfirmModalStatus={shareConfirmModalStatus}
                shareConfirmModalClose={() => setShareConfirmModalStatus(false)}
                handleCapture={handleCapture} />

            {/* 지도공유페이지이동모달 */}
            <MapShareMoveModal
                mapSharePageMoveModalStatus={mapSharePageMoveModalStatus}
                mapSharePageMoveModalClose={() => setMapSharePageMoveModalStatus(false)} />
        </div>
    );
}

export default MapPage;
