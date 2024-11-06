import { RiDeleteBinLine } from "react-icons/ri";
import ReactModal from "react-modal";
import api from "../../api/axios";

function MapCardDeleteModal({
    mapCardDeleteModalStatus,
    mapCardDeleteModalClose,
    img,
    getMapShareImg
}){

    // 해당 카드 삭제
    const deleteMapCard = async () => {
        try{
            const response = await api.delete(`/api/mapshare?mapId=${img.mapId}&mapImgUrl=${img.mapImgUrl}`)
            response.status==200?alert("삭제가 완료되었습니다"):alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.")
            getMapShareImg();   // 다시 공유 이미지 가져오기
        }catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            <ReactModal
                isOpen={mapCardDeleteModalStatus}
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
                        width: '22vw'}}}>
                    
                <div style={{textAlign:'center', marginTop:'10px'}}>
                    <RiDeleteBinLine style={{fontSize:'35px', color:'orange'}}/><p/>
                    <div style={{fontWeight:'bold'}}>
                        나만의 지도를 정말 삭제하시겠습니까?
                    </div><br/>

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={()=>deleteMapCard()}
                    >삭제
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3', marginBottom:'10px'}}
                        onClick={mapCardDeleteModalClose}
                    >취소
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default MapCardDeleteModal;