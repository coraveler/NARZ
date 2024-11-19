import React from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
import "../../css/ranking/LeaderboardTable.css";
import HallOfFamePage from './HallOfFamePage';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

const LeaderboardTable = ({ leaderboardData, activeRank }) => {
  return (
    <section className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <LeaderboardHeader activeRank={activeRank} />
        {leaderboardData.length === 0 
        ? (<div className="empty-row">데이터가 없습니다</div>) 
        // 명예의 전당 화면
        : activeRank === "명예의 전당" 
        ? (
          <div className="hof-cards-wrapper">
            {leaderboardData.slice(0, 3).map((data, index) => (
              <HallOfFamePage 
                key={index} 
                rank={index + 1}  
                author={data.author}
              />
            ))}
          </div>
        )
        : (
          leaderboardData.map((data, index) => (
            <LeaderboardRow 
              key={index} 
              rank={index + 1}  
              author={data.author} 
              board={activeRank === "인기 게시글 랭킹" ? data.board : undefined} 
              likes={activeRank === "인기 게시글 랭킹" ? data.likes : undefined} 
              postCount={activeRank === "유저 활동 랭킹" ? data.postCount : undefined}
              commentCount={activeRank === "유저 활동 랭킹" ? data.commentCount : undefined}
            >
              {activeRank === "인기 게시글 랭킹" && (
                <Link to={`/postpage/${data.postId}`} className="post-title-link">
                  {data.title}
                </Link>
              )}
            </LeaderboardRow>
          ))
        )}
      </div>
    </section>
  );
};

export default LeaderboardTable;
