import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuPen } from "react-icons/lu";
import ReactModal from "react-modal";
import MapCardDeleteModal from "./MapCardDeleteModal";


function MapCardInfoModal({
    mapCardInfoModalStatus,
    mapCardInfoModalClose,
    img,
    getMapShareImg,
    mapLikeTotal,
    fetchSelfMapShareImg,
    currentViewMethod,
    currentViewChange
}){

    const [mapCardDeleteModalStatus, setMapCardDeleteModalStatus] = useState(false);

    const date = new Date(img.createdDate)
    let formDate = date.toLocaleDateString()
    formDate = formDate.replace(/\.$/, ''); // 문자열 끝에 있는 점만 제거

    useEffect(()=>{
        console.log()
    },[])

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
                        width: '30vw',
                        scrollbarWidth: 'thin'}}}>

                <div style={{textAlign:'center'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div>등록일: {formDate}</div>
                        {/* <div>등록일: {date.toLocaleDateString()}-{date.toLocaleTimeString()}</div> */}
                        <div>
                            <button className="btn-close"
                                style={{fontSize:'25px'}}
                                onClick={()=>mapCardInfoModalClose()}/>
                        </div>
                    </div>
                    

                    <div className="title-font" style={{fontSize:'40px'}}>
                        {img.userNickname}'s' MAP
                    </div>

                    <div style={{position: 'relative'}}>
                        <img src={`http://localhost:7777/api/uploads/images/mapshare/${img.mapImgUrl}`} alt="맵 이미지" style={{width:'250px', height:'500px', marginTop:'5px'}}/>
                        {localStorage.getItem("loginInfo") && JSON.parse(localStorage.getItem("loginInfo")).data.userId==img.userId
                        ? <button 
                            className="btn btn-outline-dark" 
                            style={{width:'90px', height:'38px', position: 'absolute', right:'10px', bottom:'0'}}
                            onClick={()=>setMapCardDeleteModalStatus(true)}
                        >삭제
                        </button>
                        :''}
                        
                    </div><br/><br/>

                
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <div style={{marginRight:'20px', display:'flex', alignItems:'center'}}><LuPen style={{color:'orange'}}/><span style={{color:''}}>&nbsp;작성자:&nbsp;</span><span style={{fontWeight:'bold'}}>{img.userNickname}</span></div>
                        <div style={{display:'flex', alignItems:'center'}}><FaHeart style={{color:'red'}}/><span style={{color:''}}>&nbsp;좋아요:&nbsp;</span><span style={{fontWeight:'bold'}}>{mapLikeTotal}</span></div>
                    </div><br/>
                    
                    
                   

                </div>
            </ReactModal>

            <MapCardDeleteModal 
                mapCardDeleteModalStatus={mapCardDeleteModalStatus}
                mapCardDeleteModalClose={()=>setMapCardDeleteModalStatus(false)}
                img={img}
                getMapShareImg={getMapShareImg}
                fetchSelfMapShareImg={fetchSelfMapShareImg}
                currentViewMethod={currentViewMethod}
                currentViewChange={currentViewChange}/>
        </div>
    )
}

export default MapCardInfoModal;