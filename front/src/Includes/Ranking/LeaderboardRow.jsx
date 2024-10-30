import React from 'react';
import styled from 'styled-components';

const LeaderboardRow = ({ rank, author, board, rating, views, likes, postCount, commentCount }) => {
  return (
    <RowWrapper>
      <RankCell>{rank}</RankCell>
      <AuthorCell>{author}</AuthorCell>
      {board ? <BoardCell>{board}</BoardCell> : null}
      {rating !== undefined ? <RatingCell>{rating}</RatingCell> : null}
      {views !== undefined ? <ViewsCell>{views}</ViewsCell> : null}
      {likes !== undefined ? <LikesCell>{likes}</LikesCell> : null}
      {postCount !== undefined ? <PostCountCell>{postCount}</PostCountCell> : null}
      {commentCount !== undefined ? <CommentCountCell>{commentCount}</CommentCountCell> : null}
    </RowWrapper>
  );
};

// 기존 스타일 코드 유지
const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  color: #666;
  white-space: nowrap;
  letter-spacing: -0.39px;
  font: 400 13px Inter, sans-serif;
  padding: 16px;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const RankCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const AuthorCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const BoardCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const RatingCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const ViewsCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const LikesCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const PostCountCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

const CommentCountCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
`;

export default LeaderboardRow;
