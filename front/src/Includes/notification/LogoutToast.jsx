import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function LogoutToast({logoutToastStatus,logoutToastClose}){

    const [userNickname, setUserNickname] = useState('');

    useEffect(()=>{
        if(localStorage.getItem("loginNickname")){
            // const item = localStorage.getItem("loginInfo")
            // const parseItem = JSON.parse(item);
            // setUserNickname(parseItem.data.userNickname);

            const item = localStorage.getItem("loginNickname")
            setUserNickname(item);
        }
    },[localStorage.getItem("loginNickname")])
    
    return(
        <div>
            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={logoutToastStatus} onClose={()=>logoutToastClose()}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        {userNickname}님 안녕히 가세요
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default LogoutToast;