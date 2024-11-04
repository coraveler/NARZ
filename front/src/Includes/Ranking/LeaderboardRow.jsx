import React from 'react';
import "../../css/ranking/LeaderboardRow.css";

const LeaderboardRow = ({ rank, author, board, likes, postCount, commentCount }) => {
  return (
    <div className="row-wrapper">
      <div className="rank-cell">{rank}</div>
      <div className="author-cell">{author}</div>
      {board !== undefined && <div className="board-cell">{board}</div>}
      {likes !== undefined && <div className="likes-cell">{likes}</div>}
      {postCount !== undefined && <div className="post-count-cell">{postCount}</div>}
      {commentCount !== undefined && <div className="comment-count-cell">{commentCount}</div>}
    </div>
  );
};

export default LeaderboardRow;
