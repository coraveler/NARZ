import React from 'react';
import styled from 'styled-components';

const LeaderboardRow = ({ rank, name, level, score, views, likes }) => {
  return (
    <RowWrapper>
      <RankCell>{rank}</RankCell>
      <NameCell>
        <Avatar src={`http://b.io/ext_${rank}-`} alt={`Avatar for ${name}`} />
        <NameWrapper>
          <Name>{name}</Name>
        </NameWrapper>
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
  &:nth-child(even) {
    background-color: #f9f9f9; // 홀수와 짝수 행 구분을 위한 배경색 추가
  }
`;

const RankCell = styled.div`
  flex: 0 0 10%;
  text-align: right; // 순위 셀 오른쪽 정렬
  padding: 20px;
`;

const NameCell = styled.div`
  flex: 0 0 30%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  color: #1e1e1e;
  font-weight: 600;
`;

const DataCell = styled.div`
  flex: 1;
  text-align: right; // 데이터 셀 오른쪽 정렬
  padding: 20px;
`;

export default LeaderboardRow;
