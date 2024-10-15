import React from 'react';
import styled from 'styled-components';

const LeaderboardRow = ({ rank, name, level, score, views, likes }) => {
  return (
    <RowWrapper>
      <RankCell>{rank}</RankCell>
      <NameCell>
        <Avatar src={`http://b.io/ext_${rank}-`} alt={`Avatar for ${name}`} />
        <Name>{name}</Name>
      </NameCell>
      <DataCell>{level}</DataCell>
      <DataCell>{score}</DataCell>
      <DataCell>{views}</DataCell>
      <DataCell>{likes}</DataCell>
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  color: #666;
  white-space: nowrap;
  letter-spacing: -0.39px;
  font: 400 13px Inter, sans-serif;
  padding: 16px; // 상하 여백 추가

  &:nth-child(even) {
    background-color: #f9f9f9; // 홀수와 짝수 행 구분을 위한 배경색 추가
  }
`;

const RankCell = styled.div`
  flex: 0 0 8.5%; // 순위 셀 너비를 줄여 왼쪽으로 이동
  text-align: right; // 오른쪽 정렬
  padding: 8px 0; // 상하 패딩 조정
`;

const NameCell = styled.div`
  flex: 0 0 25%; // 작성자 셀 너비
  display: flex;
  align-items: center;
  padding: 15px 15px; // 왼쪽 패딩을 줄이고, 오른쪽 패딩은 유지
  text-align: right; // 오른쪽 정렬
`;

const Avatar = styled.img`
  width: 50px; // 아바타 너비
  height: 50px; // 아바타 높이
  border-radius: 50%; // 원형으로 만들기
  margin-right: 10px; // 아바타와 이름 간격
`;

const Name = styled.span`
  color: #1e1e1e; // 이름 색상
  font-weight: 600; // 이름 두께
`;

const DataCell = styled.div`
  flex: 1; // 데이터 셀 너비를 자동 조정
  text-align: left; // 왼쪽 정렬
  padding: 8px 20px; // 상하 패딩 조정 및 왼쪽 패딩 추가
`;

export default LeaderboardRow;
