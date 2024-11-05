import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../css/NavigationLink.module.css'; // CSS 모듈 임포트

const NavigationLink = ({ text, href }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(0);

  // 현재 경로가 '/localboard'를 포함하는지 확인 (하위 경로 포함)
  // const isActive = href === '/board/localboard/all' 
  //   ? location.pathname.includes('/localboard')  // '/localboard'를 포함하면 활성화
  //   : location.pathname.startsWith(href);        // 다른 링크들은 경로가 시작하는지 확인


  const handleActive = () => {
    switch(href){
      case "/board/localboard/all":
        return location.pathname.includes('/localboard');
      case "/personal":
        if(location.pathname.includes('/travelog')){
          return location.pathname.includes('/travelog');
        }else{
          return location.pathname.includes('/personal');
        }
      default:
        return location.pathname.startsWith(href);   
    }
  }

  useEffect(() => {
    setIsActive(handleActive());
  },[location])
  return (
    <Link 
      to={href} 
      className={`${styles.styledLink} ${isActive ? styles.active : ''}`} // 활성 상태일 때 추가 클래스 적용
    >
      {text}
    </Link>
  );
};

export default NavigationLink;