import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ProfileInfo.module.css';

const ChatLoginUserInfo = ({ userInfo, timeDisplay, msg, state, unread }) => {
    const navigate = useNavigate();
    // const profileImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/723a88e5c32d2472fefd9718f746254edeeadb446fa9ca56fed96b0d6b55d900?placeholderIfAbsent=true&apiKey=5069901003e646878c4e6740ca1b07b5";
    const [userId, setUserId] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (userInfo?.id) {
            getUserId();
        }
        console.log(userInfo);
    }, [userInfo])

    const getUserId = async () => {
        try {
            const response = await api.get(`/chat/getUserId/${userInfo.id}`);
            console.log(response.data);
            setUserId(response.data.userId);
            setProfileImage(response.data.profileImage);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {msg ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: state === 'login' ? 'flex-end' : 'flex-start' }}>
                    {state !== 'login' && (
                        <img src={profileImage=="default.png" ?  "/img/default.png" :`http://211.188.63.26:7777/profileImages/${profileImage}`} alt="Profile" style={{
                            width: state ? '30px' : '45px',
                            height: state ? '30px' : '45px',
                            marginRight: state ? '10px' : '20px',
                            borderRadius: '50%', // 원형으로 만들기
                            objectFit: 'cover' // 이미지 비율을 유지하며 잘리는 부분 처리
                        }}
                        // onClick={() => {
                        // navigate(`/personal/${userId}`);
                        // window.location.reload();
                        // }} 
                        />
                    )}
                    <div style={{ textAlign: state === 'login' ? 'right' : 'left' }}>
                        <div style={{fontFamily: 'GumiRomanceTTF', }}>
                            {userInfo && state !== 'login' && <span>{userInfo.name}</span>}
                            <small style={{ marginLeft: '10px', fontSize: '12px' }}>{timeDisplay}</small>
                        </div>
                        {state ? (
                            <div style={{
                                fontFamily: 'RixXladywatermelonR',
                                fontSize: '18px',
                                color: '#412d12',
                                border: '1px solid #ffd89d',
                                borderRadius: '10px',
                                backgroundColor: '#ffd89d',
                                padding: '5px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',  // 텍스트가 영역을 넘치지 않게 줄바꿈
                                whiteSpace: 'normal',
                                display: 'inline-block',       // 텍스트가 줄바꿈 되도록 설정
                                maxWidth: '250px'
                            }}>
                                <small style={{ wordWrap: 'break-word', whiteSpace: 'normal', display: 'inline-block', textAlign: 'left' }}>{msg}</small>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'left',
                                display: 'inline-block',
                                width: '200px',           // 텍스트 길이를 제한하려면 너비를 설정
                                overflow: 'hidden',       // 넘치는 텍스트는 숨기기
                                whiteSpace: 'nowrap',     // 텍스트를 한 줄로 유지
                                textOverflow: 'ellipsis',  // 넘치는 텍스트는 '...'으로 표시
                            }}>
                                <div style={{ display: 'flex', }}>
                                    <small style={{ fontFamily: 'RixXladywatermelonR' }}>{msg}</small>
                                    {unread > 0 &&
                                        <div style={{
                                            marginLeft: 'auto',
                                            // marginRight: '140px',
                                            backgroundColor: "red", // 배경색
                                            color: "white", // 텍스트 색
                                            textAlign:'center',
                                            paddingTop:'2px',
                                            borderRadius: "50%", // 원형 모양
                                            fontSize: "12px", // 글자 크기
                                            fontWeight: "bold", // 글자 굵기
                                            width:'22px',
                                            height:'22px'
                                        }}
                                        >
                                            {/* {unread > 0 ? unread : ''} */}
                                            {unread}
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={profileImage=="default.png" ?  "/img/default.png" :`http://211.188.63.26:7777/profileImages/${profileImage}`} alt="Profile" style={{
                        width: '45px',
                        height: '45px',
                        marginRight: '20px',
                        borderRadius: '50%', // 원형으로 만들기
                        objectFit: 'cover' // 이미지 비율을 유지하며 잘리는 부분 처리
                    }}
                        onClick={() => {
                            navigate(`/personal/${userId}`);
                            // window.location.reload();
                        }}
                    />
                    {userInfo && <h4>{userInfo.name}</h4>}
                </div>
            )}
            <style>
            {`
                @font-face {
                    font-family: 'GumiRomanceTTF';
                    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/GumiRomanceTTF.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }

                @font-face {
                    font-family: 'RixXladywatermelonR';
                    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-4@1.0/RixXladywatermelonR.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }
            `}
        </style>
        </div>
    );
};

export default ChatLoginUserInfo;
