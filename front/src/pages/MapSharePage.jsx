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
    },[])

    return(
        <>
            <div >
                <br/>
                <div style={{textAlign:'center'}}><h4>나만의 지도를 공유해 보세요!</h4></div>
                <div style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
                    <div style={{display:'flex', flexWrap: 'wrap',gap:'30px'}}>
                        {fetchMapImgs.map(img => (
                            <MapShareCard img={img} key={img.mapId} getMapShareImg={getMapShareImg}/>
                        ))}
                    </div>
                </div>

                <br/>
            </div>
        </>
    )
}

export default MapSharePage;