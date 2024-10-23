import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddScheduleModal from '../Includes/calendar/AddScheduleModal';
import ScheduleInfoModal from '../Includes/calendar/ScheduleInfoModal';
import '../css/calendar/Calendar.css';

const Calendar = () => {

    const [addScheduleModalStatus, setAddScheduleModalStatus] = useState(false); // 일정 추가 모달 상태
    const [scheduleId, setScheduleId] = useState('');   // 현재 일정 아이디
    const [scheduleAry, setScheduleAry] = useState([]); // 일정 모음
    const [holidayAry, setHolidayAry] = useState([])    // 공휴일 일정 모음
    const [scheduleInfoModalStatus, setScheduleInfoModalStatus] = useState(false) // 일정 정보 모달 상태
    const [scheduleInfo, setScheduleInfo] = useState('')    // 일정 상세 정보

    
    // db로부터 일정 가져오기
    const getSchedule = async () => {
        try{
            const response = await axios.get('http://localhost:7777/api/schedule?userId=siwoo123')
            const ary = response.data;

            const schAry = ary.map(sch => ({
                title: sch.title,
                content: sch.content,
                start: sch.startDate,
                end: new Date(new Date(sch.endDate).getTime() + 86400000).toISOString().split('T')[0],
                id: sch.id,
                color: sch.color}));
            setScheduleAry(schAry)
        }catch(e){
            console.log(e)
        }
    }

    // db로부터 공휴일 가져오기
    const getHoliday = async () => {
        try{
            const response = await axios.get('http://localhost:7777/api/holiday')
            const ary = response.data;

            const hdAry = ary.map(hd => ({
                info: "holiday",
                title: hd.title,
                date: hd.date,
                id: hd.id,
                color: hd.color}));
            setHolidayAry(hdAry);
        }catch(e){
            console.log(e)
        }
    }

    
   // 페이지 렌더링시 실행
    useEffect(()=>{
        getSchedule();
        getHoliday();
    },[])


    // 일정 추가 모달창 닫기
    const addScheduleModalClose = () => {
        setAddScheduleModalStatus(false);
        setScheduleId('');
    }

    // 상세 일정 모달창 닫기
    const scheduleInfoModalClose = () => {
        setScheduleInfoModalStatus(false)
        setScheduleId('');
        setScheduleInfo('');
    }


    // 일정 상세 클릭시 발동 함수
    const scheduleClickHandler = async (info) => {
        if(info.event._def.extendedProps.info != "holiday"){
            setScheduleId(info.event._def.publicId)
            setScheduleInfoModalStatus(true);
        }
    };


    // 일정 상세 내용 가져오기
    const getScheduleInfo = async () => {
        try{
            const response = await axios.get(`http://localhost:7777/api/schedule/${scheduleId}`)
            setScheduleInfo(response.data)
        }catch(e){
            console.log(e)
        }
    }

    // 일정 변경시 해당 일정 정보 가져오기
    useEffect(()=>{
        if(scheduleId){
            getScheduleInfo();
        }
    },[scheduleId])


    return (
        <div>
            <div className='' style={{ width:'65%', margin: 'auto'}}><br/>
                
                {/* 캘린더 */}
                <FullCalendar

                    plugins={[ dayGridPlugin , interactionPlugin]}
                    locale="ko"
                    height={'52vw'}     // 달력 높이
                    dayMaxEvents={true} // 이벤트 오버 높이 조정
                    events={[...scheduleAry, ...holidayAry]}    // 이벤트 가져오기
                    
                    // 헤더 툴바
                    headerToolbar={{
                        left: 'today',
                        center: 'prevYear prev title next nextYear',
                        right: 'addEvent'}}
                    
                    // 버튼명 지정
                    buttonText={{ 
                        today: "오늘",
                        month: "월별",
                        week: "주별", 
                        day: "일별"}}

                    // 버튼 커스텀
                    customButtons={{
                        addEvent: {
                            text: '일정 등록',
                            // 스케줄 모달
                            click:()=>{setAddScheduleModalStatus(true)}}}}   

                    // 날짜만 표시
                    dayCellContent={(arg) => {
                        return {
                            html: `<div>${arg.date.getDate()}</div>`}}}
                            
                    eventClick={scheduleClickHandler}
                    // dateClick={dateClickHandler}

                />  
            </div>

            {/* 스케줄 추가 모달 */}
            <AddScheduleModal
                addScheduleModalStatus={addScheduleModalStatus}
                addScheduleModalClose={addScheduleModalClose}
                getSchedule={getSchedule}
                getHoliday={getHoliday}/>

            {/* 스케줄 상세 모달 */}
            <ScheduleInfoModal
                scheduleInfoModalStatus={scheduleInfoModalStatus}
                scheduleInfoModalClose={scheduleInfoModalClose}
                getSchedule={getSchedule}
                getHoliday={getHoliday}
                scheduleId={scheduleId}
                scheduleInfo={scheduleInfo}/>
            
        </div>
    );
};

export default Calendar;
