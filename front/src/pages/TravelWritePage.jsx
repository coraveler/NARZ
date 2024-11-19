import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import FormSection from "../Includes/FormComponents/FormSection";
import TitleSection from "../Includes/FormComponents/TitleSection";
import styles from "../css/TrevalWrite/TravelWritePage.module.css";

function TravelWritePage({handleRefreshMileage}) {
  const location = useLocation();
  const post = location.state?.post;
  const postImgUrl = location.state?.postImgUrl;

  useEffect(()=>{
    console.log("시우테스트 로케이션 -> ",location)
    console.log("시우테스트 포스트 -> ",post)
  },[])
  
  return (
    <div className={styles.travelWritePage}>
      <TitleSection post={post}/><hr/>
      <FormSection post={post} postImgUrl={postImgUrl} handleRefreshMileage={handleRefreshMileage}/>
      <br/>
    </div>
  );
}

export default TravelWritePage;