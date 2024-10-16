import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ rankType }) => {
  const leaderboardDataByRankType = {
    "인기 게시글 랭킹": [
      { rank: 1, name: 'name1', level: 'Lv.298', score: '569,455,421,386,483', views: '28,808', likes: '루나' },
      { rank: 2, name: 'name2', level: 'Lv.297', score: '763,361,194,209,058', views: '395', likes: 'BOSS' },
      // ...
    ],
    "유저 활동 랭킹": [
      { rank: 1, name: 'user1', level: 'Lv.298', score: '123,456', views: '28,808', likes: '코드매니아' },
      { rank: 2, name: 'user2', level: 'Lv.297', score: '654,321', views: '395', likes: '포트폴리오' },
      // ...
    ],
    "명예의 전당": [
      { rank: 1, name: 'hall1', level: 'Lv.300', score: '999,999', views: '88,888', likes: '레전드' },
      { rank: 2, name: 'hall2', level: 'Lv.299', score: '888,888', views: '77,777', likes: '킹' },
      // ...
    ],
  };

  const leaderboardData = leaderboardDataByRankType[rankType] || [];

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
