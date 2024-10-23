import React from 'react';
import styled from 'styled-components';

const LeaderboardRow = ({ rank, name, board, score, views, likes }) => {
  return (
    <RowWrapper>
      <RankCell>{rank}</RankCell>
      <NameCell>{name}</NameCell>
      <DataCella>{board}</DataCella>
      <DataCellb>{score}</DataCellb>
      <DataCell>{views}</DataCell>
      <DataCellc>{likes}</DataCellc>
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
  padding: 16px;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const RankCell = styled.div`
  flex: 0 0 8.5%;
  text-align: right;
  padding: 8px 0;
`;

const NameCell = styled.div`
  flex: 0 0 25%;
  display: flex;
  align-items: center;
  padding: 15px 160px;
  text-align: right;
`;


const Name = styled.span`
  color: #1e1e1e;
  font-weight: 600;
`;

const DataCella = styled.div`
  flex: 1;
  text-align: left;
  padding: 8px 10px;
`;

const DataCell = styled.div`
  flex: 1;
  text-align: left;
  padding: 8px 25px;
`;

const DataCellb = styled.div`
  flex: 1;
  text-align: left;
  padding: 8px 150px;
`;

const DataCellc = styled.div`
  flex: 1;
  text-align: left;
  padding: 8px 160px;
`;

export default LeaderboardRow;
