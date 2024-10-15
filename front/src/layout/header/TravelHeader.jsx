import React from "react";
import styled from "styled-components";
import NavigationLink from "./NavigationLink";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import { useNavigate } from 'react-router-dom';

const TravelHeader = () => {
  const navLinks = [
    { text: "지역", href: "/localboard" },
    { text: "랭킹", href: "#" },
    { text: "상점", href: "#" },
    { text: "개인페이지", href: "/personal" },
  ];

  const navigate = useNavigate();

  return (
    <Header>
      <Container>
        <Nav>
          <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/776247c9bbc02598406bd3e931ee9dbc12289c2fba1447e805ade00b73f87025?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="Travel Logo" onClick={() => navigate('/')}/>
          {navLinks.map((link, index) => (
            <NavigationLink key={index} {...link} />
          ))}
          <ActiveIndicator />
        </Nav>
        <SearchBar />
        <UserActions />
      </Container>
    </Header>
  );
};

const Header = styled.header`
  background-color: #fff;
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.2);
  color: #333;
  font: 350 20px 'Noto Sans KR', sans-serif;
  width: 100%; // 추가
  overflow: hidden; // 추가
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
  min-width: 00px; // 필요에 따라 조정
  padding-right: 20px; // 여백 줄이기
  align-items: center;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  line-height: 0.2;
  justify-content: start;
  flex: 1;
  flex-basis: auto; // '0%'에서 'auto'로 변경
  margin: auto 0;
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;


const Logo = styled.img`
  aspect-ratio: 2.43;
  object-fit: contain;
  object-position: center;
  width: 185px;
  align-self: stretch;
  z-index: 0;
  margin: auto 0;
  cursor: pointer;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  z-index: 0;
  width: 70px;
  height: 90px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

export default TravelHeader;