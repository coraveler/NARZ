import React from 'react';
import api from '../../api/axios';

const ChatLoginUserInfo = ({ userInfo, timeDisplay, msg, state, unread }) => {
    const profileImage = "https://cdn.builder.io/api/v1/image/assets/TEMP/723a88e5c32d2472fefd9718f746254edeeadb446fa9ca56fed96b0d6b55d900?placeholderIfAbsent=true&apiKey=5069901003e646878c4e6740ca1b07b5";

    return (
        <div>
            {msg ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: state === 'login' ? 'flex-end' : 'flex-start' }}>
                    {state !== 'login' && (
                        <img src={profileImage} alt="Profile" style={{ width: state ? '30px' : '45px', marginRight: state ? '10px' : '20px' }} />
                    )}
                    <div style={{ textAlign: state === 'login' ? 'right' : 'left' }}>
                        <div>
                            {userInfo && state !== 'login' && <span>{userInfo.name}</span>}
                            <small style={{ marginLeft: '10px', fontSize: '12px' }}>{timeDisplay}</small>
                        </div>
                        {state ? (
                            <div style={{ 
                                border: '1px solid gray', 
                                borderRadius: '10px', 
                                backgroundColor: 'lightgray', 
                                padding: '5px',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',  // 텍스트가 영역을 넘치지 않게 줄바꿈
                                whiteSpace: 'normal',
                                display: 'inline-block',       // 텍스트가 줄바꿈 되도록 설정
                                maxWidth: '250px'
                            }}>
                                <small style={{ wordWrap: 'break-word', whiteSpace: 'normal', display: 'inline-block', textAlign:'left'}}>{msg}</small>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'left',
                                display: 'inline-block',
                                width: '200px',           // 텍스트 길이를 제한하려면 너비를 설정
                                overflow: 'hidden',       // 넘치는 텍스트는 숨기기
                                whiteSpace: 'nowrap',     // 텍스트를 한 줄로 유지
                                textOverflow: 'ellipsis'  // 넘치는 텍스트는 '...'으로 표시
                            }}>
                              <small>{msg}</small>
                              <div>
                                {unread && unread?.unread!=0 ? unread.unread :''}
                              </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={profileImage} alt="Profile" style={{ width: '45px', marginRight: '20px' }} />
                    {userInfo && <h4>{userInfo.name}</h4>}
                </div>
            )}
        </div>
    );
};

export default ChatLoginUserInfo;
