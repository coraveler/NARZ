import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function LoginToast({loginToastStatus,loginToastClose}){

    const [userNickname, setUserNickname] = useState('');
    
    useEffect(()=>{
        if(localStorage.getItem("loginInfo")){
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            setUserNickname(parseItem.data.userNickname);
        }
    },[localStorage.getItem("loginInfo")])

    return(
        <div>
            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={loginToastStatus} onClose={()=>loginToastClose()}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        {userNickname}님 방문을 환영합니다
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default LoginToast;