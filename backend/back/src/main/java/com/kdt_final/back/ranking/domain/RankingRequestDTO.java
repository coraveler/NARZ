package com.kdt_final.back.ranking.domain;

import lombok.Data;

@Data
public class RankingRequestDTO {
    private String rankType;
    private String author;    // 작성자
    private String board;     // 게시글 제목
    private int likes;        // 좋아요 수
    private int postCount;    // 게시글 수
    private int commentCount; // 댓글 수
    private String weekOf;    // 주(week) 정보 (날짜 형태)
    private int ranking;
    private int postId;
    
}
