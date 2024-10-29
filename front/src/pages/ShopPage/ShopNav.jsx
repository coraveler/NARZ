import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import styles from "../../css/Shop/Shop.module.css"; 

function ShopNav() {
  return (
    <div>
      <nav className={styles.navbar}> 
        <ul>
          <li><Link to="/shop">포인트 쿠폰</Link></li> 
          <li><Link to="/purchase">포인트 사용</Link></li> 
          <li><Link to="/history">포인트 내역</Link></li>
        </ul>
      </nav>
      <hr/>
    </div>
  );
}

export default ShopNav;
