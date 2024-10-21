import axios from "axios";
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
            const response = await axios.delete(`http://localhost:7777/api/schedule?id=${scheduleId}`)
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
                        width: '20vw'}}}>
                    
                <div style={{textAlign:'center'}}>
                    <TiWarningOutline style={{fontSize:'40px'}}/><p/>
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
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={scheduleDeleteClose}
                    >아니오
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default ScheduleDeleteModal;