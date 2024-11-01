import React, { useState, useEffect } from 'react';
import styles from '../../../css/TravelCard.module.css';
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa"; // 빈 별과 채워진 별 아이콘
import { FaRegStarHalfStroke } from "react-icons/fa6"; // 반 별 아이콘
import BookMark from '../BookMark';
import LikeIcon from '../LikeIcon';
import { getLoginInfo } from "../../../Includes/common/CommonUtil";

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

  return (
    <article className={styles.travelCard}
      onClick={() => navigate(`/postpage/${props.data.postId}`, {state : {trimmedUrl:props.trimmedUrl}})}>
      <div style={{ width: '150px', height: '150px', overflow: 'hidden' }}> {/* overflow: hidden 추가 */}
        <img src={imageUrls} alt={`${props.data.title} view`} className={styles.cardImage} />
      </div>
      <br/>
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
                {props.data.rating > currentRating ? (
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