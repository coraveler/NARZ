
function NotificationList(){
    
    return(
        <>
            <div style={{border:'2px solid #999999', borderRadius:'15px', padding:'12px'}}>
                <div style={{marginLeft:'5px'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{fontWeight:'600', marginBottom:'1px', paddingRight:'15px'}}>김시우님, '운동하기' 일정이 곧 다가옵니다!</div>
                        <div style={{}}>
                            <button className="btn-close"
                                    style={{fontSize:'15px'}}/>
                        </div>
                    </div>
                    <div style={{fontSize:'13px'}}>일정까지 6일 남았습니다. 준비할 시간이에요 :)</div>
                </div>
            </div>
            
        </>
    )
}

export default NotificationList;