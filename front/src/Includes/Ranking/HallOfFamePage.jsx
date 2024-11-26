import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import '../../css/ranking/HallOfFame.css';
import api from "../../api/axios";
import { useNavigate } from 'react-router-dom';

function HallOfFamePage({rank, author}){
    const navigate = useNavigate();
    const[userInfo, setUserInfo] = useState();

    const getUserInfo = async() => {
        try{
            const response = await api.get(`/api/rankings/userInfo/${author}`);
            console.log(response.data);
            setUserInfo(response.data);
          }catch(error){
            console.error(error);
          }
    }

    useEffect(()=>{
        getUserInfo();
    },[author])

    return(
        <div className="hof-card"><br/>
            {rank == 1
            ?<>
            <FaCrown style={{position:'absolute', top:'-70px', fontSize:'70px', color:'gold'}}/>
            {/* <img src={`http://localhost:7777/profileImages/${userInfo?.profileImage}`}
                style={{position:'absolute', top:'92px', width:'240px'}}/> */}
            {/* <img src="/img/ranking/outline_2.png" style={{position:'absolute', top:'-50px', width:'390px', height:'500px'}}/> */}
            </>
            :''}
            
            <h2 className="hof-card-title">{rank}위</h2>
            
            {/* 카드 이미지 (실제 이미지 URL을 사용하거나, placeholder를 사용) */}
            <img src={userInfo?.profileImage=="default.png" ? "/img/default.png" : `http://211.188.63.26:7777/profileImages/${userInfo?.profileImage}`}
                 alt="카드 이미지" className="hof-card-img" onClick={() => navigate(`/personal/${userInfo?.userId}`)}/>
            <div className="hof-card-content">
                <p className="hof-card-description">{rank==1?<div style={{fontWeight:'bold'}}>{author}</div>:author}</p>
            </div>
        </div>
    )
}

export default HallOfFamePage;