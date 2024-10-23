import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";

const navItems = [
  { text: "인기 게시글 랭킹" },
  { text: "유저 활동 랭킹" },
  { text: "명예의 전당" }
];

function RankingNavigation({ onRankChange }) {
  return (
    <nav>
      <NavigationContainer>
        <VerticalDividerWrapper>
          <VerticalDivider />
        </VerticalDividerWrapper>
        <NavigationList>
          {navItems.map((item, index) => (
            <NavItem key={index} text={item.text} onClick={() => onRankChange(item.text)} />
          ))}
        </NavigationList>
      </NavigationContainer>
    </nav>
  );
}

const NavigationContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  padding: 1px 0;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const NavigationList = styled.ul`
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: 35px;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const VerticalDividerWrapper = styled.li`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 51px;
`;

const VerticalDivider = styled.div`
  border-right: 2px solid #e0e0e0;
  min-height: 40px;
  width: 2px;
`;

export default RankingNavigation;
