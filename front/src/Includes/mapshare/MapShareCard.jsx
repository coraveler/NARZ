import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import MapCardInfoModal from "./MapCardInfoModal";

function MapShareCard({img, getMapShareImg}){

    const [mapCardInfoModalStatus, setMapCardInfoModalStatus] = useState(false);

    
    
    return(
        <div>
            <div className="card text-center" style={{width:'200px', height:'370px'}}>
                <div className="card-header">
                    {img.userNickname}님의 MAP
                </div>
                <div className="card-body">
                    <img src={require(`../../../../uploads/images/mapshare/${img.mapImgUrl}`)} alt="맵 이미지" style={{width:'150px', height:'200px'}}/>
                    <button onClick={()=>setMapCardInfoModalStatus(true)} className="btn btn-outline-dark">자세히</button>
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