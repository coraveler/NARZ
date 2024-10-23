import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ rankType }) => {
  const leaderboardDataByRankType = {
    "인기 게시글 랭킹": [
      { rank: 1, name: "User A", board: "게시판 A", score: 95, views: 150, likes: 30 },
      { rank: 2, name: "User B", board: "게시판 B", score: 90, views: 120, likes: 25 },
      { rank: 3, name: "User C", board: "게시판 C", score: 85, views: 100, likes: 20 },
    ],
    "유저 활동 랭킹": [
      { rank: 1, name: "User D", board: "게시판 D", score: 100, views: 200, likes: 40 },
      { rank: 2, name: "User E", board: "게시판 E", score: 80, views: 180, likes: 35 },
      { rank: 3, name: "User F", board: "게시판 F", score: 70, views: 160, likes: 30 },
    ],
    "명예의 전당": [
      { rank: 1, name: "User G", board: "게시판 G", score: 75, views: 50, likes: 15 },
      { rank: 2, name: "User H", board: "게시판 H", score: 60, views: 45, likes: 10 },
      { rank: 3, name: "User I", board: "게시판 I", score: 55, views: 40, likes: 5 },
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
