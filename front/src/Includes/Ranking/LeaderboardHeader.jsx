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
  text-align: right;  // 텍스트 오른쪽 정렬
  letter-spacing: -0.45px;
  font: 700 14px/3 Inter, sans-serif;
  background-color: #e6eaf3; // 헤더 배경색 추가;
`;

const HeaderCell = styled.div`
  flex: 1; // 모든 셀에 같은 비율 부여
  padding: 16px;
  min-width: 100px; // 최소 너비 설정
  text-align: right; // 각 셀 내용을 오른쪽 정렬
`;

export default LeaderboardHeader;
