import React, { useState, useEffect } from "react";
import axios from "axios";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable";

const RankingPage = ({ initialRank }) => {
  const [activeRank, setActiveRank] = useState(initialRank);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Initial Rank:", initialRank);
  }, [initialRank]);

  const handleRankChange = (rank) => {
    setActiveRank(rank);
  };

  const fetchLeaderboardData = async (rankType) => {
    try {
      const response = await axios.get(`/api/rankings?rankType=${rankType}`);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Active Rank:", activeRank);
    setLoading(true);
    fetchLeaderboardData(activeRank);
  }, [activeRank]);

  return (
    <div className="ranking-section" style={{ marginLeft: '40px', marginTop: '20px' }}>
      <br />
      <h2 className="ranking-title" style={{ fontSize: '30px', fontWeight: 'bold' }}>랭킹</h2>
      <p className="ranking-note" style={{ fontSize: '12px', marginBottom: '20px' }}>*1~3등은 마일리지가 지급됩니다.</p>
      <RankingNavigation onRankChange={handleRankChange} />
      {loading ? <p>Loading...</p> : <LeaderboardTable leaderboardData={leaderboardData} />}
    </div>
  );
};

export default RankingPage;
