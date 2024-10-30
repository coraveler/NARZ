

function NotificationList({deleteMessage, msgId, msg}){
 
    return(
        <>
            <div style={{border:'2px solid #999999', borderRadius:'15px', padding:'12px'}}>
                <div style={{marginLeft:'5px'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{paddingRight:'20px'}}>
                            <div style={{fontWeight:'600', marginBottom:'1px'}}>{msg.msgTitle}</div>
                            <div style={{fontSize:'13px'}}>{msg.msgContent}</div>
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <button className="btn-close" style={{fontSize:'25px'}} onClick={()=>deleteMessage(msgId)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationList;