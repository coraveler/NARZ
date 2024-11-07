package com.kdt_final.back.comment.dao;
import com.kdt_final.back.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    int countByUserId(int userId); // 특정 사용자의 댓글 수를 카운트하는 메서드
}