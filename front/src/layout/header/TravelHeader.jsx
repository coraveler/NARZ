import React from "react";
import styled from "styled-components";
import NavigationLink from "./NavigationLink";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

const TravelHeader = () => {
  const navLinks = [
    { text: "지역", href: "#" },
    { text: "랭킹", href: "#" },
    { text: "쿠폰", href: "#" },
    { text: "개인페이지", href: "#" },
  ];

  return (
    <Header>
      <Container>
        <Nav>
          <Logo src="https://cdn.builder.io/api/v1/image/assets/TEMP/776247c9bbc02598406bd3e931ee9dbc12289c2fba1447e805ade00b73f87025?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="Travel Logo" />
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
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 17px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 60px 0 80px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Nav = styled.nav`
  align-self: stretch;
  position: relative;
  display: flex;
  min-width: 240px;
  padding-right: 81px;
  align-items: center;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  line-height: 4.5;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;
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