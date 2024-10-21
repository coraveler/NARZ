import React from "react";
import TitleSection from "../Includes/FormComponents/TitleSection";
import FormSection from "../Includes/FormComponents/FormSection";
import styles from "../css/TrevalWrite/TravelWritePage.module.css";

function TravelWritePage() {

  return (
    <div className={styles.travelWritePage}>
      <TitleSection />
      <FormSection />
      <br/>
    </div>
  );
}

export default TravelWritePage;