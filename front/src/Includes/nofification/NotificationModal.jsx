import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import NotificationList from "./NotificationList";

function NotificationModal({
    notificationModalStatus,
    notificationModalClose,
    notificationCountHandler
}){

    const [isLogin, setIsLogin] = useState(false);
    const [messages, setMessages] = useState([]);
    const userId = "siwoo123";
    const now = new Date()
    const afterWeek = new Date(now); 
    afterWeek.setDate(now.getDate() + 7);

    const loginHandler = () => {
        const eventSource = new EventSource(`http://localhost:7777/sse?userId=${userId}`);

        setIsLogin(true);

        eventSource.addEventListener("message", (event) => {
            let getMessages = JSON.parse(event.data);
            // 현재 시간과 일주일 후의 시간 사이의 메시지 필터링
            getMessages = getMessages.filter(msg => new Date(msg.startDate) > now && new Date(msg.startDate) < afterWeek)
            // 시작 시간 기준으로 정렬
            getMessages.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            setMessages((prevMessages) => [...prevMessages, ...getMessages]);
            console.log(messages.length)
        });

        eventSource.onerror = () => {
            eventSource.close(); //연결 끊기
        };
    }

    useEffect(()=>{
        notificationCountHandler(messages.length)
    },[messages])

    // 해당 메시지 삭제
    const deleteMessage = (index) => {
        setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index)); // 새 배열 생성
    }
    
    // 로그아웃 실행 함수
    const logoutHandler = () => {
        setIsLogin(false);
        setMessages([]);
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
                {messages.map((msg, index) => (
                    <div key={index} style={{marginBottom:'8px'}}><NotificationList msg={msg} index={index} deleteMessage={deleteMessage}/></div>
                ))}
                </div>
                : <h5 style={{textAlign:'center', padding:'40px'}}>로그인 이후 이용하실 수 있습니다.</h5>
                }
                
                
                

            </ReactModal>
        </div>
    )
}

export default NotificationModal;