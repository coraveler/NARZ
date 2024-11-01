import React, { createContext, useContext, useState } from 'react';
import LoginToast from '../nofification/LoginToast';
import LogoutToast from '../nofification/LogoutToast';
import NotificationToast from '../nofification/NotificationToast';

// ToastContext라는 context를 생성
const ToastContext = createContext();

// ToastContext를 useToast로 다른곳에서 사용
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    // 토스트 상태 관리
    const [loginToastStatus, setLoginToastStatus] = useState(false);
    const [logoutToastStatus, setLogoutToastStatus] = useState(false);
    const [notificationToastStatus, setNotificationToastStatus] = useState(false);
    const [msgLength, setMsgLength] = useState(''); // 메시지 길이

    // 로그인 토스트 실행
    const showLoginToast = () => {
        setLoginToastStatus(true);
        setTimeout(() => setLoginToastStatus(false), 5000); // 5초 후 자동으로 닫기
    };

    // 로그아웃 토스트 실행
    const showLogoutToast = () => {
        setLogoutToastStatus(true);
        setTimeout(() => setLogoutToastStatus(false), 5000); // 5초 후 자동으로 닫기
    }

    // 알림 토스트 실행
    const showNotificationToast = () => {
        setNotificationToastStatus(true);
        setTimeout(()=>setNotificationToastStatus(false), 5000)
    }

    // 메시지 길이 가져오는 함수
    const getMsgLength = (length) => {
        setMsgLength(length)
    }

    return (
        <ToastContext.Provider value={{ showLoginToast, showLogoutToast, showNotificationToast, getMsgLength}}>
            {/* children이 <APP/> 이 됨 */}
            {children}    
            <LoginToast loginToastStatus={loginToastStatus} loginToastClose={() => setLoginToastStatus(false)} />
            <LogoutToast logoutToastStatus={logoutToastStatus} logoutToastClose={()=>setLogoutToastStatus(false)}/>
            <NotificationToast notificationToastStatus={notificationToastStatus} notificationToastClase={()=>setNotificationToastStatus(false)} msgLength={msgLength}/>
        </ToastContext.Provider>
    );
};
