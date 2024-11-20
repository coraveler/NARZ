import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";
import ReactModal from "react-modal";
import ColorChoiceModal from "./ColorChoiceModal";


function ScheduleUpdateModal({
    scheduleUpdateModalStatus,
    scheduleUpdateModalClose,
    scheduleInfo,
    getSchedule,
    getHoliday,
    scheduleInfoModalClose}){

    const [scheduleId, setScheduleId] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateContent, setUpdateContent] = useState('');
    const [updateStartDate, setUpdateStartDate] = useState('');
    const [updateEndDate, setUpdateEndDate] = useState('');
    const [updateStartTime, setUpdateStartTime] = useState('');
    const [updateEndTime, setUpdateEndTime] = useState('');
    const [updateColor, setUpdateColor] = useState('');
    const [colorChoiceVisible, setColorChoiceVisible] = useState(false);


    // 스케줄 정보 변경시 내부 요소 다시 초기화
    useEffect(() => {
        setScheduleId(scheduleInfo.id);
        setUpdateTitle(scheduleInfo.title);
        setUpdateContent(scheduleInfo.content);
        setUpdateStartDate(scheduleInfo.startDate);
        setUpdateEndDate(scheduleInfo.endDate);
        setUpdateStartTime(scheduleInfo.startTime);
        setUpdateEndTime(scheduleInfo.endTime);
        setUpdateColor(scheduleInfo.color);
    }, [scheduleInfo]);

    // 업데이트 취소 버튼 함수
    const updateCancelHandler = () => {
        scheduleUpdateModalClose();
        setUpdateTitle(scheduleInfo.title);
        setUpdateContent(scheduleInfo.content);
        setUpdateStartDate(scheduleInfo.startDate);
        setUpdateEndDate(scheduleInfo.endDate);
        setUpdateStartTime(scheduleInfo.startTime);
        setUpdateEndTime(scheduleInfo.endTime);
        setUpdateColor(scheduleInfo.color);
    }

    // 일정 컬러 모달창 닫기 함수
    const colorChoiceClose = () => {
        setColorChoiceVisible(false);
    }

    const updateSchedule = async () => {

        if (!updateTitle) {
            return alert('일정 제목을 입력해 주세요!');
        }
        if (!updateStartDate || !updateEndDate || !updateStartTime || !updateEndTime) {
            return alert('일정 기간을 입력해 주세요!');
        }
        if (updateStartDate > updateEndDate) {
            return alert('종료 날짜는 시작 날짜보다 늦어야 합니다.');
        }
        if (updateStartTime > updateEndTime && updateStartDate == updateEndDate) {
            return alert('종료 시간은 시작 시간보다 늦어야 합니다.');
        }

        const data = {
            id: scheduleId,
            title: updateTitle,
            content: updateContent,
            startDate: updateStartDate,
            endDate: updateEndDate,
            startTime: updateStartTime,
            endTime: updateEndTime,
            color: updateColor
        }

        try{
            const response = await axios.patch('http://localhost:7777/api/schedule', data)
            response.status==200 ? alert('수정이 완료되었습니다') : alert('수정에 실패하였습니다. 다시 시도해 주세요')
            getSchedule()
            getHoliday()
            updateCancelHandler()
            scheduleInfoModalClose()

        }catch(e){
            console.log(e)
        }
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
                isOpen={scheduleUpdateModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
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

                <div style={{textAlign:'center'}}>

                    <MdOutlineSecurityUpdateWarning style={{fontSize:'40px', marginTop:'5px'}}/>
                    <h3 style={{marginTop:'10px', fontFamily: 'KCC-Hanbit'}}>일정을 수정해 주세요</h3>

                    {/* 일정 제목 */}
                    <div style={{ fontFamily: 'KCC-Hanbit'}}>
                        <input
                            type="text"
                            placeholder="제목"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            style={{
                                width: '25vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 일정 내용 */}
                    <div style={{ fontFamily: 'KCC-Hanbit'}}>
                        <textarea
                            placeholder="내용"
                            value={updateContent}
                            onChange={(e) => setUpdateContent(e.target.value)}
                            style={{
                                width: '25vw',
                                height:'150px',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 시작 일정*/}
                    <div style={{fontWeight:'450', fontFamily: 'KCC-Hanbit'}}>시작&nbsp;
                        <input 
                            type='date' 
                            value={updateStartDate} 
                            onChange={(e)=>setUpdateStartDate(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>&nbsp;&nbsp;
                        <input
                            type='time' 
                            value={updateStartTime} 
                            onChange={(e)=>setUpdateStartTime(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>
                    </div>

                    {/* 종료 일정 */}
                    <div style={{fontWeight:'450', fontFamily: 'KCC-Hanbit'}}>종료&nbsp;
                        <input 
                            type='date' 
                            value={updateEndDate} 
                            onChange={(e)=>setUpdateEndDate(e.target.value)}
                            style={{
                                width: '10vw',
                                padding: '10px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px'}}/>&nbsp;&nbsp;
                        <input 
                            type='time' 
                            value={updateEndTime} 
                            onChange={(e)=>setUpdateEndTime(e.target.value)}
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
                        alignItems: 'center', fontFamily: 'KCC-Hanbit'}}>
                    <button 
                        className="button color-button"
                        style={{width:"18vw"}}
                        onClick={()=>setColorChoiceVisible(!colorChoiceVisible)}
                    >일정 색상 변경하기
                    </button>&nbsp;
                    <div 
                        style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: updateColor,
                            border: '1px solid #ccc',
                            borderRadius: '10px', fontFamily: 'KCC-Hanbit'}}/>
                    
                        {/* 일정 컬러 선택 모달창 */}
                        <ColorChoiceModal
                            colorChoiceVisible={colorChoiceVisible}
                            colorChoiceClose={colorChoiceClose}
                            scheduleColor={updateColor}
                            setScheduleColor={setUpdateColor}
                        />
                    </div>
                    <p/>
                    
                    {/* 버튼 */}
                    <button
                        className="button select-button"
                        style={{width:"10vw"}}
                        onClick={updateSchedule}
                    >수정 완료
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"10vw"}}
                        onClick={updateCancelHandler}>취소
                    </button><p/>
                </div>
            </ReactModal>
        </div>
    )
}

export default ScheduleUpdateModal;