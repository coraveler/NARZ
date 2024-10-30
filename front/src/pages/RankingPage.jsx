import React, { useState, useEffect } from "react";
import axios from "axios";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable";

const RankingPage = ({ initialRank }) => {
  const [activeRank, setActiveRank] = useState(initialRank);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRankChange = (rank) => {
    setActiveRank(rank);
  };

  const fetchLeaderboardData = async (rankType) => {
    setLoading(true); // API 호출 전 로딩 상태를 true로 설정
    try {
      const encodedRankType = encodeURIComponent(rankType); // URL 인코딩 적용
      const response = await axios.get(`http://localhost:7777/api/rankings?rankType=${encodedRankType}`);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setLeaderboardData([]); // 에러 발생 시 데이터 초기화
    } finally {
      setLoading(false); // API 호출 완료 후 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    fetchLeaderboardData(activeRank); // activeRank가 변경될 때마다 데이터 호출
  }, [activeRank]);

  return (
    <div className="ranking-section" style={{ marginLeft: '40px', marginTop: '20px' }}>
      <h2 className="ranking-title" style={{ fontSize: '30px', fontWeight: 'bold' }}>랭킹</h2>
      <p className="ranking-note" style={{ fontSize: '12px', marginBottom: '20px' }}>*1~3등은 마일리지가 지급됩니다.</p>
      <RankingNavigation onRankChange={handleRankChange} activeRank={activeRank} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LeaderboardTable leaderboardData={leaderboardData} />
      )}
    </div>
  );
};

export default RankingPage;
