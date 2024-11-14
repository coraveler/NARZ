import ReactModal from "react-modal";
import KakaoMap from "./KakaoMap";

function FestivalMapModal({
    festivalMapModalStatus,
    festivalMapModalClose,
    el
}){

    return(
        <div>
            <ReactModal
                isOpen={festivalMapModalStatus}
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
                        width: '600px'}}}
                    closeTimeoutMS={200}>

                <div style={{textAlign:'left'}}>
                    <div style={{textAlign:'right'}}>
                        <button class="btn-close"
                                style={{fontSize:'25px', marginBottom:'25px'}}
                                onClick={festivalMapModalClose}/>
                    </div>
                </div>

                <KakaoMap el={el}/>

            </ReactModal>
        </div>
    )
}

export default FestivalMapModal;