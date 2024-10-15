import React from "react";
import TitleSection from "./TitleSection";
import FormSection from "../../FormComponents/FormSection";
import styles from "../../css/TravelWritePage.module.css";

function TravelWritePage() {
  return (
    <div className={styles.travelWritePage}>
      <Header />
      <TitleSection />
      <FormSection />
      <Footer />
    </div>
  );
}

export default TravelWritePage;