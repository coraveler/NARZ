import React, { useState, useEffect } from "react";
import axios from "axios";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable";

const RankingPage = ({ initialRank = "인기 게시글 랭킹" }) => {
  const [activeRank, setActiveRank] = useState(initialRank);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRankChange = (rank) => {
    setActiveRank(rank);
  };

  const fetchLeaderboardData = async (rankType) => {
    setLoading(true);
    try {
      const encodedRankType = encodeURIComponent(rankType);
      const response = await axios.get(`http://localhost:7777/api/rankings?rankType=${encodedRankType}`);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData(activeRank);
  }, [activeRank]);

  return (
    <div className="ranking-section" style={{ marginLeft: '40px', marginTop: '20px' }}>
      <h2 className="ranking-title" style={{ fontSize: '30px', fontWeight: 'bold' }}>랭킹</h2>
      <p className="ranking-note" style={{ fontSize: '12px', marginBottom: '20px' }}>*1~3등은 마일리지가 지급됩니다.</p>
      <RankingNavigation onRankChange={handleRankChange} activeRank={activeRank} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LeaderboardTable leaderboardData={leaderboardData} activeRank={activeRank} />
      )}
    </div>
  );
};

export default RankingPage;
