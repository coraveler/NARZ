import React, { useEffect, useState } from 'react';
import { PiMedalFill } from "react-icons/pi";
import "../../css/ranking/LeaderboardRow.css";
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const LeaderboardRow = ({ rank, author, board, likes, postCount, commentCount,postId }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const getUserId = async() => {
    try {
      const response = await api.get(`/api/rankings/userInfo/${author}`);
      setUserId(response.data.userId);
      console.log(response.data);
    } catch(err) {
        console.error(err);
    }
  }

  useEffect(()=>{
    getUserId();
  }, [author])

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
      <div className="author-cell" style={{cursor:'pointer'}} onClick={()=>navigate(`/personal/${userId}`)}>{author}</div>
      {board !== undefined && <div className="board-cell" style={{cursor:'pointer'}} onClick={()=>navigate(`/postpage/${postId}`)}>
                    {board}
                  </div>}
      {likes !== undefined && <div className="likes-cell">{likes}</div>}
      {postCount !== undefined && <div className="post-count-cell">{postCount}</div>}
      {commentCount !== undefined && <div className="comment-count-cell">{commentCount}</div>}
    </div>
  );
};

export default LeaderboardRow;
