import { useEffect } from "react";


function NotificationList({msg, index, deleteMessage}){

    const now = new Date();
    const startDay = new Date(msg.startDate);
    const remainDay = Math.floor((startDay - now) / (1000 * 60 * 60 * 24));
    const startTime = new Date(`${msg.startDate} ${msg.startTime}`);
    const remainTime = (startTime.getHours() - now.getHours()) < 0 ? (startTime.getHours() - now.getHours()) + 24 : (startTime.getHours() - now.getHours())

    useEffect(()=>{
        console.log(startTime)
    },[])
    
    return(
        <>
            <div style={{border:'2px solid #999999', borderRadius:'15px', padding:'12px'}}>
                <div style={{marginLeft:'5px'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{paddingRight:'20px'}}>
                            {remainDay == 0 
                            ? <div style={{fontWeight:'600', marginBottom:'1px'}}>{msg.userId}님, '{msg.title}' 일정이 바로 오늘입니다!</div>
                            : <div style={{fontWeight:'600', marginBottom:'1px'}}>{msg.userId}님, '{msg.title}' 일정이 곧 다가옵니다</div>
                            }
                            {remainDay == 0 
                            ? <div style={{fontSize:'13px'}}>일정까지 {remainTime-1}시간 남았습니다. 준비됐나요?</div>
                            : <div style={{fontSize:'13px'}}>일정까지 {remainDay}일 남았습니다. 준비할 시간이에요</div>
                            }
                            
                        </div>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <button className="btn-close" style={{fontSize:'25px'}} onClick={()=>deleteMessage(index)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationList;