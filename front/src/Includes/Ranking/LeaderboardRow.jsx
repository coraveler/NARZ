import React from 'react';
import { PiMedalFill } from "react-icons/pi";
import "../../css/ranking/LeaderboardRow.css";


const LeaderboardRow = ({ rank, author, board, likes, postCount, commentCount }) => {

 
  return (
    <div className="row-wrapper">
      <div className="rank-cell">{
        rank == 1 
        ? <div style={{color:'gold'}}>✦✧✦<PiMedalFill style={{fontSize:'40px'}}/>✦✧✦</div> 
        : rank == 2 
        ? <div style={{color:'silver'}}>✦✧<PiMedalFill style={{fontSize:'40px'}}/>✧✦</div> 
        : rank == 3 
        ? <div style={{color:'orange'}}>✦<PiMedalFill style={{fontSize:'40px'}}/>✦</div> 
        : rank}
      </div>
      <div className="author-cell">{author}</div>
      {board !== undefined && <div className="board-cell">{board}</div>}
      {likes !== undefined && <div className="likes-cell">{likes}</div>}
      {postCount !== undefined && <div className="post-count-cell">{postCount}</div>}
      {commentCount !== undefined && <div className="comment-count-cell">{commentCount}</div>}
    </div>
  );
};

export default LeaderboardRow;
