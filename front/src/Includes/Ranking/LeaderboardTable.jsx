import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ leaderboardData }) => {
  return (
    <LeaderboardWrapper>
      <LeaderboardContainer>
        <LeaderboardHeader />
        {leaderboardData.map((data, index) => (
          <LeaderboardRow key={index} {...data} />
        ))}
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

export default LeaderboardTable;
