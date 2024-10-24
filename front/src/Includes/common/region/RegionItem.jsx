import React, { useEffect, useState } from 'react';
import styles from '../../../css/RegionSelector.module.css';
import { useNavigate, useParams } from "react-router-dom";

const RegionItem = ({ iconSrc, name, href }) => {
  const navigate = useNavigate();
  const { local } = useParams();
  const [itemState, setItemState] = useState(0);

  useEffect(() => {
        if(href == "/localboard/"+local ){
          setItemState(1);
        }else{
          setItemState(0);
        }
}, [local]);

  return (
    // <a href={href} className={styles.RegionItem}>
    <div onClick={() => navigate(href)}>
      <img loading="lazy" src={iconSrc} alt="" className={itemState ? styles.selectIcon : styles.regionIcon} /><p/>
      <span className={styles.regionName}>{name}</span>
    </div>
    // </a>
  );
};

export default RegionItem;