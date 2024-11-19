import React, { useEffect, useState } from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { getLoginInfo } from "../../Includes/common/CommonUtil";
import TravelCardGrid from '../../Includes/common/card/TravelCardGrid';
import MapOverlay from '../../Includes/personalPage/MapOverlay';
import ProfileCard from '../../Includes/personalPage/ProfileCard';
import api from "../../api/axios";
import styles from '../../css/Personal/personalpage.module.css';

function PersonalPage({ selectedBadge, openChatWindow, nc }) {
    const navigate = useNavigate();
    const { urlUserId } = useParams(); // URL에서 userId 추출
    let loginInfo = getLoginInfo();
    const loginUserId = loginInfo?.userId || null;
    const [userId, setUserId] = useState();
    const [userInfo, setUserInfo] = useState();
    const [personalPost, setPersonalPost] = useState();

    const getUserInfo = async () => {
        try {
            const response = await api.get(`user/info/${userId}`);
            console.log("debug >>> response, ", response.data);
            setUserInfo(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getPersonalPost = async () => {
        console.log(userId);
        try {
            const response = await api.get(`post/get/travelog/all`, {
                params: {
                    userId
                }
            });
            console.log("debug >>> response, ", response.data);
            // 최신순으로 정렬
            const sortedPosts = response.data
                .filter(post => !(urlUserId && post.secret === 1)) // urlUserId가 null이 아닐 때 secret이 1인 포스트 제외
                .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            console.log(sortedPosts);
            setPersonalPost(sortedPosts);

        } catch (err) {
            console.log(err);
        }
    };

    // URL에서 userId 설정
    useEffect(() => {
        if (urlUserId != null) {
            setUserId(urlUserId);
        } else {
            setUserId(loginUserId);
        }
    }, [urlUserId, loginUserId]);

    // userId가 변경될 때마다 API 호출
    useEffect(() => {
        if (userId != null) {
            getUserInfo();
            getPersonalPost();
        }
        console.log(userId);
    }, [userId]);

    return (
        <div align="center">
            {/* ProfileCard에 selectedBadge 전달 */}
            <ProfileCard selectedBadge={selectedBadge} userId={userId} openChatWindow={openChatWindow} nc={nc} />

            <div className={styles.centeredMap}>
                {userInfo ? `${userInfo.userNickname}'s Map` : "Loading..."}
            </div>

            {/* userId가 정의된 경우에만 MapOverlay 렌더링 */}
            {userId && <MapOverlay key={userId} userId={userId} />}

            <div className={styles.centeredMap}>
                {userInfo ? `${userInfo.userNickname}'s 여행노트` : "Loading..."}

            </div>
            <div>
                <p style={{ width: '920px', textAlign: "right", marginLeft: "auto", marginRight: "auto" }} >
                    <span style={{ cursor: "pointer" }} onClick={() => navigate('/board/travelog/all', { state: { travelogId: userId } })}>더보기 <IoMdArrowDropright style={{ fontSize: "25px", marginBottom: "3px" }} /></span>
                </p>
                <TravelCardGrid data={personalPost} itemsPerPage={5} />
            </div><br/><br/>

            {/* <PaginationComponent /> */}
        </div>
    );
}

export default PersonalPage;
