import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
// import '../../../css/ranking/HallOfFame.css';
import api from "../../../api/axios";
import { useNavigate } from 'react-router-dom';
import { PiMedalFill } from "react-icons/pi";

function USerCard({data, cardIndex}){
    const navigate = useNavigate();
    const[userInfo, setUserInfo] = useState();

    const getUserInfo = async() => {
        try{
            const response = await api.get(`/api/rankings/userInfo/${data.author}`);
            console.log(response.data);
            setUserInfo(response.data);
          }catch(error){
            console.error(error);
          }
    }

    useEffect(()=>{
        getUserInfo();
    },[data])

    let rank;

    switch (cardIndex) {
        case 0:
          rank = <div style={{
            position: "absolute", // 부모 요소를 기준으로 위치 설정
            top: "4px", // 카드 상단과의 간격
            left: "0px", // 카드 좌측과의 간격
            color: "gold",
            zIndex: 200,
            display: "flex",
            // alignItems: "center",
          }}><PiMedalFill style={{fontSize:'40px'}}/></div> 
          break;
        case 1:
          rank = <div style={{position: "absolute", // 부모 요소를 기준으로 위치 설정
            top: "4px", // 카드 상단과의 간격
            left: "0px", // 카드 좌측과의 간격
            color: "silver",
            zIndex: 200,
            display: "flex",
            // alignItems: "right",
          }}><PiMedalFill style={{fontSize:'40px'}}/></div> 
          break;
        case 2:
          rank = <div style={{position: "absolute", // 부모 요소를 기준으로 위치 설정
            top: "4px", // 카드 상단과의 간격
            left: "0px", // 카드 좌측과의 간격
            color: "orange",
            zIndex: 200,
            display: "flex",
            // alignItems: "center",
          }}><PiMedalFill style={{fontSize:'40px'}}/></div> 
          break;
        default:
          rank = null;
      }

    return(
        <div className="hof-card" style={{width:"200px", height:"250px", paddingTop:'40px', marginTop:'0px', position: "relative"}}><br/>
            {/* <h2 className="hof-card-title">{cardIndex+1}위</h2> */}
            {rank}
            {/* 카드 이미지 (실제 이미지 URL을 사용하거나, placeholder를 사용) */}
            <img src={`http://localhost:7777/profileImages/${userInfo?.profileImage}`}
                 alt="카드 이미지" className="hof-card-img" onClick={() => navigate(`/personal/${userInfo?.userId}`)}/>
            <div className="hof-card-content">
                <p className="hof-card-description"><div style={{fontWeight:'bold'}}>{data.author}</div></p>
            </div>
        </div>
    )
}

export default USerCard;