import React from 'react';
import styled from 'styled-components';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ leaderboardData, activeRank }) => {
  return (
    <LeaderboardWrapper>
      <LeaderboardContainer>
        <LeaderboardHeader activeRank={activeRank} />
        {leaderboardData.length === 0 ? (
          <EmptyRow>
            데이터가 없습니다
          </EmptyRow>
        ) : (
          leaderboardData.map((data, index) => (
            <LeaderboardRow 
              key={index} 
              rank={index + 1}  // 순위 표시
              author={data.author} 
              board={activeRank === "인기 게시글 랭킹" ? data.board : undefined} 
              rating={activeRank === "인기 게시글 랭킹" ? data.rating : undefined} 
              views={activeRank === "인기 게시글 랭킹" ? data.views : undefined} 
              likes={activeRank === "인기 게시글 랭킹" ? data.likes : undefined} 
              postCount={activeRank === "유저 활동 랭킹" ? data.postCount : undefined}
              commentCount={activeRank === "유저 활동 랭킹" ? data.commentCount : undefined}
            />
          ))
        )}
      </LeaderboardContainer>
    </LeaderboardWrapper>
  );
};

// 기존 스타일 코드 유지
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
