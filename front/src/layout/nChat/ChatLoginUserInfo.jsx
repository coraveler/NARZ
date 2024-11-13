import React from 'react';
import api from '../../api/axios';

const ChatLoginUserInfo = ({ userInfo, timeDisplay, msg, state }) => {
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
                            <div style={{ border: '1px solid gray', borderRadius: '10px', textAlign: 'center', backgroundColor: 'lightgray', padding:'5px' }}>
                                <small>{msg}</small>
                            </div>
                        ) : (
                            <small>{msg}</small>
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
