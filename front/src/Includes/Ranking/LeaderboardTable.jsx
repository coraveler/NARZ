import React from 'react';
import "../../css/ranking/LeaderboardTable.css";
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ leaderboardData, activeRank }) => {
  return (
    <section className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <LeaderboardHeader activeRank={activeRank} />
        {leaderboardData.length === 0 ? (
          <div className="empty-row">데이터가 없습니다</div>
        ) : (
          leaderboardData.map((data, index) => (
            <LeaderboardRow 
              key={index} 
              rank={index + 1}  
              author={data.author} 
              board={activeRank === "인기 게시글 랭킹" ? data.board : undefined} 
              likes={activeRank === "인기 게시글 랭킹" ? data.likes : undefined} 
              postCount={activeRank === "유저 활동 랭킹" ? data.postCount : undefined}
              commentCount={activeRank === "유저 활동 랭킹" ? data.commentCount : undefined}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default LeaderboardTable;
