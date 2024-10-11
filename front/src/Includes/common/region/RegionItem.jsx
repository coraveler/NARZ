import React from 'react';
import styles from '../../../css/RegionSelector.module.css';

const RegionItem = ({ iconSrc, name }) => {
  return (
    <a href="#" className={styles.RegionItem}>
      <img loading="lazy" src={iconSrc} alt="" className={styles.regionIcon} /><br/>
      <span className={styles.regionName}>{name}</span>
    </a>
  );
};

export default RegionItem;