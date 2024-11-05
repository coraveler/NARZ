import { FaRegSquareCheck } from "react-icons/fa6";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

function MapShareMoveModal({
    mapSharePageMoveModalStatus,
    mapSharePageMoveModalClose
}){

    const navigate = useNavigate();

    return(
        <div>
            <ReactModal
                isOpen={mapSharePageMoveModalStatus}
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
                        width: '25vw'}}}>
                    
                <div style={{textAlign:'center'}}>
                    <FaRegSquareCheck style={{fontSize:'40px', color:'orange', marginTop:'10px'}}/><p/>
                    <div style={{fontWeight:'bold'}}>
                        등록이 완료되었습니다. 
                    </div>
                    <div>
                        해당 페이지로 이동하시겠습니까?
                    </div><br/>

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={(()=>{
                            navigate("/mapshare")
                        })}
                    >예
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3', marginBottom:'10px'}}
                        onClick={mapSharePageMoveModalClose}
                    >아니오
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default MapShareMoveModal;