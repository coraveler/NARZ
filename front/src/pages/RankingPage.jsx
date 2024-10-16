import React, { useState } from "react";
import styled from "styled-components";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable"; 

const RankingPage = () => {
  const [activeRank, setActiveRank] = useState("인기 게시글 랭킹"); // 초기값 설정

  // 네비게이션 버튼 클릭 시 호출될 함수
  const handleRankChange = (rank) => {
    setActiveRank(rank);
  };

  return (
    <StyledSection className="ranking-section">
      <h2 className="ranking-title">랭킹</h2>
      <p className="ranking-note">*1~3등은 마일리지가 지급됩니다.</p>
      <br /><br />
      <RankingNavigation onRankChange={handleRankChange} /> {/* 핸들러 전달 */}
      <LeaderboardTable rankType={activeRank} /> {/* activeRank 전달 */}
    </StyledSection>
  );
};

export default RankingPage;

const StyledSection = styled.section`
  align-self: stretch;
  background-color: #fff;
  color: #000;
  padding: 31px 77px;
  font: 200 33px/1 Inter, sans-serif;

  @media (max-width: 991px) {
    padding: 0 20px;
  }

  .ranking-title {
    display: inline;
    font-weight: 700;
    font-size: 24px;
  }

  .ranking-note {
    display: inline;
    font-family: NanumGothic, sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin-left: 10px;
  }
`;
