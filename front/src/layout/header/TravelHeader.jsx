import React from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import NavigationLink from "./NavigationLink";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";


const TravelHeader = () => {
  const navLinks = [
    { text: "지역", href: "/board/localboard/all" },
    { text: "랭킹", href: "/ranking" },
    { text: "상점", href: "/shop" },
    { text: "개인페이지", href: "/personal" },
    { text: "축제", href: "/festival" }
  ];

  const navigate = useNavigate();

  return (

    <>
    <GlobalStyle /> {/* 글로벌 스타일 적용 */}
    <Header>
      <Container>
        <Nav>
          <div style={{flexDirection: 'column', marginRight:'50px', marginBottom:'7px', marginLeft:'3px'}}>
            <Logo onClick={() => navigate('/')}>NARZ</Logo>
            <div style={{fontSize:'10px'}}>나만 알고 싶은 지역</div>
          </div>
          
          {navLinks.map((link, index) => (
            <NavigationLink key={index} {...link} />
          ))}
          {/* <ActiveIndicator /> */}
        </Nav>
        <SearchBar />
        <UserActions />
      </Container>
    </Header>
  </>
  );
};

const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.2);
  color: #333;
  font: 350 20px 'Noto Sans KR', sans-serif;
  width: 100%; // 추가
  overflow: hidden; // 추가
  height: 80px;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 20px; // padding 설정
  box-sizing: border-box; // 추가
  @media (max-width: 991px) {
    padding: 0 10px; // 모바일에서도 padding 설정
  }
`;


const Nav = styled.nav`
  align-self: stretch;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: start;
  flex: 1;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;


const Logo = styled.div`
  font-size: 35px; // 로고 텍스트 크기
  font-weight: bold; // 텍스트 두께
  cursor: pointer; // 클릭 가능하게
  font-family: 'HSSanTokki20-Regular'; // 폰트 적용

   &:hover {
    color: #555; // 호버 시 텍스트 색상 변경
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // 호버 시 그림자 변경
`;



// const ActiveIndicator = styled.div`
//   position: absolute;
//   z-index: 0;
//   width: 70px;
//   height: 90px;
//   left: 50%;
//   bottom: 0;
//   transform: translateX(-50%);
// `;

// @font-face 선언
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HSSanTokki20-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

export default TravelHeader;