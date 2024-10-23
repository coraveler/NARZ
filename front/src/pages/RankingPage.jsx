import React, { useState, useEffect } from "react";
import axios from "axios";  // Axios import 추가
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable"; 

const RankingPage = () => {
  const [activeRank, setActiveRank] = useState("인기 게시글 랭킹"); // 초기값 설정
  const [leaderboardData, setLeaderboardData] = useState([]);  // 서버에서 가져온 데이터를 저장할 state
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // 네비게이션 버튼 클릭 시 호출될 함수
  const handleRankChange = (rank) => {
    setActiveRank(rank);
  };

  // 서버에서 데이터를 가져오는 함수
  const fetchLeaderboardData = async (rankType) => {
    try {
      const response = await axios.get(`/api/ranking?rankType=${rankType}`);
      setLeaderboardData(response.data);  // 서버에서 받아온 데이터를 저장
      setLoading(false); // 로딩 종료
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setLoading(false);  // 에러가 발생해도 로딩 종료
    }
  };

  // rankType이 변경될 때마다 데이터를 가져오도록 설정
  useEffect(() => {
    setLoading(true);  // 새로운 데이터 요청 시 로딩 시작
    fetchLeaderboardData(activeRank);
  }, [activeRank]);

  return (
    <div className="ranking-section" style={{ marginLeft: '40px', marginTop: '20px' }}>
      <br/>
      <h2 className="ranking-title" style={{ fontSize: '30px', fontWeight: 'bold' }}>랭킹</h2>
      <p className="ranking-note" style={{ fontSize: '16px', marginBottom: '20px' }}>*1~3등은 마일리지가 지급됩니다.</p>
      <RankingNavigation onRankChange={handleRankChange} /> {/* 핸들러 전달 */}
      {loading ? (
        <p>Loading...</p>  // 데이터를 불러오는 중일 때 로딩 메시지
      ) : (
        <LeaderboardTable leaderboardData={leaderboardData} /> 
      )}
    </div>
  );
};

export default RankingPage;
