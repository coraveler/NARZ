import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import '../../css/mapshare/MapShare.css';
import MapCardInfoModal from "./MapCardInfoModal";

function MapShareCard({img, getMapShareImg}){

    const [mapCardInfoModalStatus, setMapCardInfoModalStatus] = useState(false);


    
    return(
        <div>
            <div className="card text-center map-share-card" style={{width:'200px', height:'370px'}}><p/>
                <div className="title-font">
                    {img.userNickname}'s' MAP
                </div>
                <div className="card-body">
                    <img src={`http://localhost:7777/api/uploads/images/mapshare/${img.mapImgUrl}`} alt="맵 이미지" style={{width:'170px', height:'250px'}}
                    onClick={()=>setMapCardInfoModalStatus(true)}/>
                    {/* <button onClick={()=>setMapCardInfoModalStatus(true)} className="btn btn-outline-dark">자세히</button> */}
                </div>
                <div className="card-footer text-body-secondary">
                    <FaRegHeart/> 0
                </div>
            </div>

            <MapCardInfoModal 
                img={img} 
                mapCardInfoModalStatus={mapCardInfoModalStatus}
                mapCardInfoModalClose={()=>setMapCardInfoModalStatus(false)}
                getMapShareImg={getMapShareImg}/>
        </div>
    )
}

export default MapShareCard;