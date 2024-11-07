import { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../../api/axios";
import '../../css/mapshare/MapShare.css';
import MapCardInfoModal from "./MapCardInfoModal";

function MapShareCard({img, getMapShareImg, fetchSelfMapShareImg, currentViewMethod, currentViewChange}){

    const [mapCardInfoModalStatus, setMapCardInfoModalStatus] = useState(false);
    const [mapLikeStatus, setMapLikeStatus] = useState(false);
    const [mapLikeTotal, setMapLikeTotal] = useState('');
    const [popoverShow, setPopoverShow] = useState(false); // 팝오버의 표시 상태 관리

    // 좋아요 추가
    const addMapLike = async() => {
        try{
            if(localStorage.getItem("loginInfo")){
                await api.post(`/api/maplike?userId=${JSON.parse(localStorage.getItem("loginInfo")).data.userId}&mapId=${img.mapId}`)
                checkMapLike()
                fetchMapLike()
            }
        }catch(e){
            console.log(e);
        }
    }

    // 계정당 현재 좋아요 상태
    const checkMapLike = async() => {
        try{
            if(localStorage.getItem("loginInfo")){
                const response = await api.get(`/api/maplike?userId=${JSON.parse(localStorage.getItem("loginInfo")).data.userId}&mapId=${img.mapId}`)
                setMapLikeStatus(response.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    // 좋아요 취소
    const deleteMapLike = async() => {
        try{
            if(localStorage.getItem("loginInfo")){
                await api.delete(`/api/maplike?userId=${JSON.parse(localStorage.getItem("loginInfo")).data.userId}&mapId=${img.mapId}`)
                checkMapLike()
                fetchMapLike()
            }
        }catch(e){
            console.log(e);
        }
    }

    // 지도당 좋아요 총 개수
    const fetchMapLike = async() => {
        try{
            const response = await api.get(`/api/mapliketotal?mapId=${img.mapId}`)
            response.status == 200
            ? setMapLikeTotal(response.data)
            : setMapLikeTotal('')
            
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        checkMapLike()
        fetchMapLike()
    },[])

    // 팝오버 내용
    const popoverContent = mapLikeStatus
    ? "좋아요 완료!"
    : "좋아요 취소!";

    const popover = (
        localStorage.getItem("loginInfo") ? (
            <Popover className="map-like-popover">
                <Popover.Body>{popoverContent}</Popover.Body>
            </Popover>
        ) : (
            <Popover className="map-like-popover">
                <Popover.Body>로그인 필요!</Popover.Body>
            </Popover>
        )
    );

    const handleLikeClick = () => {
        setPopoverShow(true);
        setTimeout(() => {
          setPopoverShow(false); // 1초 후에 팝오버 닫기
        }, 1000);
    }
    
    return(
        <div>
            <div className="card text-center map-share-card" style={{width:'170px', height:'310px'}}><p/>
                <div style={{position:'absolute', top:'3%', left:'10%'}}>
                    <OverlayTrigger trigger="click" placement="top" overlay={popover} show={popoverShow}>
                        {mapLikeStatus
                        ? <div onClick={() => {deleteMapLike(); handleLikeClick();}}>
                            <FaHeart style={{fontSize:'17px', marginRight:'4px', color:'red'}} />
                            <span style={{fontSize:'15px', fontWeight:'500'}}>{mapLikeTotal}</span>
                        </div>
                        : <div onClick={() => {addMapLike(); handleLikeClick();}}>
                            <FaRegHeart style={{fontSize:'17px', marginRight:'4px'}} />
                            <span style={{fontSize:'15px', fontWeight:'500'}}>{mapLikeTotal}</span>
                        </div>}
                    </OverlayTrigger>
                    
                </div>

                <div onClick={()=>setMapCardInfoModalStatus(true)}>
                    {/* <div className="title-font">{img.userNickname}'s' MAP</div> */}
                    <div >
                        <img src={`http://localhost:7777/api/uploads/images/mapshare/${img.mapImgUrl}`} 
                            alt="맵 이미지" 
                            style={{width:'100px', height:'220px', marginTop:'20px'}}/>
                    </div>
                </div>

                {/* <OverlayTrigger trigger="click" placement="top" overlay={popover} show={popoverShow}>
                    {mapLikeStatus
                    ?<div className="like-footer" onClick={() => {deleteMapLike(); handleLikeClick();}}>좋아요 취소</div>
                    :<div className="like-footer" onClick={() => {addMapLike(); handleLikeClick();}}>좋아요</div>}
                </OverlayTrigger> */}

            <div className="like-footer map-share-nickname">{img.userNickname}</div>
                
            </div>

            <MapCardInfoModal 
                img={img} 
                mapCardInfoModalStatus={mapCardInfoModalStatus}
                mapCardInfoModalClose={()=>setMapCardInfoModalStatus(false)}
                getMapShareImg={getMapShareImg}
                mapLikeTotal={mapLikeTotal}
                fetchSelfMapShareImg={fetchSelfMapShareImg}
                currentViewMethod={currentViewMethod}
                currentViewChange={currentViewChange}/>
        </div>
    )
}

export default MapShareCard;