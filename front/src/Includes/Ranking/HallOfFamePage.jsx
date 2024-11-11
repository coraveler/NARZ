import { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import '../../css/ranking/HallOfFame.css';

function HallOfFamePage({rank, author}){

    useEffect(()=>{

    },[])

    return(
        <div className="hof-card"><br/>
            {rank == 1
            ?<>
            <FaCrown style={{position:'absolute', top:'-70px', fontSize:'70px', color:'gold'}}/>
            <img src="/img/ranking/outline_1.png" style={{position:'absolute', top:'92px', width:'240px'}}/>
            {/* <img src="/img/ranking/outline_2.png" style={{position:'absolute', top:'-50px', width:'390px', height:'500px'}}/> */}
            </>
            :''}
            
            <h2 className="hof-card-title">{rank}위</h2>
            {/* 카드 이미지 (실제 이미지 URL을 사용하거나, placeholder를 사용) */}
            <img src="https://via.placeholder.com/300x200" alt="카드 이미지" className="hof-card-img" />
            <div className="hof-card-content">
                <p className="hof-card-description">{rank==1?<div style={{fontWeight:'bold'}}>{author}</div>:author}</p>
            </div>
        </div>
    )
}

export default HallOfFamePage;