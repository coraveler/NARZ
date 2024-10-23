import React from 'react';
import styles from '../../../css/RegionSelector.module.css';
import { useNavigate } from "react-router-dom";

const RegionItem = ({ iconSrc, name, href }) => {
  const navigate = useNavigate();

  return (
    // <a href={href} className={styles.RegionItem}>
    <div onClick={() => navigate(href)}>
      <img loading="lazy" src={iconSrc} alt="" className={styles.regionIcon} /><p/>
      <span className={styles.regionName}>{name}</span>
    </div>
    // </a>
  );
};

export default RegionItem;