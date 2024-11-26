import api from "../../api/axios";
import { TiWarningOutline } from "react-icons/ti";
import ReactModal from "react-modal";


function ScheduleDeleteModal({
    scheduleDeleteClose, 
    scheduleDeleteModalStatus,
    getSchedule,
    getHoliday,
    scheduleId,
    scheduleInfoModalClose}){

    const scheduleDeleteHandler = async () => {
        try{
            const response = await api.delete(`/api/schedule?id=${scheduleId}`)
                getSchedule()
                getHoliday();
                scheduleDeleteClose();
                scheduleInfoModalClose();

            response.status == 200
                ? alert('삭제가 완료되었습니다.')
                : alert('삭제에 실패하였습니다. 다시 시도해 주세요')
            
        }catch(e){
            console.log(e);
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
                isOpen={scheduleDeleteModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1001},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '20px',
                        padding: '20px',
                        width: '20vw'}}}
                    closeTimeoutMS={200}>
                    
                <div style={{textAlign:'center', fontFamily: 'KCC-Hanbit'}}>
                    <TiWarningOutline style={{fontSize:'40px', color:'red'}}/><p/>
                    <div>
                        일정을 정말 삭제하시겠습니까?
                    </div><br/>

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={scheduleDeleteHandler}
                    >예
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3', fontFamily: 'KCC-Hanbit'}}
                        onClick={scheduleDeleteClose}
                    >아니오
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default ScheduleDeleteModal;