import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../Includes/calendar/CalendarPage.css';

const CalendarPage = () => {

    const [addEventModal, setAddEventModal] = useState(false); // 일정 추가 모달
    const [eventInfoModal, setEventInfoModal] = useState(false); // 일정 정보 확인 모달
    const [eventTitle, setEventTitle] = useState(''); // 제목
    const [eventContent, setEventContent] = useState(''); // 내용
    const [startEventDate, setStartEventDate] = useState(''); // 시작 날짜
    const [startEventTime, setStartEventTime] = useState(''); // 시작 시간
    const [endEventDate, setEndEventDate] = useState(''); // 끝나는 날짜
    const [endEventTime, setEndEventTime] = useState(''); // 끝나는 시간
    const [eventColor, setEventColor] = useState(''); // 일정 색상
    const [eventAry, setEventAry] = useState([]); // 일정 모음
    const [scheduleId, setScheduleId] = useState(''); // 현재 일정의 아이디

    const [scheduleInfoModal, setScheduleInfoModal] = useState(); // 일정 상세 정보 모달

    // 일정 클릭시 발동 함수
    const handleEventClick = (info) => {
        if(info.event.extendedProps.description === '공휴일'){
            info.jsEvent.preventDefault(); // 기본 클릭 동작 방지
            console.log("나는 공휴일 !")
        } else{
            setScheduleId(info.event.id);
            setScheduleInfoModal(true);
        }
    };

    const deleteSchedule = async () => {
        try{
            axios.delete(`http://localhost:8001/api/schedule?id=${scheduleId}`)
            setScheduleInfoModal(false);
            getSchedule();
        }catch(e){
            console.log(e);
        }
    }

    const saveSchedule = async () => {

        const data = {
            title: eventTitle,
            content: eventContent,
            startDate: startEventDate,
            endDate: endEventDate,
            startTime: startEventTime,
            endTime: endEventTime,
            userId: "siwoo123",
            color: eventColor
        }

        try{
            const response = await axios.post('http://localhost:8001/api/schedule', data)
            setEventTitle('');
            setStartEventDate('');
            setStartEventTime('');
            setEndEventDate('');
            setEndEventTime('');
        }catch(e){
            console.log(e);
        }
        
    }

    const getSchedule = async () => {
        try{
            const response = await axios.get('http://localhost:8001/api/schedule?userId=siwoo123')
            const ary = response.data;

            const schAry = ary.map(sch => ({
                title: sch.title,
                content: sch.content,
                start: sch.startDate,
                end: sch.endDate,
                id: sch.id,
                color: sch.color
            }));
    
           setEventAry(schAry)
           settingGoogleId();


        }catch(e){
            console.log(e)
        }
    }

    
    const addEventHandler = async () => {
        await saveSchedule();
        getSchedule();
        
        setAddEventModal(false);
        
        setEventColor('');
        settingGoogleId();
    }
     
    
    const [googleId, setGoogleId] = useState('')

    useEffect(()=>{
        settingGoogleId()
        getSchedule();
        Modal.setAppElement('#root'); // 모달 에러 방지?
    },[])

    const settingGoogleId = () => {
        setGoogleId({googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com'})
    }

    const dateClickHandler = () => {
        alert("date Click !")
    }


    return (
        <div>
            <div  style={{ width:'70%', margin: 'auto'}}>
                <br/>
                <FullCalendar
                    plugins={[ dayGridPlugin , interactionPlugin, timeGridPlugin, googleCalendarPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    locale="ko"
                    googleCalendarApiKey={'AIzaSyDTw5ljGGwT_7xX4AJPwZWUmuo3BV9LOXU'}
                    eventSources={[googleId]}
                    headerToolbar={{
                        left: 'today addEvent',
                        center: 'title' , // 제목 중앙 정렬
                        right: 'dayGridMonth,timeGridWeek,timeGridDay prevYear,prev,next,nextYear' // 이전, 다음, 오늘 버튼
                    }}
                    buttonText={{ 
                        today: "오늘", // 오늘 버튼의 텍스트 
                        month: "월별", // 월 버튼의 텍스트 
                        week: "주별", // 주 버튼의 텍스트 
                        day: "일별", // 일 버튼의 텍스트 
                    }}
                    dateClick={dateClickHandler}
                    customButtons={{
                        addEvent: {
                            text: '일정 추가',
                            click:()=>{
                                setAddEventModal(true) // 모달 열기
                            }
                        }
                    }}
                    events={eventAry}
                    dayMaxEvents={true} // 이벤트 오버 높이 조정
                    // { title: 'event 1', start: '2024-09-24T12:30:00', end:'2024-09-27T12:40:00' , color:'red'},
                    //     { title: 'event 1랑 놀자', date:'2024-09-25T12:30:00' , color:'red'},
                    //     { title: 'event 1', start: '2024-09-15', end:'2024-09-19' , color:'green'},
                    
                    eventTextColor={'#FFF'} // 일정 텍스트 색상
                    eventColor={'#F2921D'} // 일정 배경 색상
                    height={'700px'} // 달력 높이
                    eventClick={handleEventClick} // 클릭 이벤트 핸들러 추가

                    
                />  
            </div>

            {/* 모달 */}
            <Modal
                isOpen={addEventModal}
                onRequestClose={() => setAddEventModal(false)}
                contentLabel="Add Event"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000 // 오버레이 z-index 설정
                    },
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        border: 'none',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '20px',
                        background: 'white',
                        width: '800px',
                        margin: '0 auto',

                    }
                }}
            >
                <div style={{textAlign:'center'}}>
                    <h2>일정 추가</h2>
                    <div>
                        <input
                        type="text"
                        placeholder="제목"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        style={{
                            width: '700px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                </div>

                    <div>
                    시작
                    <input 
                        type='date' 
                        value={startEventDate} 
                        onChange={(e)=>setStartEventDate(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    &nbsp;&nbsp;
                    <input 
                        type='time' 
                        value={startEventTime} 
                        onChange={(e)=>setStartEventTime(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>

                    <div>
                    종료
                    <input 
                        type='date' 
                        value={endEventDate} 
                        onChange={(e)=>setEndEventDate(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    &nbsp;&nbsp;
                    <input 
                        type='time' 
                        value={endEventTime} 
                        onChange={(e)=>setEndEventTime(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>

                    일정 색상
                    <input type='color' value={eventColor} onChange={(e)=>setEventColor(e.target.value)}/>

                    <div>
                        <textarea
                        placeholder="내용"
                        value={eventContent}
                        onChange={(e) => setEventContent(e.target.value)}
                        style={{
                            width: '700px',
                            height:'200px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>
                    
                    <button
                        style={{
                            backgroundColor: '#F2921D',
                            fontSize:'16px',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                        onClick={addEventHandler}
                    >
                        일정 추가
                    </button>

                    <button
                        onClick={() => setAddEventModal(false)}
                        style={{
                            backgroundColor: '#F2921D',
                            fontSize:'16px',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        닫기
                    </button>
                </div>
                
                    
            </Modal>



            {/* 상세 내용 모달창 */}
            <Modal
                isOpen={scheduleInfoModal}
                onRequestClose={() => setScheduleInfoModal(false)}
                contentLabel="Add Event"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000 // 오버레이 z-index 설정
                    },
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        border: 'none',
                        borderRadius: '20px',
                        outline: 'none',
                        padding: '20px',
                        background: 'white',
                        width: '800px',
                        margin: '0 auto',

                    }
                }}
            >
                <div style={{textAlign:'center'}}>
                    <h2>일정 추가</h2>
                    <div>
                        <input
                        type="text"
                        placeholder="제목"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        style={{
                            width: '700px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                </div>

                    <div>
                    시작
                    <input 
                        type='date' 
                        value={startEventDate} 
                        onChange={(e)=>setStartEventDate(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    &nbsp;&nbsp;
                    <input 
                        type='time' 
                        value={startEventTime} 
                        onChange={(e)=>setStartEventTime(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>

                    <div>
                    종료
                    <input 
                        type='date' 
                        value={endEventDate} 
                        onChange={(e)=>setEndEventDate(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    &nbsp;&nbsp;
                    <input 
                        type='time' 
                        value={endEventTime} 
                        onChange={(e)=>setEndEventTime(e.target.value)}
                        style={{
                            width: '300px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>

                    일정 색상
                    <input type='color' value={eventColor} onChange={(e)=>setEventColor(e.target.value)}/>

                    <div>
                        <textarea
                        placeholder="내용"
                        value={eventContent}
                        onChange={(e) => setEventContent(e.target.value)}
                        style={{
                            width: '700px',
                            height:'200px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                        }}
                    />
                    </div>
                    
                    <button
                        style={{
                            backgroundColor: '#F2921D',
                            fontSize:'16px',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                        onClick={deleteSchedule}
                    >
                        삭제
                    </button>

                    <button
                        onClick={() => setScheduleInfoModal(false)}
                        style={{
                            backgroundColor: '#F2921D',
                            fontSize:'16px',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        닫기
                    </button>
                </div>
                
                    
            </Modal>
            
        </div>
    );
};

export default CalendarPage;
