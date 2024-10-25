import React from 'react';
import styled from 'styled-components';

const LeaderboardHeader = () => {
  return (
    <HeaderRow>
      <HeaderCell>순위</HeaderCell>
      <HeaderCell>작성자</HeaderCell>
      <HeaderCell>게시판</HeaderCell>
      <HeaderCell>평점</HeaderCell>
      <HeaderCell>조회수</HeaderCell>
      <HeaderCell>좋아요</HeaderCell>
    </HeaderRow>
  );
};

const HeaderRow = styled.div`
  display: flex;
  color: #1e1e1e;
  letter-spacing: -0.45px;
  font: 700 14px/2 Inter, sans-serif; 
  background-color: rgb(237, 193, 111);
  padding: 8px; 
  justify-content: center;
`;

const HeaderCell = styled.div`
  flex: 1;
  padding: 4px; 
  min-width: 100px;
  text-align: center;
`;

export default LeaderboardHeader;
