import ReactModal from "react-modal";
import KakaoMap from "./KakaoMap";

function FestivalMapModal({
    festivalMapModalStatus,
    festivalMapModalClose,
    el
}){

    return(
        <div style={{ fontFamily:'KCC-Hanbit'}}>
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

                <div style={{textAlign:'left', fontFamily:'KCC-Hanbit'}}>
                    <div style={{textAlign:'right', fontFamily:'KCC-Hanbit'}}>
                        <button class="btn-close"
                                style={{fontSize:'25px', marginBottom:'25px', fontFamily:'KCC-Hanbit'}}
                                onClick={festivalMapModalClose}/>
                    </div>
                </div>

                <KakaoMap el={el}/>

            </ReactModal>
        </div>
    )
}

export default FestivalMapModal;