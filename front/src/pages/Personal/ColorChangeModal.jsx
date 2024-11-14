import { PiSealWarningBold } from "react-icons/pi";
import ReactModal from "react-modal";

function ColorChangeModal({colorChangeModalStatus,colorChangeModalClose,colorChangeComplete, nickNameColor, fetchNameColor}){

    
    return(
        <div>
            <ReactModal
                isOpen={colorChangeModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(2px)',
                        zIndex: 1001},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '20px',
                        padding: '20px',
                        width: '25vw'}}}
                    closeTimeoutMS={200}>
                    
                <div style={{textAlign:'center'}}>
                    <PiSealWarningBold style={{fontSize:'40px', color:'orange'}}/><p/>
                    <div>색상 변경 시 1000 포인트가 차감됩니다.</div>
                    <div>"이 색상으로 변경해도 괜찮으신가요?"</div><br/>

                    <button
                        className="button select-button"
                        style={{width:"7vw", border:'2px solid #a9a3a3'}}
                        onClick={()=>{
                            if(nickNameColor == fetchNameColor){
                                alert('기존 색상과 동일합니다. 색상을 변경해 주세요')
                            }else{
                                colorChangeComplete()
                            }
                            
                        }}
                    >변경
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"7vw", border:'2px solid #a9a3a3'}}
                        onClick={colorChangeModalClose}
                    >취소
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default ColorChangeModal;