import axios from 'axios';
import { useState } from 'react';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import ReactModal from 'react-modal';
import ColorChoiceModal from './ColorChoiceModal';

function AddScheduleModal({
    addScheduleModalStatus,
    addScheduleModalClose,
    getSchedule,
    getHoliday}){

    // 현재 날짜 및 시간 포맷
    const currentDate = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`
    const afterHour = new Date().getHours()!="23" ? `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}` : `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${(new Date().getDate()+1).toString().padStart(2, '0')}`
    const startTime = `${new Date().getHours().toString().padStart(2, '0')}:00`
    const endTime = new Date().getHours()!="23" ? `${(new Date().getHours()+1).toString().padStart(2, '0')}:00` : "00:00:00"

    const [scheduleTitle, setScheduleTitle] = useState('');                     // 일정 제목
    const [scheduleContent, setScheduleContent] = useState('');                 // 일정 내용
    const [scheduleStartDate, setScheduleStartDate] = useState(currentDate);    // 일정 시작 날짜
    const [scheduleEndDate, setScheduleEndDate] = useState(afterHour);        // 일정 끝나는 날짜
    const [scheduleStartTime, setScheduleStartTime] = useState(startTime);      // 일정 시작 시간
    const [scheduleEndTime, setScheduleEndTime] = useState(endTime);            // 일정 끝나는 시간
    const [scheduleColor, setScheduleColor] = useState('#FFB300');              // 일정 색상
    const [colorChoiceVisible, setColorChoiceVisible] = useState(false);        // 색상 선택 상태

    
        
    
    

    // 서버에 POST 요청하여 일정 저장
    const saveSchedule = async () => {
        if(localStorage.getItem("loginInfo")){
            const item = localStorage.getItem("loginInfo")
            const parseItem = JSON.parse(item);
            const userId = parseItem.data.userId

            if (!scheduleTitle) {
                return alert('일정 제목을 입력해 주세요!');
            }
        
            if (!scheduleStartDate || !scheduleEndDate || !scheduleStartTime || !scheduleEndTime) {
                return alert('일정 기간을 입력해 주세요!');
            }
        
            if (scheduleStartDate > scheduleEndDate) {
                return alert('종료 날짜는 시작 날짜보다 늦어야 합니다.');
            }
        
            if (scheduleStartTime > scheduleEndTime && scheduleStartDate == scheduleEndDate) {
                return alert('종료 시간은 시작 시간보다 늦어야 합니다.');
            }
        
            const data = {
                title: scheduleTitle,
                content: scheduleContent,
                startDate: scheduleStartDate,
                endDate: scheduleEndDate,
                startTime: scheduleStartTime,
                endTime: scheduleEndTime,
                userId: userId,
                color: scheduleColor
            };
        
            try {
                
                const response = await axios.post('http://localhost:7777/api/schedule', data);
                // 초기 상태 설정
                setScheduleTitle('');
                setScheduleStartDate(currentDate);
                setScheduleEndDate(afterHour);
                setScheduleStartTime(startTime);
                setScheduleEndTime(endTime);
                setScheduleColor('#FFB300');
                setScheduleContent('');
                addScheduleModalClose();
                getSchedule();
                getHoliday();
        
                alert(response.status === 201
                    ? '일정이 정상적으로 저장되었습니다.'
                    : '일정 저장에 실패하였습니다. 다시 시도해 주세요.');
            } catch (e) {
                console.log(e);
                alert('일정 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            }
        }   
    };
    

    // 일정 컬러 모달창 닫기 함수
    const colorChoiceClose = () => {
        setColorChoiceVisible(false);
    }

    const scheduleModalClose = () => {
        addScheduleModalClose();
        setScheduleTitle('');
        setScheduleStartDate(currentDate);
        setScheduleEndDate(afterHour);
        setScheduleStartTime(startTime);
        setScheduleEndTime(endTime);
        setScheduleColor('#FFB300');
        setScheduleContent('');
    }

    return(
        <div>
            <style>
                {`
                @font-face {
                    font-family: 'KCC-Hanbit';
                    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/KCC-Hanbit.woff2') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }
                `}
            </style>
            <ReactModal
                isOpen={addScheduleModalStatus}
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
                        padding: '20px',
                        width: '30vw'}}}
                    closeTimeoutMS={200}>

                <div style={{textAlign:'center', fontFamily: 'KCC-Hanbit'}}>
                    <RiCalendarScheduleLine style={{fontSize:'40px', marginTop:'5px', color:'#FFB300'}}/>
                    <h3 style={{marginTop:'10px'}}>나의 일정을 추가해 주세요</h3>

                    {/* 일정 제목 */}
                    <div style={{textAlign:'center', fontFamily: 'KCC-Hanbit'}} >
                        <input
                            type="text"
                            placeholder="제목"
                            value={scheduleTitle}
                            onChange={(e) => setScheduleTitle(e.target.value)}
                            style={{
                                width: '25vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 일정 내용 */}
                    <div>
                        <textarea
                            placeholder="내용"
                            value={scheduleContent}
                            onChange={(e) => setScheduleContent(e.target.value)}
                            style={{
                                width: '25vw',
                                height:'170px',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 시작 일정*/}
                    <div style={{fontWeight:'450'}}>시작&nbsp;
                        <input 
                            type='date' 
                            value={scheduleStartDate} 
                            onChange={(e)=>setScheduleStartDate(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>&nbsp;&nbsp;
                        <input
                            type='time' 
                            value={scheduleStartTime} 
                            onChange={(e)=>setScheduleStartTime(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 종료 일정 */}
                    <div style={{fontWeight:'450'}}>종료&nbsp;
                        <input 
                            type='date' 
                            value={scheduleEndDate} 
                            onChange={(e)=>setScheduleEndDate(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>&nbsp;&nbsp;
                        <input 
                            type='time' 
                            value={scheduleEndTime} 
                            onChange={(e)=>setScheduleEndTime(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 일정 색상 */}
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center'}}>
                    <button 
                        className="button color-button"
                        style={{width:"18vw"}}
                        onClick={()=>setColorChoiceVisible(!colorChoiceVisible)}>일정 색상 변경하기
                    </button>&nbsp;
                    <div 
                        style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: scheduleColor,
                            border: '1px solid #ccc',
                            borderRadius: '10px'}}/>
                    
                        {/* 일정 컬러 선택 모달창 */}
                        <ColorChoiceModal
                            colorChoiceVisible={colorChoiceVisible}
                            colorChoiceClose={colorChoiceClose}
                            scheduleColor={scheduleColor}
                            setScheduleColor={setScheduleColor}/>
                    </div>
                    <p/>
                    
                    {/* 버튼 */}
                    <button
                        className="button select-button"
                        style={{width:"10vw"}}
                        onClick={saveSchedule}>일정 추가
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"10vw"}}
                        onClick={scheduleModalClose}>닫기
                    </button><p/>
                </div>
            </ReactModal>
        </div>
    )
}

export default AddScheduleModal;