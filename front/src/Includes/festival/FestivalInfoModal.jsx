import { FaRegCalendarCheck } from "react-icons/fa";
import { MdFestival, MdLandscape } from "react-icons/md";
import { TbLocationFilled, TbRoad } from "react-icons/tb";
import ReactModal from "react-modal";

function FestivalInfoModal({
    festivalInfoModalStatus,
    festivalInfoModalClose,
    el // 해당 object data
    }){

    return(
        <div>
            <ReactModal
                isOpen={festivalInfoModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(3px)',
                        zIndex: 1000},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '35px',
                        padding: '40px',
                        width: '350px'}}}
                    closeTimeoutMS={200}>

                <div style={{textAlign:'left'}}>
                    <div style={{textAlign:'right'}}>
                    <button className="btn-close"
                            style={{fontSize:'20px'}}
                            onClick={festivalInfoModalClose}/>
                    </div>
                    
                    <h5 style={{width:'220px'}}><MdFestival style={{marginBottom:'5px', color:'#FFB74D'}}/> {el.title}</h5><hr/>

                    <div style={{marginBottom:'14px', marginTop:'20px'}}>
                        <div style={{marginBottom:'2px'}}><FaRegCalendarCheck style={{marginBottom:'5px', color:'#FFB74D'}}/> 기간</div>
                        <div>{el.startDate} ~ {el.endDate}</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><TbLocationFilled style={{marginBottom:'3px', color:'#FFB74D'}}/> 장소</div>
                        <div>{el.place}</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><TbRoad style={{marginBottom:'3px', color:'#FFB74D'}}/> 도로명주소</div>
                        <div>{el.roadAddress ? el.roadAddress : "정보 없음"}</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><MdLandscape style={{marginBottom:'3px', color:'#FFB74D'}}/> 지번주소</div>
                        <div>{el.landAddress ? el.landAddress : "정보 없음"}</div>
                    </div>

                </div>
            </ReactModal>
        </div>
    )
}

export default FestivalInfoModal;