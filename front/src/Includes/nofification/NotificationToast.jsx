import { Toast, ToastContainer } from "react-bootstrap";

function NotificationToast({notificationToastStatus, notificationToastClose, msgLength}){
    return(
        <div>
            <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed' }}>
                <Toast show={notificationToastStatus} onClose={()=>notificationToastClose()}>
                    <Toast.Header>
                        <img style={{width:"30px"}} src="로고_02.png"/>&nbsp;
                        <strong className="me-auto">알림</strong>
                        <small>방금</small>
                    </Toast.Header>
                    <Toast.Body>
                        총 {msgLength}개의 새 알림이 있습니다
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default NotificationToast;