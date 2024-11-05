import { GiSouthKorea } from "react-icons/gi";
import ReactModal from "react-modal";


function MapShareConfirmModal({
    shareConfirmModalStatus,
    shareConfirmModalClose,
    handleCapture
}){
    

    return(
        <div>
            <ReactModal
                isOpen={shareConfirmModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(3px)',
                        zIndex: 1001},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '20px',
                        padding: '20px',
                        width: '30vw'}}}>
                    
                <div style={{textAlign:'center'}}>
                    <GiSouthKorea style={{fontSize:'60px', color:'orange', marginTop:'10px'}}/><p/>
                    <div style={{fontWeight:'bold'}}>
                        나만의 지도를 다른 사람들과 공유하시겠습니까?
                    </div><p/>
                    <div>
                        지도를 공유하시게 되면 
                    </div>
                    <div>
                        여행지도공유 페이지에 자동으로 등록됩니다.    
                    </div><br/>

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={(()=>{
                            handleCapture();
                        })}
                    >공유
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3', marginBottom:'10px'}}
                        onClick={shareConfirmModalClose}
                    >취소
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default MapShareConfirmModal;