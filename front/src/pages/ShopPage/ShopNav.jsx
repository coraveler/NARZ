import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import styles from "../../css/Shop/Shop.module.css"; 

function ShopNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <nav className={styles.navbar}> 
        <ul>
          <li>
            <Link 
              to="/shop"
              className={`${styles.link} ${activeLink === "/shop" ? styles.active : ""}`}
              onClick={() => handleLinkClick("/shop")}
            >
              포인트 쿠폰
            </Link>
          </li>
          <li>
            <Link 
              to="/purchase"
              className={`${styles.link} ${activeLink === "/purchase" ? styles.active : ""}`}
              onClick={() => handleLinkClick("/purchase")}
            >
              포인트 상점
            </Link>
          </li>
          <li>
            <Link 
              to="/history"
              className={`${styles.link} ${activeLink === "/history" ? styles.active : ""}`}
              onClick={() => handleLinkClick("/history")}
            >
              포인트 내역
            </Link>
          </li>
        </ul>
      </nav>
      <hr/>
    </div>
  );
}

export default ShopNav;
