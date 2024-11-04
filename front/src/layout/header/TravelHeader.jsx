import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../../css/TravelHeader.module.css'; // CSS 모듈 임포트
import NavigationLink from "./NavigationLink";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const TravelHeader = ({board, local}) => {
  const navLinks = [
    { text: "여행노트", href: "/board/localboard/all" },
    { text: "랭킹", href: "/ranking" },
    { text: "상점", href: "/shop" },
    { text: "축제", href: "/festival" },
    { text: "여행지도공유", href: "/mapShare"},
    localStorage.getItem("loginInfo") ? { text: "개인페이지", href: "/personal" }: ''
  ];

  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logoContainer} onClick={() => navigate('/')}>
            <div className={styles.logo}>NARZ</div>
            <div className={styles.logoSubtitle}>나만 알고 있는 지역</div>
          </div>
          
          {navLinks.map((link, index) => (
            <NavigationLink key={index} {...link} />
          ))}
        </nav>
        <SearchBar board={board} local={local}/>
        <UserActions />
      </div>
    </div>
  );
};

export default TravelHeader;
