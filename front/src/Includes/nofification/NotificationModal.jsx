import ReactModal from "react-modal";
import NotificationList from "./NotificationList";

function NotificationModal({
    notificationModalStatus,
    notificationModalClose
}){
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
                    <div style={{}}>
                        <button className="btn-close"
                                style={{fontSize:'25px', marginBottom:'25px'}}
                                onClick={notificationModalClose}/>
                    </div>
                </div>

                <div style={{marginBottom:'8px'}}><NotificationList/></div>
                <div style={{marginBottom:'8px'}}><NotificationList/></div>
                <div style={{marginBottom:'8px'}}><NotificationList/></div>
                

            </ReactModal>
        </div>
    )
}

export default NotificationModal;