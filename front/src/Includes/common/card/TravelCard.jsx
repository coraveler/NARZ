import React, { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from "react-icons/fa"; // 빈 별과 채워진 별 아이콘
import { FaRegStarHalfStroke } from "react-icons/fa6"; // 반 별 아이콘
import { IoLockClosed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../../../Includes/common/CommonUtil";
import styles from '../../../css/TravelCard.module.css';
import BookMark from '../BookMark';
import LikeIcon from '../LikeIcon';
import { PiMedalFill } from "react-icons/pi";

const TravelCard = (props) => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState('');
  let loginInfo = getLoginInfo();
  const userId = loginInfo?.userId || null;

  const getImageUrls = () => {
    // props.data.headerImg가 배열일 경우 첫 번째 이미지를 사용
    if (Array.isArray(props.data.headerImg) && props.data.headerImg.length > 0) {
      setImageUrls(props.data.headerImg[0]); // 첫 번째 이미지 URL을 설정
    } else {
      setImageUrls(props.data.headerImg); // 단일 이미지 URL일 경우
    }
  }

  useEffect(() => {
    getImageUrls();
  }, [props.data]);

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);

  let rank;

  switch (props.cardIndex) {
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

  return (
    <article className={styles.travelCard}
      onClick={() => navigate(`/postpage/${props.data.postId}`, { state: { trimmedUrl: props.trimmedUrl } })}>
      {props.data.secret ?
        <div style={{ height: '10px', marginLeft: "auto" }}>
          <IoLockClosed /></div> :
        props.boardIndex === 1 ? <>{rank}</> :
          <div style={{ height: '10px', marginLeft: "auto" }}></div>
      }
      <div style={{ width: '150px', height: '150px', overflow: 'hidden' }}> {/* overflow: hidden 추가 */}
        <img src={imageUrls} alt={`${props.data.title} view`} className={styles.cardImage} />
      </div>
      <br />
      <div style={{ display: 'flex', width: '90%' }}>
        <LikeIcon userId={userId} postId={props.data.postId} />
        <BookMark userId={userId} postId={props.data.postId} style={["auto", "2px"]} />
      </div>
      <h2 className={styles.cardTitle}>{props.data.title}</h2>
      <p className={styles.cardLocation}>{props.data.userNickname}</p>
      <div className={styles.ratingField}>
        <div className={styles.starContainer}>
          {/* 5개의 별을 렌더링 */}
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1; // 1부터 5까지의 별점

            return (
              <span key={index} className={styles.starButton}>
                {props.data.rating >= currentRating ? (
                  <FaStar className={styles.star} /> // 채워진 별 아이콘
                ) : props.data.rating >= currentRating - 0.5 ? (
                  <FaRegStarHalfStroke className={styles.star} /> // 반 별 아이콘
                ) : (
                  <FaRegStar className={styles.star} /> // 빈 별 아이콘
                )}
              </span>
            );
          })}
        </div>

      </div>
    </article>
  );
};

export default TravelCard;