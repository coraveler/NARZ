import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ leaderboardData }) => {
  return (
    <LeaderboardWrapper>
      <LeaderboardContainer>
        <LeaderboardHeader />
        {leaderboardData.length === 0 ? (
          <EmptyRow>
            데이터가 없습니다
          </EmptyRow>
        ) : (
          leaderboardData.map((data, index) => (
            <LeaderboardRow key={index} {...data} />
          ))
        )}
      </LeaderboardContainer>
    </LeaderboardWrapper>
  );
};

const LeaderboardWrapper = styled.section`
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 0 92px;
  overflow: hidden;
`;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
`;

const EmptyRow = styled.div`
  text-align: center;
  padding: 16px;
  color: #666;
`;

export default LeaderboardTable;
