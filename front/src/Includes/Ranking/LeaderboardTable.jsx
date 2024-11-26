import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
import "../../css/ranking/LeaderboardTable.css";
import HallOfFamePage from './HallOfFamePage';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';
import api from "../../api/axios"

const LeaderboardTable = ({ leaderboardData, activeRank }) => {
  const [totalRanker, setTotalRanker] = useState([]);

  const getTotalRanker = async() => {
    try{
      const response = await api.get(`/api/rankings/totalRank`);
      console.log(response.data);
      setTotalRanker(response.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    if(activeRank === "명예의 전당"){
      getTotalRanker();
    }
  }, [activeRank]);

  // leaderboardData가 갱신될 때마다 출력
  useEffect(() => {
    if (activeRank === "인기 여행노트 랭킹") {
      console.log("Leaderboard Data: ", leaderboardData);
    }
  }, [leaderboardData]); 

  return (
    <section className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <LeaderboardHeader activeRank={activeRank} />
        {leaderboardData.length === 0 
        ? (<div className="empty-row">데이터가 없습니다</div>) 
        : activeRank === "명예의 전당" 
        ? (
          <div className="hof-cards-wrapper">
            {totalRanker.map((data, index) => (
              <HallOfFamePage 
                key={index} 
                rank={index + 1}  
                author={data.author}
              />
            ))}
          </div>
        )
        : (
          <>
            {leaderboardData.map((data, index) => {
              console.log("Post ID: ", data.postId);  // 각 데이터의 postId 출력
              return (
                <LeaderboardRow 
                  postId={data.postId}
                  key={index} 
                  rank={index + 1}  
                  author={data.author} 
                  board={activeRank === "인기 여행노트 랭킹" ? data.board : undefined} 
                  likes={activeRank === "인기 여행노트 랭킹" ? data.likes : undefined} 
                  postCount={activeRank === "유저 활동 랭킹" ? data.postCount : undefined}
                  commentCount={activeRank === "유저 활동 랭킹" ? data.commentCount : undefined}
                >
                  {activeRank === "인기 여행노트 랭킹" && (
                    <Link to={`/postpage/${data.postId}`} className="post-title-link">
                      {/* {data.title} */}
                    </Link>
                  )}
                </LeaderboardRow>
              );
            })}
            <div align="center"><br/><br/><br/>
            <p className="ranking-note">*1~3등은 마일리지가 지급됩니다.</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LeaderboardTable;
