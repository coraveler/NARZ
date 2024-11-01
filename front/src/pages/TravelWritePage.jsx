import React, { useEffect } from "react";
import TitleSection from "../Includes/FormComponents/TitleSection";
import FormSection from "../Includes/FormComponents/FormSection";
import styles from "../css/TrevalWrite/TravelWritePage.module.css";
import { useLocation } from 'react-router-dom';

function TravelWritePage() {
  const location = useLocation();
  const post = location.state?.post;
  const postImgUrl = location.state?.postImgUrl;
  
  return (
    <div className={styles.travelWritePage}>
      <TitleSection post={post}/>
      <FormSection post={post} postImgUrl={postImgUrl}/>
      <br/>
    </div>
  );
}

export default TravelWritePage;