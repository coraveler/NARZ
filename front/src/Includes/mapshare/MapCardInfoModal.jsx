import { useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdFestival, MdLandscape } from "react-icons/md";
import { TbLocationFilled, TbRoad } from "react-icons/tb";
import ReactModal from "react-modal";
import MapCardDeleteModal from "./MapCardDeleteModal";

function MapCardInfoModal({
    mapCardInfoModalStatus,
    mapCardInfoModalClose,
    img,
    getMapShareImg
}){

    const [mapCardDeleteModalStatus, setMapCardDeleteModalStatus] = useState(false);

    return(
        <div>
            <ReactModal
                isOpen={mapCardInfoModalStatus}
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
                        width: '350px'}}}>

                <div style={{textAlign:'left'}}>
                    <div style={{textAlign:'right'}}>
                    <button className="btn-close"
                            style={{fontSize:'20px'}}
                            onClick={()=>mapCardInfoModalClose()}/>
                    </div>
                    
                    <h5 style={{width:'220px'}}><MdFestival style={{marginBottom:'5px', color:'#FFB74D'}}/>a</h5><hr/>

                    <div style={{marginBottom:'14px', marginTop:'20px'}}>
                        <div style={{marginBottom:'2px'}}><FaRegCalendarCheck style={{marginBottom:'5px', color:'#FFB74D'}}/> 기간</div>
                        <div>a</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><TbLocationFilled style={{marginBottom:'3px', color:'#FFB74D'}}/> 장소</div>
                        <div>a</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><TbRoad style={{marginBottom:'3px', color:'#FFB74D'}}/> 도로명주소</div>
                        <div>a</div>
                    </div>
                    <div style={{marginBottom:'14px'}}>
                        <div style={{marginBottom:'2px'}}><MdLandscape style={{marginBottom:'3px', color:'#FFB74D'}}/> 지번주소</div>
                        <div>a</div>
                    </div>
                    <button onClick={()=>setMapCardDeleteModalStatus(true)}>삭제</button>

                </div>
            </ReactModal>

            <MapCardDeleteModal 
                mapCardDeleteModalStatus={mapCardDeleteModalStatus}
                mapCardDeleteModalClose={()=>setMapCardDeleteModalStatus(false)}
                img={img}
                getMapShareImg={getMapShareImg}/>
        </div>
    )
}

export default MapCardInfoModal;