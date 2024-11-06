import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../css/NavigationLink.module.css'; // CSS 모듈 임포트
import { getLoginInfo } from "../../Includes/common/CommonUtil";

const NavigationLink = ({ text, href, userId }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(0);
  let loginInfo = getLoginInfo();
  const loginUserId = loginInfo?.userId || null;

  // 현재 경로가 '/localboard'를 포함하는지 확인 (하위 경로 포함)
  // const isActive = href === '/board/localboard/all' 
  //   ? location.pathname.includes('/localboard')  // '/localboard'를 포함하면 활성화
  //   : location.pathname.startsWith(href);        // 다른 링크들은 경로가 시작하는지 확인


  const handleActive = () => {

    switch (href) {
      case "/board/localboard/all":
        return location.pathname.includes('/board') && !location.pathname.includes('/board/travelog');
      case "/personal":
        if (location.pathname.includes('/travelog')) {
          // userId가 null인 경우 참을 리턴
          if (userId === null) {
            return true; // userId가 null이면 참
          } else {
            return location.pathname.includes('/travelog') && (userId === loginUserId); // userId가 null이 아니면 조건 평가
          }
        }
        else {
          const isPersonalPath = /^\/personal(\/(?!\d)[\w-]*)?$/.test(location.pathname);
          return isPersonalPath;
        }
      default:
        return location.pathname.startsWith(href);
    }
  }

  useEffect(() => {
    setIsActive(handleActive());
  }, [location, userId])
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