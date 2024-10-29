import React, { useEffect, useState } from 'react';
import styles from '../../../css/RegionSelector.module.css';
import { useNavigate, useParams } from "react-router-dom";

const RegionItem = ({ iconSrc, name, href, board }) => {
  const navigate = useNavigate();
  const { local } = useParams();
  const [itemState, setItemState] = useState(0);

  useEffect(() => {
    if (href.includes("/board/" + board + "/" + local)) {
          setItemState(1);
        }else{
          setItemState(0);
        }
}, [local]);

  return (
    <div onClick={() => navigate(href)}>
      <img loading="lazy" src={iconSrc} alt="" className={itemState ? styles.selectIcon : styles.regionIcon} /><p/>
      <span className={itemState ? styles.selectName : styles.regionName}>{name}</span>
    </div>
  );
};

export default RegionItem;