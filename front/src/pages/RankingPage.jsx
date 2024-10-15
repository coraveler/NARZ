import React from "react";
import styled from "styled-components";
import RankingNavigation from "../Includes/Ranking/RankingNavigation";
import LeaderboardTable from "../Includes/Ranking/LeaderboardTable"; // LeaderboardTable import

const RankingPage = () => {
  return (
    <StyledSection className="ranking-section">
       
      <h2 className="ranking-title">랭킹</h2>
      <p className="ranking-note">*1~3등은 마일리지가 지급됩니다.</p>
      <br/><br/>
      <RankingNavigation />
      <LeaderboardTable /> 
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
    font-weight: 700; /* 두께를 두껍게 변경 */
    font-size: 24px; /* 글씨 크기를 작게 조정 */
  }

  .ranking-note {
    display: inline;
    font-family: NanumGothic, sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin-left: 10px;
  }
`;
