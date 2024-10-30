import React from 'react';
import styled from 'styled-components';

const LeaderboardHeader = ({ activeRank }) => {
  return (
    <HeaderRow>
      {activeRank === "인기 게시글 랭킹" && (
        <>
          <HeaderCell>순위</HeaderCell>
          <HeaderCell>작성자</HeaderCell>
          <HeaderCell>게시판</HeaderCell>
          <HeaderCell>평점</HeaderCell>
          <HeaderCell>조회수</HeaderCell>
          <HeaderCell>좋아요</HeaderCell>
        </>
      )}
      {activeRank === "유저 활동 랭킹" && (
        <>
          <HeaderCell>순위</HeaderCell>
          <HeaderCell>작성자</HeaderCell>
          <HeaderCell>게시물 수</HeaderCell>
          <HeaderCell>댓글 수</HeaderCell>
        </>
      )}
      {activeRank === "명예의 전당" && (
        <>
          <HeaderCell>순위</HeaderCell>
          <HeaderCell>작성자</HeaderCell>
        </>
      )}
    </HeaderRow>
  );
};

// 기존 스타일 코드 유지
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
  padding: 8px;
  text-align: center;
  min-width: 100px;
`;

export default LeaderboardHeader;
