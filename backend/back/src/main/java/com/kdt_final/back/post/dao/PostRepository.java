package com.kdt_final.back.post.dao;

import com.kdt_final.back.post.domain.Post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    int countByUserId(int userId); // 특정 사용자가 작성한 게시글 수를 카운트하는 메서드
    // 사용자가 작성한 게시글의 지역을 중복 없이 조회
    @Query("SELECT DISTINCT p.local FROM Post p WHERE p.userId = :userId")
    List<String> findDistinctLocalByUserId(@Param("userId") int userId);

    @Query("SELECT p.postId FROM Post p WHERE p.userId = :userId")
    List<Integer> findPostIdsByUserId(@Param("userId") int userId);
}