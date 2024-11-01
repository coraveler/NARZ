import React from "react";
import { Link } from "react-router-dom";
import "../../css/ranking/RankingNavigation.css";



const navItems = [
  { text: "인기 게시글 랭킹", path: "/ranking/popular" },
  { text: "유저 활동 랭킹", path: "/ranking/user-activity" },
  { text: "명예의 전당", path: "/ranking/hall-of-fame" }
];

function RankingNavigation({ onRankChange, activeRank }) {
  return (
    <nav>
      <div className="navigation-container">
        <div className="vertical-divider-wrapper"> 
          <div className="vertical-divider" />
        </div>
        <ul className="navigation-list">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={() => onRankChange(item.text)}
                className={`styled-link ${activeRank === item.text ? "active" : ""}`} 
              >
                {item.text} 
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default RankingNavigation;
