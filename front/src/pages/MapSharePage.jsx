import { useEffect, useState } from "react";
import MapShareCard from "../Includes/mapshare/MapShareCard";
import api from "../api/axios";

function MapSharePage(){

    const [fetchMapImgs, setFetchMapImgs] = useState([]);

    const getMapShareImg = async() => {
        try{
            const response = await api.get("/api/mapshare")
            if(response.status == 200){
                setFetchMapImgs(response.data);
            }
           
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        getMapShareImg();
    },[fetchMapImgs])

    // useEffect(()=>{
    //     getMapShareImg();
    // },[])

    return(
        <div>
            <div><h4>나만의 지도를 공유해 보세요!</h4></div>
            {fetchMapImgs.map(img => (
                <MapShareCard img={img} key={img.mapId} getMapShareImg={getMapShareImg}/>
            ))}

            
        </div>
    )
}

export default MapSharePage;