package com.kdt_final.back.post.dao;


import com.kdt_final.back.post.domain.postLike.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Integer> {

    // 특정 게시글의 좋아요 수를 조회
    @Query("SELECT COUNT(pl) FROM PostLike pl WHERE pl.postId = :postId")
    int countByPostId(@Param("postId") int postId);
}