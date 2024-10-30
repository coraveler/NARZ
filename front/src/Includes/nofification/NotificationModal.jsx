import axios from "axios";
import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

import ReactModal from "react-modal";
import NotificationList from "./NotificationList";

function NotificationModal({
    notificationModalStatus,
    notificationModalClose,
    notificationCountHandler
}){

    const [isLogin, setIsLogin] = useState(false);
    const [previousDayAry, setPreviousDayAry] = useState([]);
    const [todayAry, setTodayAry] = useState([]);
    const [eventSource, setEventSource] = useState(null);
    const [getScheduleLength, setGetScheduleLength] = useState('');
    const [showToast, setShowToast] = useState(false);  // 새 알림 토스트 상태
    const [showToastLogin, setShowToastLogin] = useState(false);    // 로그인 토스트 상태
    const [showToastLogout, setShowToastLogout] = useState(false);  // 로그아웃 토스트 상태


    const todayNotificationMsg = localStorage.getItem("todayNotificationMsg");

    const userId = "siwoo123";
    const now = new Date()
    const afterWeek = new Date(); 
    afterWeek.setDate(now.getDate() + 7)
    afterWeek.setHours(23,59,99,999);
    const afterOneHours = new Date();
    afterOneHours.setHours(afterOneHours.getHours() + 1);


    useEffect(()=>{
        getNotificationMsg()
    },[])

    // 알림 메시지 가져오기
    const getNotificationMsg = async () => {
        try{
            const response = await axios.get(`http://localhost:7777/api/notificationMessage?userId=${userId}`)
            setPreviousDayAry(response.data.filter(msg => new Date(msg.sendDate) < new Date().setHours(0, 0, 0, 0)).sort((a,b)=>new Date(b.sendDate) - new Date(a.sendDate))) // 오늘 00:00 이전
            setTodayAry(response.data.filter(msg => new Date(msg.sendDate) >= new Date().setHours(0, 0, 0, 0) && new Date(msg.sendDate) < new Date().setHours(23, 59, 59, 999)));
        }catch(e){
            console.log(e)
        }
    }
    
    // 일정 가져오기
    const fetchSchedule = () => {
        const source = new EventSource(`http://localhost:7777/api/sse?userId=${userId}`);
        setEventSource(source); // 상태로 EventSource 저장
    
        source.addEventListener("message", (event) => {
            let getSchedules = JSON.parse(event.data);
            const schedules = getSchedules.filter(sch => new Date(`${sch.startDate}T${sch.startTime}`) > afterOneHours && new Date(sch.startDate) < afterWeek)
            schedules.sort((a,b) => new Date(`${a.startDate}T${a.startTime}`) - new Date(`${b.startDate}T${b.startTime}`))
            notificationToastHandler()  // 일정 알림 토스트
            setGetScheduleLength(schedules.length); // 일정 길이
            saveMsgHandler(schedules)   // 일정을 메시지화하여 저장하기
        });
        source.onerror = () => {
            source.close(); //연결 끊기
        };
        getNotificationMsg();   // 메시지 가져오기
        localStorage.setItem("todayNotificationMsg", `${new Date().toDateString()}-notificationMsg`)    // 로컬스토리지에 이력 저장
    }

    // 로그인 함수
    const loginHandler = () => {
        
        setIsLogin(true); // 로그인 여부
        if(todayNotificationMsg){
            if(localStorage.getItem("todayNotificationMsg")!=`${new Date().toDateString()}-notificationMsg`){
                fetchSchedule();
                localStorage.setItem("todayNotificationMsg", `${new Date().toDateString()}-notificationMsg`)
            }else{
                loginToastHandler() // 로그인 토스트
            }
        } else{
            fetchSchedule();
        }
    }
    
    
    // 가져온 일정 오늘/이전 분류이후 메시지로 저장하기
    const saveMsgHandler = async(schedules) => {
        for(const sch of schedules){
            const startDay = new Date(sch.startDate);
            const nowDate = new Date(new Date().setHours(0, 0, 0, 0)); // 현재 날짜의 자정
            const remainDay = Math.floor((startDay - nowDate) / (1000 * 60 * 60 * 24));
            const startTime = new Date(`${sch.startDate} ${sch.startTime}`);
            const remainTime = (startTime.getHours() - now.getHours()) < 0 ? (startTime.getHours() - now.getHours()) + 24 : (startTime.getHours() - now.getHours())
            let msgTitle = null;
            let msgContent = null;
            if(remainDay == 0){
                msgTitle = `${sch.userId}님, '${sch.title}' 일정이 바로 오늘입니다!`; 
                msgContent = `일정까지 ${remainTime-1}시간 남았습니다. 준비됐나요?`;
            } else {
                msgTitle =`${sch.userId}님, '${sch.title}' 일정이 곧 다가옵니다`; 
                msgContent = `일정까지 ${remainDay}일 남았습니다. 준비할 시간이에요`
            }
            const data = {
                msgTitle : msgTitle,
                msgContent : msgContent,
                userId : userId
            }
            try{
                await axios.post("http://localhost:7777/api/notificationMessage", data)
            }catch(e){
                console.log(e);
            }
        }
        getNotificationMsg();
    }


    // 해당 메시지 삭제
    const deleteMessage = async(msgId) => {
        try{
            await axios.delete(`http://localhost:7777/api/notificationMessage?msgId=${msgId}`)
            getNotificationMsg();
        }catch(e){
            console.log(e)
        }
    }
    
    // 로그아웃 실행 함수
    const logoutHandler = () => {
        logoutToastHandler(true);
        setIsLogin(false);
        if (eventSource) {
            eventSource.close(); // EventSource 종료
        }
    }

    // 로그인시 토스트
    const loginToastHandler = () => {
        setShowToastLogin(true);
        setTimeout(()=>setShowToastLogin(false), 5000)
    }

    // 일정 가져올 때 알림 토스트
    const notificationToastHandler = () => {
        setShowToast(true);
        setTimeout(()=>setShowToast(false), 5000)
    }

    // 로그아웃 토스트
    const logoutToastHandler = () => {
        setShowToastLogout(true);
        setTimeout(()=>setShowToastLogout(false), 5000)
    }
    

    return(
        <div>
            <ReactModal
                isOpen={notificationModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(1px)',
                        zIndex: 1000},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '35px',
                        padding: '30px',
                        width: '500px'}}}>

                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'auto 10px auto 10px'}}>
                    <h3 style={{fontWeight:'bold'}}>알림</h3>
                    <button onClick={loginHandler}>로그인</button>
                    <button onClick={logoutHandler}>로그아웃</button>
                    <div>
                        <button className="btn-close"
                                style={{fontSize:'25px', marginBottom:'25px'}}
                                onClick={notificationModalClose}/>
                    </div>
                </div>
                {isLogin
                ?<div style={{maxHeight:'600px', overflowY:'auto', padding:'0px 5px'}}>
                    {todayAry.length > 0 && (
                        <>
                            <div style={{marginLeft:'10px', marginBottom:'2px'}}>오늘</div>
                            {todayAry.map((msg) => (
                                <div style={{ marginBottom: '8px' }} key={msg.msgId}>
                                    <NotificationList index={msg.msgId} deleteMessage={deleteMessage} userId={userId} msg={msg} msgId={msg.msgId} />
                                </div>
                            ))}
                        </>
                    )}
                    {previousDayAry.length > 0 && (
                        <>
                            <div style={{marginLeft:'10px', marginBottom:'2px'}}>지난 알림</div>
                            {previousDayAry.map((msg) => (
                                <div style={{ marginBottom: '8px' }} key={msg.msgId}>
                                    <NotificationList index={msg.msgId} deleteMessage={deleteMessage} userId={userId} msg={msg} msgId={msg.msgId} />
                                </div>
                            ))}
                        </>
                    )}
                    {todayAry.length == 0 && previousDayAry.length == 0 &&
                        <h5 style={{textAlign:'center', padding:'40px'}}>알림이 없습니다.</h5>
                    }
                </div>
                : <h5 style={{textAlign:'center', padding:'40px'}}>로그인 이후 이용하실 수 있습니다.</h5>
                }
            </ReactModal>

            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={showToast} onClose={()=>setShowToast(false)}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        총 {getScheduleLength}개의 새 알림이 있습니다
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={showToastLogin} onClose={()=>setShowToastLogin(false)}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        {userId}님 방문을 환영합니다
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={showToastLogout} onClose={()=>setShowToastLogout(false)}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        {userId}님 안녕히 가세요
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default NotificationModal;