import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const navItems = [
  { text: "인기 게시글 랭킹", path: "/ranking/popular" },
  { text: "유저 활동 랭킹", path: "/ranking/user-activity" },
  { text: "명예의 전당", path: "/ranking/hall-of-fame" }
];

function RankingNavigation({ onRankChange, activeRank }) {
  return (
    <nav>
      <NavigationContainer>
        <VerticalDividerWrapper> 
          <VerticalDivider />
        </VerticalDividerWrapper>
        <NavigationList>
          {navItems.map((item, index) => (
            <li key={index}>
              <StyledLink
                to={item.path}
                onClick={() => onRankChange(item.text)}
                isActive={activeRank === item.text}  // active 상태 확인
              >
                {item.text}
              </StyledLink>
            </li>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "black" : "gray")};  // 클릭된 항목이면 검정색
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};  // 클릭된 항목이면 진하게
  &:hover {
    text-decoration: underline;
  }
`;

export default RankingNavigation;
