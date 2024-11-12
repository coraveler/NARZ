import React from 'react';
import { FaMedal } from "react-icons/fa";
import "../../css/ranking/LeaderboardHeader.css";

const LeaderboardHeader = ({ activeRank }) => {
  return (
    <div className="header-row">
      {activeRank === "인기 게시글 랭킹" && (
        <>
          <div className="header-cell"><FaMedal /> 순위</div>
          <div className="header-cell">작성자</div>
          <div className="header-cell">제목</div>
          <div className="header-cell">좋아요</div>
        </>
      )}
      {activeRank === "유저 활동 랭킹" && (
        <>
          <div className="header-cell"><FaMedal /> 순위</div>
          <div className="header-cell">작성자</div>
          <div className="header-cell">게시물 수</div>
          <div className="header-cell">댓글 수</div>
        </>
      )}
      {activeRank === "명예의 전당" && (
        <>
          {/* <div className="header-cell"><FaMedal /> 순위</div>
          <div className="header-cell">작성자</div> */}
        </>
      )}
    </div>
  );
};

export default LeaderboardHeader;
