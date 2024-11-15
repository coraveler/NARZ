import { useState } from "react";
import { GrClose } from "react-icons/gr";
import ReactModal from "react-modal";
import ScheduleDeleteModal from "./ScheduleDeleteModal";
import ScheduleUpdateModal from "./ScheduleUpdateModal";


function ScheduleInfoModal({
    scheduleInfoModalStatus,
    scheduleInfoModalClose,
    getSchedule,
    getHoliday,
    scheduleId,
    scheduleInfo}){

    
    const [scheduleDeleteModalStatus, setScheduleDeleteModalStatus] = useState(false);  // 일정 삭제 모달
    const [scheduleUpdateModalStatus, setScheduleUpdateModalStatus] = useState(false);  // 일정 업데이트 모달

    // 날짜,시간 포멧
    const formatDateTime = (date, time) => {
        const dateSet = new Date(`${date}T${time}`)

        // 요일
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = weekdays[dateSet.getDay()]; 

        // 날짜 포멧
        const formatDate = `${dateSet.getFullYear()}년 ${dateSet.getMonth()+1}월 ${dateSet.getDate()}일(${dayOfWeek})`
        
        // 시간 포멧
        let hours = dateSet.getHours().toString().padStart(2, '0');;
        const minutes = dateSet.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? '오후' : '오전';
        if(hours > 12) hours=(hours-12).toString().padStart(2, '0');

        return `${formatDate} ${period} ${hours}:${minutes}`;
    }

    const schTitle = scheduleInfo.title;
    const schContent = scheduleInfo.content;
    const schStart = formatDateTime(scheduleInfo.startDate, scheduleInfo.startTime)
    const schEnd = formatDateTime(scheduleInfo.endDate, scheduleInfo.endTime)

    
    // 삭제 결정 모달창 닫기
    const scheduleDeleteClose = () => {
        setScheduleDeleteModalStatus(false);
    }

    // 일정 업데이트 모달창 닫기
    const scheduleUpdateModalClose = () => {
        setScheduleUpdateModalStatus(false);
    }


    return(
        <div>
            <ReactModal
                isOpen={scheduleInfoModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '20px',
                        padding: '30px',
                        width: '25vw'}}}
                    closeTimeoutMS={200}>

                <div style={{textAlign:'left'}}>
                    <div style={{textAlign:'right'}}>
                        <button 
                            style={{backgroundColor:'transparent', border:'none', fontSize:'25px', cursor:'pointer', }}
                            onClick={scheduleInfoModalClose}>
                            <GrClose className="close-button"/>
                        </button>
                    </div>
                    
                    <h3 style={{ wordBreak: 'break-word', width:'22vw'}}>{schTitle}</h3><hr/><br/>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '20px' }}>시작</div>
                            <div style={{ marginBottom: '20px' }}>종료</div>
                            <div>내용</div>
                        </div>
                        <div style={{ flex: 5 }}>
                            <div style={{ marginBottom: '20px' }}>{schStart}</div>
                            <div style={{ marginBottom: '20px' }}>{schEnd}</div>
                            <div>{schContent?schContent:"없음"}</div>
                        </div>
                    </div><br/><hr/><p/>
                    
                    <div style={{textAlign:'right'}}>
                    {/* 버튼 */}
                    <button
                        className="button select-button"
                        style={{width:"7vw", border:'2px solid #a9a3a3'}}
                        onClick={()=>setScheduleUpdateModalStatus(true)}
                    >일정 수정
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"7vw", border:'2px solid #a9a3a3'}}
                        onClick={()=>setScheduleDeleteModalStatus(true)}
                    >일정 삭제
                    </button>&nbsp;&nbsp;
                    
                    </div>
                </div>
            </ReactModal>

            <ScheduleDeleteModal
                scheduleDeleteModalStatus={scheduleDeleteModalStatus}
                scheduleDeleteClose={scheduleDeleteClose}
                getSchedule={getSchedule}
                getHoliday={getHoliday}
                scheduleId={scheduleId}
                scheduleInfoModalClose={scheduleInfoModalClose}/>

            <ScheduleUpdateModal
                scheduleUpdateModalStatus={scheduleUpdateModalStatus}
                scheduleUpdateModalClose={scheduleUpdateModalClose}
                scheduleInfo={scheduleInfo}
                getSchedule={getSchedule}
                getHoliday={getHoliday}
                scheduleInfoModalClose={scheduleInfoModalClose}/>
        </div>
    )
}

export default  ScheduleInfoModal;