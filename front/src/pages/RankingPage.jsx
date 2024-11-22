import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import "../css/ranking/RankingPage.css";

const RankingPage = ({ initialRank = "인기 여행노트 랭킹" }) => {
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
      console.log(response.data);
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
    <div className="ranking-section">
      <br/>
      <br/>
      <h2 className="mainTitle"><FaCrown />  순위를 확인해보세요  <FaCrown /> </h2>
      <br/>
      <RankingNavigation onRankChange={handleRankChange} activeRank={activeRank} />
      
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <LeaderboardTable leaderboardData={leaderboardData} activeRank={activeRank} />
        {/* <p className="ranking-note">*1~3등은 마일리지가 지급됩니다.</p> */}
        </>
      )}
      {/* <p className="ranking-note">*1~3등은 마일리지가 지급됩니다.</p> */}
    </div>
  );
};

export default RankingPage;
