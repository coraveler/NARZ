import React, { createContext, useContext, useEffect, useState } from 'react';
import LoginToast from '../notification/LoginToast';
import LogoutToast from '../notification/LogoutToast';
import NotificationToast from '../notification/NotificationToast';

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

    const item = localStorage.getItem("loginInfo")
    const parseItem = JSON.parse(item);

    // 로그인 토스트 실행
    const showLoginToast = () => {
        localStorage.setItem("loginToast",true)
        // setLoginToastStatus(true);
        // setTimeout(() => setLoginToastStatus(false), 3000); // 5초 후 자동으로 닫기
        localStorage.setItem("loginNickname", parseItem.data.userNickname)
    };

    // 로그아웃 토스트 실행
    const showLogoutToast = () => {
        localStorage.setItem("logoutToast",true)
        // setLogoutToastStatus(true);
        // setTimeout(() => setLogoutToastStatus(false), 3000);
    }

    // 알림 토스트 실행
    const showNotificationToast = () => {
        setNotificationToastStatus(true);
        setTimeout(() => setNotificationToastStatus(false), 3000); // 5초 후 자동으로 닫기
        localStorage.setItem("loginNickname", parseItem.data.userNickname)
    }

    // 메시지 길이 가져오는 함수
    const getMsgLength = (length) => {
        setMsgLength(length)
    }

    useEffect(()=>{
        if(localStorage.getItem("loginToast")){
            setLoginToastStatus(true);
            setTimeout(() => setLoginToastStatus(false), 3000); // 5초 후 자동으로 닫기
            localStorage.removeItem("loginToast");
        }
        if(localStorage.getItem("logoutToast")){
            setLogoutToastStatus(true);
            setTimeout(() => setLogoutToastStatus(false), 3000); // 5초 후 자동으로 닫기
            localStorage.removeItem("logoutToast");
        }
    },[])
        

    return (
        <ToastContext.Provider value={{ showLoginToast, showLogoutToast, showNotificationToast, getMsgLength}}>
            {/* children이 <APP/> 이 됨 */}
            {children}    
            <LoginToast loginToastStatus={loginToastStatus} loginToastClose={() => setLoginToastStatus(false)} />
            <LogoutToast logoutToastStatus={logoutToastStatus} logoutToastClose={()=>setLogoutToastStatus(false)}/>
            <NotificationToast notificationToastStatus={notificationToastStatus} notificationToastClose={()=>setNotificationToastStatus(false)} msgLength={msgLength}/>
        </ToastContext.Provider>
    );
};
