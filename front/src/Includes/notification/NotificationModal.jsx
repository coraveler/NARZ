import axios from "axios";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { BiSolidMessageDetail } from "react-icons/bi";
import { FcAlarmClock, FcDataBackup } from "react-icons/fc";
import ReactModal from "react-modal";
import api from "../../api/axios";
import '../../css/modal/Modal.css';
import { useToast } from "../toast/ToastContext";
import NotificationList from "./NotificationList";



const NotificationModal = forwardRef(({
    notificationModalStatus,
    notificationModalClose}, ref) => {
    
    const [previousDayAry, setPreviousDayAry] = useState([]);   // 이전 알림 모음
    const [todayAry, setTodayAry] = useState([]);   // 오늘 알림 모음
    const {showLoginToast, showNotificationToast, getMsgLength} = useToast();   // toastContext로부터 함수 가져오기

    const now = new Date()  // 오늘
    const afterWeek = new Date();   // 일주일 후
    afterWeek.setDate(now.getDate() + 7)
    afterWeek.setHours(23,59,99,999);
    const afterOneHours = new Date();   // 한시간 후
    afterOneHours.setHours(afterOneHours.getHours() + 1);

    

    // 알림 모달창 동작시 알림 메시지 정보 가져오기
    useEffect(()=>{
        if(localStorage.getItem("loginInfo")){
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            const userId = parseItem.data.userId
            getNotificationMsg(userId)
        }
    },[notificationModalStatus])

    // 알림 메시지 가져오기
    const getNotificationMsg = async (userId) => {
            try{
                const response = await axios.get(`http://localhost:7777/api/notificationMessage?userId=${userId}`)
                setPreviousDayAry(response.data.filter(msg => new Date(msg.sendDate) < new Date().setHours(0, 0, 0, 0)).sort((a,b)=>new Date(b.sendDate) - new Date(a.sendDate))) // 오늘 00:00 이전
                setTodayAry(response.data.filter(msg => new Date(msg.sendDate) >= new Date().setHours(0, 0, 0, 0) && new Date(msg.sendDate) < new Date().setHours(23, 59, 59, 999)).sort((a,b)=>new Date(b.sendDate) - new Date(a.sendDate)));
            }catch(e){
                console.log(e)
            }
    }
    
    // 일정 가져오기
    const fetchSchedule = (userId, userNickname) => {
        const source = new EventSource(`http://localhost:7777/api/sse?userId=${userId}`);
        source.addEventListener("message", (event) => {
            let getSchedules = JSON.parse(event.data);
            const schedules = getSchedules.filter(sch => new Date(`${sch.startDate}T${sch.startTime}`) > afterOneHours && new Date(sch.startDate) < afterWeek)
            schedules.sort((a,b) => new Date(`${a.startDate}T${a.startTime}`) - new Date(`${b.startDate}T${b.startTime}`))

            // 오늘 일정 유무에 따른 로컬스토리지 데이터 저장(알림 표시를 위함)
            if(schedules.length != 0){
                localStorage.setItem(`todayNotificationMsg-${userId}`, `${new Date().toDateString()}-notificationMsg-new`)  
            } else{
                localStorage.setItem(`todayNotificationMsg-${userId}`, `${new Date().toDateString()}-notificationMsg`) 
            }
            
            // showNotificationToast()  // 일정 알림 토스트
            showLoginToast();
            getMsgLength(schedules.length); // 일정 길이
            saveMsgHandler(schedules, userId, userNickname)   // 일정을 메시지화하여 저장하기
            
        });
        source.onerror = () => {
            source.close(); //연결 끊기
        };
    }

    // 부모 컴포넌트에서 loginHandler 함수를 호출할 수 있도록 ref를 사용하여 노출합니다.
    useImperativeHandle(ref, ()=>({
        loginHandler,
        loginSuccess
    }))

    // 로그인 함수
    const loginHandler = () => {
        if(localStorage.getItem("loginInfo")){
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            const userId = parseItem.data.userId
            const userNickname = parseItem.data.userNickname
            loginSuccess(userId)
            if(localStorage.getItem(`todayNotificationMsg-${userId}`)){
                if(localStorage.getItem(`todayNotificationMsg-${userId}`) !=`${new Date().toDateString()}-notificationMsg`){
                    fetchSchedule(userId, userNickname);
                }else{
                    showLoginToast() // 로그인 토스트
                }
            } else{
                fetchSchedule(userId, userNickname);
            }
        }
    }
    
    // 가져온 일정 오늘/이전 분류이후 메시지로 저장하기
    const saveMsgHandler = async(schedules, userId, userNickname) => {
        
        for(const sch of schedules){
            const startDay = new Date(sch.startDate);
            const nowDate = new Date(new Date().setHours(0, 0, 0, 0)); // 현재 날짜의 자정
            const remainDay = Math.floor((startDay - nowDate) / (1000 * 60 * 60 * 24));
            const startTime = new Date(`${sch.startDate} ${sch.startTime}`);
            const remainTime = (startTime.getHours() - now.getHours()) < 0 ? (startTime.getHours() - now.getHours()) + 24 : (startTime.getHours() - now.getHours())
            let msgTitle = null;
            let msgContent = null;
            if(remainDay == 0){
                msgTitle = `${userNickname}님 '${sch.title}' 일정이 바로 오늘입니다!`; 
                msgContent = `일정까지 ${remainTime-1}시간 남았습니다. 준비됐나요?`;
            } else {
                msgTitle =`${userNickname}님 '${sch.title}' 일정이 곧 다가옵니다`; 
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
    }

    // 해당 메시지 삭제
    const deleteMessage = async(msgId) => {
        try{
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            const userId = parseItem.data.userId
            await axios.delete(`http://localhost:7777/api/notificationMessage?msgId=${msgId}`)
            getNotificationMsg(userId);
        }catch(e){
            console.log(e)
        }
    }

    // 전 지역 모음
    const regions = [
        "sudo",
        "gangwon",
        "chungbuk",
        "chungnam",
        "daejeon",
        "gyeonbuk",
        "jeonbuk",
        "gyeongnam",
        "jeonnam",
        "jeju"
      ];

    // 유저별 지역 좋아요 카운트
    const getUserLocalLikeCount = async (region) => {
        if(localStorage.getItem("loginInfo")){
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            const userId = parseItem.data.userId
            
            try {
                const response = await api.get(`map/localLikeCount`, {
                    params: {
                    local : region,
                    userId : userId
                }});
                return response.data; // likeCount를 반환
            } catch (error) {
                console.error(error);
                return 0; // 에러 발생 시 기본값 0 반환
            }
        }
    };
    
    // 유저별 지역 좋아요수에 따른 동작
    const regionLikeCount = async (userId, region) => {
        const count = await getUserLocalLikeCount(region); // likeCount를 비동기적으로 가져옴
        if (count >= 1) {
            saveMapRegionMsg(userId, region)
            console.log(region, " 지역 메시지 등록 완료!")
        } else {
            
        }
    };

    // 지역별 조건 달성시 메시지 등록
    const saveMapRegionMsg = async (userId, region) => {

        // 영어로 저장할 지역 이름을 위한 변수
        const originalRegion = region;

        switch(region) {
            case "sudo"     : region = "수도권"; break;
            case "gangwon"  : region = "강원도"; break;
            case "chungbuk" : region = "충북"; break;
            case "chungnam" : region = "충남"; break;
            case "daejeon"  : region = "대전"; break;
            case "gyeonbuk" : region = "경북"; break;
            case "jeonbuk"  : region = "전북"; break;
            case "gyeongnam": region = "경남"; break;
            case "jeonnam"  : region = "전남"; break;
            case "jeju"     : region = "제주도"; break;
        }

        const msgTitle = `'${region}'지역의 이미지 업로드 조건이 충족되었습니다.`
        const msgContent = `개인 페이지에서 자신만의 지도를 꾸며보세요.`

        const data = {
            msgTitle : msgTitle,
            msgContent : msgContent,
            userId : userId
        }

        try{
            await axios.post("http://localhost:7777/api/notificationMessage", data)
            saveMapRegionNotification(userId, originalRegion)
        }catch(e){
            console.log(e);
        }
    }


    // 유저별 지도 개방 알림 체크
    const checkMapRegionNotification = async(userId, region) => {
        try{
            const response = await api.get(`/api/mapRegionNotification?userId=${userId}&region=${region}`)
            return response.data;
        }catch(e){
            console.log(e);
        }
    }

    // 지도의 해당 지역 메시지 완료되었다고 전송
    const saveMapRegionNotification = async(userId, region) => {
        const data = {
            userId:userId,
            region:region
        }
        try{
            await api.post(`/api/mapRegionNotification`, data)
            localStorage.setItem(`mapRegionNotification`, `true`) 
        }catch(e){
            console.log(e);
        }
    }

    const loginSuccess = async (userId) => {
        for (const region of regions) {
            const result = await checkMapRegionNotification(userId, region);
            if (result === false) {
                await regionLikeCount(userId, region);
            } else {
                console.log(region, " 지역은 이미 메시지를 전송했음..!");
            }
        }
    };

   
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
                        width: '500px'}}}
                        closeTimeoutMS={200}>

                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'auto 10px auto 10px'}}>
                    
                    <h3 style={{fontWeight:'bold'}}><BiSolidMessageDetail style={{fontSize:'30px', color:'rgba(255, 180, 0, 0.9)'}}/> 알림</h3>
                    <div>
                        <button className="btn-close"
                                style={{fontSize:'25px', marginBottom:'25px'}}
                                onClick={notificationModalClose}/>
                    </div>
                </div>
                {localStorage.getItem("loginInfo")
                ?<div style={{maxHeight:'600px', overflowY:'auto', padding:'0px 5px'}}>
                    {todayAry.length > 0 && (
                        <>
                            <div style={{marginLeft:'5px', marginBottom:'3px', fontWeight:'600', marginTop:'5px', display:'flex', alignItems:'center'}}>
                                <FcAlarmClock style={{fontSize:'16px', color:'rgba(204, 153, 255, 0.9)', marginRight:'2px'}}/> 오늘
                            </div>
                            {todayAry.map((msg) => (
                                <div style={{ marginBottom: '8px', borderRadius:'18px', backgroundColor:'rgba(211, 211, 211, 0.2)'}} key={msg.msgId}>
                                    <NotificationList index={msg.msgId} deleteMessage={deleteMessage} msg={msg} msgId={msg.msgId} />
                                </div>
                            ))}
                        </>
                    )}
                    {previousDayAry.length > 0 && (
                        <>
                            <div style={{marginLeft:'5px', marginBottom:'3px', marginTop:'25px', fontWeight:'600', display:'flex', alignItems:'center'}}>
                                <FcDataBackup style={{fontSize:'20px', marginRight:'3px'}}/> 지난 알림
                            </div>
                            {previousDayAry.map((msg) => (
                                <div style={{ marginBottom: '8px', color:'gray' }} key={msg.msgId}>
                                    <NotificationList index={msg.msgId} deleteMessage={deleteMessage} msg={msg} msgId={msg.msgId} />
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
        </div>
    )
})

export default NotificationModal;